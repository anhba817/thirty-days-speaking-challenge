/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  LEGAL_EFFECTIVE_DATE,
  PRIVACY_SECTIONS,
  TERMS_SECTIONS,
  type LegalSection,
} from './legalContent';

interface LegalPageProps {
  doc: 'privacy' | 'terms';
  onBack: () => void;
}

const META: Record<LegalPageProps['doc'], { title: string; sections: LegalSection[] }> = {
  privacy: { title: 'Privacy Policy', sections: PRIVACY_SECTIONS },
  terms: { title: 'Terms & Conditions', sections: TERMS_SECTIONS },
};

// Render lines in their original order, grouping consecutive "- " lines into
// a single bulleted list so a paragraph after the bullets stays after them.
function SectionBody({ body }: { body: string[] }) {
  const blocks: Array<{ type: 'p'; text: string } | { type: 'ul'; items: string[] }> = [];
  for (const line of body) {
    if (line.startsWith('- ')) {
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ul') last.items.push(line.slice(2));
      else blocks.push({ type: 'ul', items: [line.slice(2)] });
    } else {
      blocks.push({ type: 'p', text: line });
    }
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, i) =>
        block.type === 'p' ? (
          <p key={i} className="text-app-muted font-light leading-relaxed">
            {block.text}
          </p>
        ) : (
          <ul key={i} className="space-y-2 pl-1">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-3 text-app-muted font-light leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

export function LegalPage({ doc, onBack }: LegalPageProps) {
  const { title, sections } = META[doc];

  return (
    <motion.div
      key={`legal-${doc}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-slate-500 hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-widest mb-8"
      >
        <ArrowLeft size={14} />
        <span>Back</span>
      </button>

      <div className="glass rounded-[2.5rem] p-10 md:p-14 border-white/5 shadow-2xl space-y-10">
        <header className="space-y-3 border-b border-white/5 pb-8">
          <span className="text-xs text-blue-400 font-bold uppercase tracking-[0.3em] block">
            Legal
          </span>
          <h1 className="text-4xl font-light tracking-tight text-app-heading">{title}</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-app-muted">
            Effective {LEGAL_EFFECTIVE_DATE}
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-lg font-medium text-app-heading">{section.heading}</h2>
              <SectionBody body={section.body} />
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
