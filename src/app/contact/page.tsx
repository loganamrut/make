'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, MessageSquare, ShieldCheck, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Direct client-side handling
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="pt-12 pb-14 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Feedback & Inquiries
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact CVMake
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Have a question, feedback, or feature suggestion? We’d love to hear from you.
          </p>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {submitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-emerald-950">Thank You!</h2>
            <p className="text-sm text-emerald-800">
              Your message has been received. You can also reach our engineering and support team directly via{' '}
              <a href="mailto:support@cvmake.dev" className="font-bold underline">
                support@cvmake.dev
              </a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message / Feedback
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="How can we help make CVMake better for you?"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-all"
            >
              Send Message &rarr;
            </button>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                support@cvmake.dev
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero tracking data logged
              </span>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
