/* Maré Editorial: cabeçalho compacto, legível e orientado a tarefas. */
import { CalendarDays, Menu, Search } from "lucide-react";
import type { Section } from "./DashboardSidebar";

type Props = { activeSection: Section; onMenuOpen: () => void; now: Date };

export default function Topbar({ activeSection, onMenuOpen, now }: Props) {
  const title = activeSection === "calendario" ? "Calendário" : activeSection === "ferramentas" ? "Ferramentas" : activeSection === "pousadas" ? "Pousadas" : "Visão geral";
  return (
    <header className="topbar">
      <button className="icon-button menu-trigger" onClick={onMenuOpen} aria-label="Abrir menu"><Menu size={20} /></button>
      <div className="crumb"><span>Operação</span><b>/</b><strong>{title}</strong></div>
      <div className="top-actions"><div className="search-box"><Search size={16} /><input placeholder="Pesquisar atalho..." /></div><div className="date-chip"><CalendarDays size={16} /> {new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(now)}</div></div>
    </header>
  );
}
