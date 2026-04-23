import React from "react";

/**
 * CADVisual - inline SVG placeholders that emulate CAD/CAM screenshots.
 * Each 'type' renders a different technical drawing style so the gallery
 * feels rich and authentic without external imagery.
 */
const CADVisual = ({ type = "toolpath" }) => {
  const common = (
    <>
      <rect width="400" height="300" fill="hsl(var(--muted) / 0.6)" />
      <g stroke="hsl(var(--grid))" strokeWidth="0.5">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="300" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} />
        ))}
      </g>
      {/* Origin cross */}
      <g stroke="hsl(var(--foreground) / 0.5)" strokeWidth="0.6">
        <line x1="0" y1="260" x2="400" y2="260" />
        <line x1="40" y1="0" x2="40" y2="300" />
      </g>
      <g
        fontFamily="JetBrains Mono"
        fontSize="8"
        fill="hsl(var(--muted-foreground))"
      >
        <text x="6" y="14">
          X
        </text>
        <text x="385" y="276">
          Y
        </text>
      </g>
    </>
  );

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {common}
      {type === "toolpath" && <Toolpath />}
      {type === "wireframe" && <Wireframe />}
      {type === "isometric" && <Isometric />}
      {type === "engraving" && <Engraving />}
      {type === "rotary" && <Rotary />}
      {type === "topdown" && <TopDown />}
      {type === "drill" && <Drill />}
    </svg>
  );
};

const Toolpath = () => (
  <g>
    <rect
      x="60"
      y="60"
      width="280"
      height="180"
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeWidth="1"
    />
    <rect
      x="80"
      y="80"
      width="100"
      height="80"
      fill="hsl(var(--wood) / 0.15)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.8"
    />
    <rect
      x="200"
      y="80"
      width="120"
      height="60"
      fill="hsl(var(--wood) / 0.15)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.8"
    />
    <rect
      x="200"
      y="160"
      width="60"
      height="60"
      fill="hsl(var(--wood) / 0.15)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.8"
    />
    <rect
      x="270"
      y="160"
      width="50"
      height="60"
      fill="hsl(var(--wood) / 0.15)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.8"
    />
    {/* Toolpath spiral */}
    <g
      stroke="hsl(var(--sage))"
      strokeWidth="0.9"
      fill="none"
      strokeDasharray="2 2"
    >
      <path d="M 85 85 L 175 85 L 175 155 L 85 155 L 85 90 L 170 90 L 170 150 L 90 150 L 90 95 L 165 95 L 165 145 L 95 145" />
      <path d="M 205 85 L 315 85 L 315 135 L 205 135 L 205 90 L 310 90 L 310 130 L 210 130" />
    </g>
    <g stroke="hsl(var(--olive))" strokeWidth="0.9" fill="none">
      <circle cx="230" cy="190" r="18" />
      <circle cx="295" cy="190" r="18" />
    </g>
  </g>
);

const Wireframe = () => (
  <g>
    <g stroke="hsl(var(--foreground))" strokeWidth="0.9" fill="none">
      <polygon points="200,60 320,120 320,220 200,260 80,220 80,120" />
      <polygon points="200,60 320,120 200,160 80,120" />
      <line x1="200" y1="60" x2="200" y2="260" />
      <line x1="80" y1="120" x2="200" y2="160" />
      <line x1="320" y1="120" x2="200" y2="160" />
      <line x1="200" y1="160" x2="200" y2="260" />
    </g>
    {/* Dovetail details */}
    <g stroke="hsl(var(--sage))" strokeWidth="1" fill="none">
      <path d="M 120 140 L 130 135 L 140 140 L 140 150 L 130 155 L 120 150 Z" />
      <path d="M 150 150 L 160 145 L 170 150 L 170 160 L 160 165 L 150 160 Z" />
      <path d="M 180 160 L 190 155 L 200 160 L 200 170 L 190 175 L 180 170 Z" />
    </g>
    <g
      fontFamily="JetBrains Mono"
      fontSize="7"
      fill="hsl(var(--muted-foreground))"
    >
      <text x="330" y="120">
        A
      </text>
      <text x="70" y="120">
        B
      </text>
      <text x="330" y="225">
        C
      </text>
    </g>
  </g>
);

const Isometric = () => (
  <g>
    <g stroke="hsl(var(--foreground))" strokeWidth="0.8" fill="none">
      {/* Curved shell via iso grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={i}
          d={`M ${80 + i * 24} ${90 + i * 4} Q ${200} ${70 + i * 3} ${
            320 - i * 24
          } ${90 + i * 4}`}
          stroke="hsl(var(--foreground) / 0.8)"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={`b${i}`}
          d={`M ${80 + i * 24} ${90 + i * 4} L ${80 + i * 24} ${210 + i * 4}`}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={`c${i}`}
          d={`M ${320 - i * 24} ${90 + i * 4} L ${320 - i * 24} ${210 + i * 4}`}
        />
      ))}
    </g>
    <g
      stroke="hsl(var(--sage))"
      strokeWidth="1"
      fill="none"
      strokeDasharray="3 2"
    >
      <path d="M 100 110 Q 200 90 300 110" />
      <path d="M 100 140 Q 200 120 300 140" />
      <path d="M 100 170 Q 200 150 300 170" />
    </g>
  </g>
);

const Engraving = () => (
  <g>
    <rect
      x="60"
      y="70"
      width="280"
      height="160"
      fill="hsl(var(--wood) / 0.15)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.8"
    />
    <g
      fontFamily="Space Grotesk"
      fontWeight="500"
      fill="hsl(var(--foreground))"
    >
      <text
        x="200"
        y="155"
        textAnchor="middle"
        fontSize="56"
        letterSpacing="-2"
      >
        BIMA
      </text>
      <text
        x="200"
        y="195"
        textAnchor="middle"
        fontSize="16"
        fill="hsl(var(--olive))"
        letterSpacing="6"
      >
        CNC STUDIO
      </text>
    </g>
    {/* V-carve path */}
    <g
      stroke="hsl(var(--sage))"
      strokeWidth="0.8"
      fill="none"
      strokeDasharray="2 2"
    >
      <rect x="70" y="80" width="260" height="140" />
    </g>
  </g>
);

const Rotary = () => (
  <g>
    {/* Horizontal cylinder */}
    <rect
      x="70"
      y="120"
      width="260"
      height="60"
      fill="hsl(var(--wood) / 0.18)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.9"
    />
    <ellipse
      cx="70"
      cy="150"
      rx="8"
      ry="30"
      fill="hsl(var(--wood) / 0.3)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.8"
    />
    <ellipse
      cx="330"
      cy="150"
      rx="8"
      ry="30"
      fill="hsl(var(--wood) / 0.3)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.8"
    />
    {/* Flutes */}
    <g stroke="hsl(var(--sage))" strokeWidth="1" fill="none">
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M ${85 + i * 40} 120 Q ${95 + i * 40} 150 ${85 + i * 40} 180`}
        />
      ))}
    </g>
    {/* Centerlines */}
    <line
      x1="50"
      y1="150"
      x2="350"
      y2="150"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="0.4"
      strokeDasharray="6 3 1 3"
    />
    <text
      x="200"
      y="220"
      textAnchor="middle"
      fontFamily="JetBrains Mono"
      fontSize="9"
      fill="hsl(var(--muted-foreground))"
    >
      A-AXIS 360.00°
    </text>
  </g>
);

const TopDown = () => (
  <g>
    {/* Modular shelving top-down */}
    <g
      stroke="hsl(var(--foreground))"
      strokeWidth="0.9"
      fill="hsl(var(--wood) / 0.12)"
    >
      <rect x="60" y="70" width="280" height="20" />
      <rect x="60" y="130" width="280" height="20" />
      <rect x="60" y="190" width="280" height="20" />
      <rect x="60" y="70" width="20" height="160" />
      <rect x="190" y="70" width="20" height="160" />
      <rect x="320" y="70" width="20" height="160" />
    </g>
    {/* Pockets */}
    <g fill="hsl(var(--sage))">
      {[90, 150, 210].map((y) =>
        [90, 220].map((x) => (
          <circle key={`${x}${y}`} cx={x} cy={y + 10} r="2.5" />
        ))
      )}
    </g>
    {/* Dimension */}
    <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.5">
      <line x1="60" y1="250" x2="340" y2="250" />
      <line x1="60" y1="246" x2="60" y2="254" />
      <line x1="340" y1="246" x2="340" y2="254" />
    </g>
    <text
      x="200"
      y="265"
      textAnchor="middle"
      fontFamily="JetBrains Mono"
      fontSize="9"
      fill="hsl(var(--muted-foreground))"
    >
      1200 mm
    </text>
  </g>
);

const Drill = () => (
  <g>
    <rect
      x="60"
      y="60"
      width="280"
      height="180"
      fill="hsl(var(--muted-foreground) / 0.08)"
      stroke="hsl(var(--foreground))"
      strokeWidth="0.9"
    />
    {/* Hole grid */}
    <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.7">
      {Array.from({ length: 9 }).map((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <g key={`${i}-${j}`}>
            <circle cx={90 + i * 28} cy={80 + j * 36} r="5" />
            <line
              x1={85 + i * 28}
              y1={80 + j * 36}
              x2={95 + i * 28}
              y2={80 + j * 36}
              stroke="hsl(var(--sage))"
            />
            <line
              x1={90 + i * 28}
              y1={75 + j * 36}
              x2={90 + i * 28}
              y2={85 + j * 36}
              stroke="hsl(var(--sage))"
            />
          </g>
        ))
      )}
    </g>
  </g>
);

export default CADVisual;
