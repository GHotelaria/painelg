/* Maré Editorial: navegação lateral persistente, simples e operacional. */
import { CalendarDays, Clock3, Hotel, LayoutDashboard, Menu, Sparkles, X } from "lucide-react";

type Section = "visao-geral" | "pousadas" | "calendario" | "ferramentas";

type Props = {
  activeSection: Section;
  mobileMenu: boolean;
  onNavigate: (section: Section) => void;
  onClose: () => void;
};

export default function DashboardSidebar({ activeSection, mobileMenu, onNavigate, onClose }: Props) {
  const item = (section: Section, icon: React.ReactNode, label: string, count?: string) => (
    <button className={activeSection === section ? "active" : ""} onClick={() => onNavigate(section)}>
      {icon} {label} {count && <span className="nav-count">{count}</span>}
    </button>
  );

  return (
    <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
      <div className="brand">
        <img src={`${import.meta.env.BASE_URL}assets/g-hotelaria-logo.png`} alt="" />
        <div><strong className="brand-name">G Hotelaria</strong><span>painel de operação</span></div>
        <button className="icon-button mobile-close" onClick={onClose} aria-label="Fechar menu"><X size={18} /></button>
      </div>
      <div className="sidebar-label">Navegação</div>
      <nav className="side-nav">
        {item("visao-geral", <LayoutDashboard size={18} />, "Visão geral")}
        {item("pousadas", <Hotel size={18} />, "Pousadas", "4")}
        {item("calendario", <CalendarDays size={18} />, "Calendário")}
        {item("ferramentas", <Sparkles size={18} />, "Ferramentas")}
      </nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-note"><Clock3 size={16} /><div><strong>Última atualização</strong><span>Hoje, 08:42</span></div></div>
    </aside>
  );
}

export type { Section };
export { Menu };
