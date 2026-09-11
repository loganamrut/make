'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '@/lib/types';
import { FAQSchema } from './JsonLd';

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
}

export function FaqSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our privacy-first AI resume builder and CV maker.',
  faqs,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Answers & Clarity
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg pr-4 font-semibold">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-base leading-relaxed border-t border-slate-100 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
