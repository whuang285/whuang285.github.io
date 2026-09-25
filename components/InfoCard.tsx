import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  children: ReactNode;
};

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <aside className="info-card">
      <h3>{title}</h3>
      <div className="info-card__content">{children}</div>
    </aside>
  );
}
