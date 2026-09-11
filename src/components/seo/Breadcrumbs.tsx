import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 px-4 sm:px-6 lg:px-8 bg-slate-50/80 border-b border-slate-200/80 text-xs text-slate-500 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5">
        <ol className="flex items-center flex-wrap gap-1.5 list-none m-0 p-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.url} className="inline-flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors"
                  >
                    {isFirst && <Home className="w-3 h-3 text-slate-400" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
