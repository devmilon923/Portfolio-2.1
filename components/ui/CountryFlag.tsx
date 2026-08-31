import React from "react";

interface CountryFlagProps {
  code: string;
  className?: string;
}

function FlagWrapper({
  codeLower,
  className,
  children,
}: {
  codeLower: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
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
}

export default function CountryFlag({
  code,
  className = "w-6 h-6",
}: CountryFlagProps) {
  const codeLower = code.toLowerCase();

  const renderContent = () => {
    switch (codeLower) {
      case "us":
        return (
          <>
            <rect width="100" height="100" fill="#B22234" />
            <path
              d="M0,7.69h100M0,23.07h100M0,38.46h100M0,53.84h100M0,69.23h100M0,84.61h100"
              stroke="#FFFFFF"
              strokeWidth="7.69"
            />
            <rect width="40" height="53.85" fill="#3C3B6E" />
          </>
        );
      case "ca":
        return (
          <>
            <rect width="100" height="100" fill="#FF0000" />
            <rect x="25" width="50" height="100" fill="#FFFFFF" />
            <path
              d="M50,20 L53,35 L62,28 L57,40 L70,42 L58,52 L62,68 L50,58 L38,68 L42,52 L30,42 L43,40 L38,28 L47,35 Z"
              fill="#FF0000"
            />
          </>
        );
      case "gb":
      case "uk":
        return (
          <>
            <rect width="100" height="100" fill="#00247D" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="#FFFFFF" strokeWidth="15" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="#CF142B" strokeWidth="8" />
            <path d="M50,0 V100 M0,50 H100" stroke="#FFFFFF" strokeWidth="25" />
            <path d="M50,0 V100 M0,50 H100" stroke="#CF142B" strokeWidth="15" />
          </>
        );
      case "de":
        return (
          <>
            <rect width="100" height="33.3" y="0" fill="#000000" />
            <rect width="100" height="33.3" y="33.3" fill="#DD0000" />
            <rect width="100" height="33.4" y="66.6" fill="#FFCC00" />
          </>
        );
      case "au":
        return (
          <>
            <rect width="100" height="100" fill="#00008B" />
            <rect width="45" height="45" fill="#00247D" />
            <path d="M0,0 L45,45 M45,0 L0,45" stroke="#FFFFFF" strokeWidth="7" />
            <path d="M22.5,0 V45 M0,22.5 H45" stroke="#FFFFFF" strokeWidth="11" />
            <path d="M22.5,0 V45 M0,22.5 H45" stroke="#CF142B" strokeWidth="7" />
            <circle cx="75" cy="20" r="4" fill="#FFFFFF" />
            <circle cx="85" cy="35" r="4" fill="#FFFFFF" />
            <circle cx="65" cy="50" r="4" fill="#FFFFFF" />
            <circle cx="80" cy="65" r="4" fill="#FFFFFF" />
            <circle cx="72" cy="80" r="2.5" fill="#FFFFFF" />
            <circle cx="22.5" cy="72" r="7" fill="#FFFFFF" />
          </>
        );
      case "sg":
        return (
          <>
            <rect width="100" height="50" y="0" fill="#ED2939" />
            <rect width="100" height="50" y="50" fill="#FFFFFF" />
            <circle cx="22" cy="25" r="14" fill="#FFFFFF" />
            <circle cx="26" cy="25" r="13" fill="#ED2939" />
          </>
        );
      case "ae":
        return (
          <>
            <rect width="100" height="33.3" y="0" fill="#00732F" />
            <rect width="100" height="33.3" y="33.3" fill="#FFFFFF" />
            <rect width="100" height="33.4" y="66.6" fill="#000000" />
            <rect width="28" height="100" x="0" y="0" fill="#FF0000" />
          </>
        );
      case "bd":
        return (
          <>
            <rect width="100" height="100" fill="#006A4E" />
            <circle cx="45" cy="50" r="30" fill="#F42A41" />
          </>
        );
      default:
        return (
          <>
            <rect width="100" height="100" fill="#0F172A" />
            <text
              x="50"
              y="58"
              fontSize="36"
              fontWeight="bold"
              fill="#F4EDE0"
              textAnchor="middle"
              className="font-mono uppercase"
            >
              {code.slice(0, 2)}
            </text>
          </>
        );
    }
  };

  return (
    <FlagWrapper codeLower={codeLower} className={className}>
      {renderContent()}
    </FlagWrapper>
  );
}
