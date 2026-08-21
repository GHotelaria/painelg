/* Maré Editorial: acesso principal com cartões claros e atalhos compactos. */
import { ArrowUpRight, CalendarDays, ExternalLink } from "lucide-react";
import type { Property } from "./dashboardData";

type Props = { properties: Property[]; onTools: () => void; onCalendar: () => void };

export default function PropertyAccess({ properties, onTools, onCalendar }: Props) {
  return (
    <>
      <div className="section-heading section-heading-top" id="pousadas"><div><p className="eyebrow">ACESSO PRINCIPAL</p><h2>Painéis das pousadas</h2></div><span className="section-helper">Escolha uma pousada</span></div>
      <section className="property-grid">
        {properties.map((property, index) => <a className={`property-card ${property.color} property-featured`} href={property.url} target="_blank" rel="noreferrer" key={property.name}><div className="property-top"><span className="property-index">0{index + 1}</span><ExternalLink size={17} /></div><div><h3>{property.short}</h3><p>{property.rooms ? `${property.rooms} quartos no inventário` : "Inventário a completar"}</p></div><div className="property-foot"><span className="open-label">Abrir painel</span><ArrowUpRight size={17} /></div></a>)}
      </section>
      <div className="quick-tools"><span className="quick-tools-label">Atalhos da recepção</span><button onClick={onTools}>Cotação</button><button onClick={onTools}>Mensagem do loft</button><button onClick={onTools}>Comissão</button><button onClick={onTools}>Moedas</button></div>
      <div className="holiday-strip"><CalendarDays size={17} /><div><span>PRÓXIMO FERIADO</span><strong>07 de setembro · Independência do Brasil</strong></div><button onClick={onCalendar}>Ver calendário <ArrowUpRight size={14} /></button></div>
    </>
  );
}
