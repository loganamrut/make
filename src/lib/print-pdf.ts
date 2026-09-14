/**
 * Opens the browser's native print dialog.
 *
 * Before printing we must:
 *   1. Force the preview column visible — it uses "hidden lg:block" which
 *      may evaluate to display:none if the browser's print viewport < 1024px.
 *   2. Reset any CSS scale/zoom transform on the preview zoom wrapper.
 *   3. Restore everything once the print dialog closes.
 */
export function triggerPrintResume(fullName: string = 'Resume'): void {
  if (typeof window === 'undefined') return;

  const originalTitle = document.title;
  const cleanName = fullName.trim() ? fullName.trim().replace(/\s+/g, '_') : 'My';
  document.title = `${cleanName}_Resume_CVMake`;

  // -- Find #resume-print-area and force-show all its hidden ancestors ------
  const target = document.getElementById('resume-print-area');
  const mutations: Array<{ el: HTMLElement; prop: string; was: string }> = [];

  const set = (el: HTMLElement, prop: string, value: string) => {
    mutations.push({ el, prop, was: el.style.getPropertyValue(prop) });
    el.style.setProperty(prop, value, 'important');
  };

  if (target) {
    let ancestor: HTMLElement | null = target.parentElement;
    while (ancestor && ancestor !== document.body) {
      const cs = window.getComputedStyle(ancestor);
      // Force visibility on any hidden ancestor
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') {
        set(ancestor, 'display', 'block');
        set(ancestor, 'visibility', 'visible');
        set(ancestor, 'opacity', '1');
      }
      // Remove any CSS scale transform (zoom buttons)
      if (cs.transform && cs.transform !== 'none') {
        set(ancestor, 'transform', 'none');
        set(ancestor, 'transition', 'none');
      }
      // Ensure overflow doesn't clip the resume
      if (cs.overflow === 'hidden' || cs.overflow === 'scroll') {
        set(ancestor, 'overflow', 'visible');
        set(ancestor, 'height', 'auto');
      }
      ancestor = ancestor.parentElement;
    }
  }

  try {
    window.print();
  } catch (err) {
    console.error('Error invoking print dialog:', err);
    alert('Unable to open print dialog. Please try using Cmd+P (Mac) or Ctrl+P (Windows).');
  } finally {
    // Restore all mutated styles after the print dialog closes
    const restore = () => {
      for (const { el, prop, was } of mutations) {
        if (was) {
          el.style.setProperty(prop, was);
        } else {
          el.style.removeProperty(prop);
        }
      }
      document.title = originalTitle;
    };
    // Give the print dialog a moment to render before restoring
    setTimeout(restore, 500);
  }
}

