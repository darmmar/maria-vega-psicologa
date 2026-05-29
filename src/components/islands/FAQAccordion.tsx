import { ChevronDown } from "lucide-react";
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
    <div className="space-y-4">
      {items.map((item, i) => (
        <div 
          key={item.question} 
          className="bg-white rounded-2xl border border-ink-border/20 shadow-premium overflow-hidden transition-all duration-300 hover:border-sage/10"
        >
          <button
            type="button"
            className="w-full flex justify-between items-center px-6 py-5 text-left font-body font-medium text-ink hover:text-sage transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-panel-${i}`}
            id={`faq-btn-${i}`}
          >
            <span className="text-base pr-4 leading-snug">{item.question}</span>
            <div className={`w-8 h-8 rounded-full bg-sage/5 flex items-center justify-center text-sage flex-shrink-0 transition-all duration-300 ${open === i ? "rotate-180 bg-sage/10" : ""}`}>
              <ChevronDown
                className="w-4 h-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
          </button>
          <div
            id={`faq-panel-${i}`}
            aria-labelledby={`faq-btn-${i}`}
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              open === i ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-6 text-ink-muted text-base leading-relaxed font-body">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

