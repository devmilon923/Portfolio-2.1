import React from "react";

interface CountryFlagProps {
  code: string;
  className?: string;
}

/**
 * Crisp SVG vector country flag rendered inside a circular viewport.
 * Ring / border styling is handled by the parent container for flexible
 * composability (avatar stacks, standalone badges, etc.).
 */
export default function CountryFlag({
  code,
  className = "w-6 h-6",
}: CountryFlagProps) {
  const codeLower = code.toLowerCase();

  // Shared wrapper: a circular clip with the SVG flag filling the circle
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <svg
      viewBox="0 0 100 100"
      className={`${className} flex-shrink-0`}
      aria-hidden="true"
    >
      <clipPath id={`flag-clip-${codeLower}`}>
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <g clipPath={`url(#flag-clip-${codeLower})`}>{children}</g>
    </svg>
  );

  switch (codeLower) {
    case "us":
      return (
        <Wrapper>
          <rect width="100" height="100" fill="#B22234" />
          <rect y="7.7" width="100" height="7.7" fill="#FFFFFF" />
          <rect y="23.1" width="100" height="7.7" fill="#FFFFFF" />
          <rect y="38.5" width="100" height="7.7" fill="#FFFFFF" />
          <rect y="53.9" width="100" height="7.7" fill="#FFFFFF" />
          <rect y="69.3" width="100" height="7.7" fill="#FFFFFF" />
          <rect y="84.7" width="100" height="7.7" fill="#FFFFFF" />
          <rect width="40" height="54" fill="#3C3B6E" />
          {/* Simplified star grid */}
          <circle cx="8" cy="8" r="2" fill="#FFF" />
          <circle cx="20" cy="8" r="2" fill="#FFF" />
          <circle cx="32" cy="8" r="2" fill="#FFF" />
          <circle cx="14" cy="18" r="2" fill="#FFF" />
          <circle cx="26" cy="18" r="2" fill="#FFF" />
          <circle cx="8" cy="28" r="2" fill="#FFF" />
          <circle cx="20" cy="28" r="2" fill="#FFF" />
          <circle cx="32" cy="28" r="2" fill="#FFF" />
          <circle cx="14" cy="38" r="2" fill="#FFF" />
          <circle cx="26" cy="38" r="2" fill="#FFF" />
          <circle cx="8" cy="48" r="2" fill="#FFF" />
          <circle cx="20" cy="48" r="2" fill="#FFF" />
          <circle cx="32" cy="48" r="2" fill="#FFF" />
        </Wrapper>
      );

    case "gb":
    case "uk":
      return (
        <Wrapper>
          <rect width="100" height="100" fill="#012169" />
          <path d="M0,0 L100,100 M100,0 L0,100" stroke="#FFF" strokeWidth="16" />
          <path
            d="M0,0 L50,50 M100,0 L50,50 M0,100 L50,50 M100,100 L50,50"
            stroke="#C8102E"
            strokeWidth="8"
          />
          <path d="M50,0 V100 M0,50 H100" stroke="#FFF" strokeWidth="26" />
          <path d="M50,0 V100 M0,50 H100" stroke="#C8102E" strokeWidth="16" />
        </Wrapper>
      );

    case "au":
      return (
        <Wrapper>
          <rect width="100" height="100" fill="#00008B" />
          {/* Union Jack quarter */}
          <g transform="scale(0.45)">
            <rect width="100" height="100" fill="#012169" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="#FFF" strokeWidth="18" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="#C8102E" strokeWidth="10" />
            <path d="M50,0 V100 M0,50 H100" stroke="#FFF" strokeWidth="28" />
            <path d="M50,0 V100 M0,50 H100" stroke="#C8102E" strokeWidth="16" />
          </g>
          {/* Commonwealth Star */}
          <circle cx="25" cy="75" r="6" fill="#FFF" />
          {/* Southern Cross */}
          <circle cx="72" cy="25" r="3" fill="#FFF" />
          <circle cx="85" cy="45" r="3" fill="#FFF" />
          <circle cx="72" cy="65" r="3" fill="#FFF" />
          <circle cx="60" cy="45" r="2.5" fill="#FFF" />
          <circle cx="78" cy="55" r="2" fill="#FFF" />
        </Wrapper>
      );

    case "bd":
      return (
        <Wrapper>
          <rect width="100" height="100" fill="#006A4E" />
          <circle cx="45" cy="50" r="28" fill="#F42A41" />
        </Wrapper>
      );

    case "in":
      return (
        <Wrapper>
          <rect y="0" width="100" height="33.3" fill="#FF9933" />
          <rect y="33.3" width="100" height="33.4" fill="#FFFFFF" />
          <rect y="66.7" width="100" height="33.3" fill="#138808" />
          {/* Ashoka Chakra */}
          <circle cx="50" cy="50" r="10" fill="none" stroke="#000080" strokeWidth="2" />
          <circle cx="50" cy="50" r="2.5" fill="#000080" />
          {/* Spokes */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={50 + 3 * Math.cos(angle)}
                y1={50 + 3 * Math.sin(angle)}
                x2={50 + 10 * Math.cos(angle)}
                y2={50 + 10 * Math.sin(angle)}
                stroke="#000080"
                strokeWidth="0.8"
              />
            );
          })}
        </Wrapper>
      );

    default:
      return (
        <div
          className={`${className} rounded-full bg-iron/30 flex items-center justify-center text-[9px] font-bold text-obsidian/60 uppercase flex-shrink-0`}
        >
          {code.slice(0, 2)}
        </div>
      );
  }
}
