import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
            <ChevronDown
              className={`ml-4 w-5 h-5 text-sage flex-shrink-0 transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
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
