import { useEffect } from "react";

interface Props {
  calLink: string;
  className?: string;
}

export default function CalEmbed({ calLink, className = "" }: Props) {
  useEffect(() => {
    // Only inject the script once, even if multiple embeds mount
    if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) return;

    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div
      className={`cal-embed-container ${className}`}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      style={{ minHeight: "600px", width: "100%" }}
    />
  );
}
