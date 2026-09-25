import type { ReactNode } from "react";

type TravelTipProps = {
  children: ReactNode;
};

export default function TravelTip({ children }: TravelTipProps) {
  return (
    <aside className="travel-tip">
      <div className="travel-tip__label">Travel tip</div>

      <div className="travel-tip__content">{children}</div>
    </aside>
  );
}
