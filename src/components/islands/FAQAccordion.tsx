import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-ink-border/50">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex justify-between items-center py-5 text-left font-body font-semibold text-ink hover:text-sage transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-panel-${i}`}
            id={`faq-btn-${i}`}
          >
            <span className="text-base pr-4">{item.question}</span>
            <span
              className={`ml-4 text-sage transition-transform duration-200 flex-shrink-0 text-xl leading-none ${
                open === i ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          <div
            id={`faq-panel-${i}`}
            role="region"
            aria-labelledby={`faq-btn-${i}`}
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-ink-muted text-base leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
