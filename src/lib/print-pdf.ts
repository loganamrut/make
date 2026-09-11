export function triggerPrintResume(fullName: string = 'Resume'): void {
  if (typeof window === 'undefined') return;

  const originalTitle = document.title;
  const cleanName = fullName.trim() ? fullName.trim().replace(/\s+/g, '_') : 'My';
  document.title = `${cleanName}_Resume_CVMake`;

  try {
    window.print();
  } catch (err) {
    console.error('Error invoking print dialog:', err);
    alert('Unable to open print dialog. Please try using Cmd+P (Mac) or Ctrl+P (Windows).');
  } finally {
    // Restore title after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }
}
