/* Maré Editorial: calendário operacional com feriados nacionais e navegação mensal. */
import { CalendarDays, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type Props = { year: number; month: number; monthLabel: string; days: Array<number | null>; todayKey: string; holidays: Record<string, string>; selectedHoliday: string | null; onMonthChange: (delta: number) => void; onHolidaySelect: (holiday: string) => void };

function easterDate(year: number) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export function holidayMap(year: number) {
  const easter = easterDate(year);
  const add = (days: number) => new Date(easter.getFullYear(), easter.getMonth(), easter.getDate() + days);
  const fixed = [["01-01", "Confraternização Universal"], ["04-21", "Tiradentes"], ["05-01", "Dia do Trabalho"], ["09-07", "Independência do Brasil"], ["10-12", "Nossa Senhora Aparecida"], ["11-02", "Finados"], ["11-15", "Proclamação da República"], ["11-20", "Consciência Negra"], ["12-25", "Natal"]] as const;
  const map: Record<string, string> = {};
  fixed.forEach(([key, label]) => { map[`${year}-${key}`] = label; });
  [[-48, "Carnaval"], [-47, "Carnaval"], [-2, "Sexta-feira Santa"], [60, "Corpus Christi"]].forEach(([offset, label]) => { const date = add(offset as number); map[`${year}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`] = label as string; });
  return map;
}

export default function CalendarSection({ month, year, monthLabel, days, todayKey, holidays, selectedHoliday, onMonthChange, onHolidaySelect }: Props) {
  return (
    <div className="content-grid">
      <section id="calendario" className="panel calendar-panel tide-surface"><div className="panel-heading"><div><p className="eyebrow">PLANEAMENTO</p><h2>Calendário operacional</h2><p>Feriados nacionais e datas importantes num só lugar.</p></div><div className="calendar-controls"><button className="icon-button" onClick={() => onMonthChange(-1)} aria-label="Mês anterior"><ChevronLeft size={18} /></button><strong>{monthLabel}</strong><button className="icon-button" onClick={() => onMonthChange(1)} aria-label="Próximo mês"><ChevronRight size={18} /></button></div></div><div className="calendar-wrap"><div className="calendar-weekdays">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{days.map((day, index) => { const key = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : `empty-${index}`; const holiday = day ? holidays[key] : null; return <button key={key} className={`calendar-day ${day && key === todayKey ? "today" : ""} ${holiday ? "holiday" : ""} ${!day ? "empty" : ""}`} disabled={!day} onClick={() => holiday && onHolidaySelect(holiday)}><span>{day}</span>{holiday && <i />}</button>; })}</div></div><div className="calendar-legend"><span><i className="dot terracotta-dot" /> feriado</span><span><i className="dot today-dot" /> hoje</span>{selectedHoliday && <strong>{selectedHoliday}</strong>}</div></section>
      <section className="panel day-panel"><div className="panel-heading compact"><div><p className="eyebrow">ATENÇÃO</p><h2>Próximas datas</h2></div><CalendarDays size={20} /></div><div className="event-list"><div className="event-item"><div className="event-date"><strong>07</strong><span>SET</span></div><div><strong>Independência do Brasil</strong><span>Feriado nacional</span></div><span className="event-tag">feriado</span></div><div className="event-item"><div className="event-date"><strong>12</strong><span>OUT</span></div><div><strong>Nossa Senhora Aparecida</strong><span>Feriado nacional</span></div><span className="event-tag">feriado</span></div><div className="event-item"><div className="event-date"><strong>02</strong><span>NOV</span></div><div><strong>Finados</strong><span>Feriado nacional</span></div><span className="event-tag">feriado</span></div></div><div className="tip-box"><Sparkles size={16} /><span>Use os pontos terracota no calendário para identificar feriados e preparar a escala da recepção.</span></div></section>
    </div>
  );
}
