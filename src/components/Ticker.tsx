import type { CSSProperties } from "react";

type TickerProps = {
  items: readonly string[];
  speed?: number;
  reverse?: boolean;
  lime?: boolean;
  sep?: "dot" | "star";
};

export function Ticker({
  items,
  speed = 28,
  reverse = false,
  lime = false,
  sep = "dot",
}: TickerProps) {
  const d = [...items, ...items];
  return (
    <div className={`TK ${lime ? "lm" : ""}`}>
      <div
        className={`TK-t ${reverse ? "rv" : ""}`}
        style={{ "--spd": `${speed}s` } as CSSProperties}
      >
        {d.map((t, i) => (
          <div key={i} className="ti">
            {sep === "star" ? (
              <span className="tst">✦</span>
            ) : (
              <span className="ts" />
            )}
            <span className="tt">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
