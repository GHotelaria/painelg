/* Maré Editorial: página orquestradora; cada área operacional vive num componente próprio. */
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { buildQuote, roomOptions, type QuoteLanguage } from "@/lib/quote";
import CalendarSection, { holidayMap } from "@/components/dashboard/CalendarSection";
import DashboardSidebar, { type Section } from "@/components/dashboard/DashboardSidebar";
import { pousadas, loftMessage } from "@/components/dashboard/dashboardData";
import PropertyAccess from "@/components/dashboard/PropertyAccess";
import ToolsPanel from "@/components/dashboard/ToolsPanel";
import Topbar from "@/components/dashboard/Topbar";

export default function Home() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [activeSection, setActiveSection] = useState<Section>("visao-geral");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<string | null>(null);
  const [loft, setLoft] = useState("01");
  const [copied, setCopied] = useState(false);
  const [percentage, setPercentage] = useState(10);
  const [total, setTotal] = useState(1500);
  const [currencyValue, setCurrencyValue] = useState(100);
  const [currency, setCurrency] = useState("USD");
  const [quote, setQuote] = useState("");
  const [quoteResult, setQuoteResult] = useState("");
  const [quoteCopied, setQuoteCopied] = useState(false);
  const [quoteProperty, setQuoteProperty] = useState(pousadas[0].name);
  const [quoteGuests, setQuoteGuests] = useState(2);
  const [quoteRoom, setQuoteRoom] = useState(roomOptions[pousadas[0].name][0]);
  const [quoteLanguage, setQuoteLanguage] = useState<QuoteLanguage>("Português");

  const holidays = useMemo(() => holidayMap(year), [year]);
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(year, month, 1));
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Array<number | null> = [...Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, () => null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const scrollTo = (section: Section) => { setActiveSection(section); setMobileMenu(false); document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const navigateMonth = (delta: number) => { const date = new Date(year, month + delta, 1); setMonth(date.getMonth()); setYear(date.getFullYear()); setSelectedHoliday(null); };
  const copyText = async (text: string) => { await navigator.clipboard?.writeText(text); setCopied(true); toast.success("Texto copiado para a área de transferência"); setTimeout(() => setCopied(false), 1500); };
  const generateQuote = () => { try { setQuoteResult(buildQuote(quote, quoteProperty, quoteGuests, quoteRoom, quoteLanguage)); toast.success("Cotação gerada com sucesso"); } catch (error) { toast.error(error instanceof Error ? error.message : "Verifique o formato da cotação."); } };
  const copyQuote = async () => { if (!quoteResult) return; await navigator.clipboard?.writeText(quoteResult); setQuoteCopied(true); toast.success("Cotação copiada para a área de transferência"); setTimeout(() => setQuoteCopied(false), 1500); };
  const changeProperty = (property: string) => { setQuoteProperty(property); setQuoteRoom(roomOptions[property][0]); };

  return (
    <div className="app-shell">
      <DashboardSidebar activeSection={activeSection} mobileMenu={mobileMenu} onNavigate={scrollTo} onClose={() => setMobileMenu(false)} />
      <main className="main-content">
        <Topbar activeSection={activeSection} onMenuOpen={() => setMobileMenu(true)} now={now} />
        <div className="page-wrap">
          <section id="visao-geral" className="hero-section hero-compact"><div><p className="eyebrow">QUARTA-FEIRA · 20 DE AGOSTO DE 2026</p><h1>Operação de hoje</h1><p className="hero-copy">Acesso rápido às pousadas e às ferramentas da recepção.</p></div><div className="hero-mark"><img src={`${import.meta.env.BASE_URL}assets/g-hotelaria-logo.png`} alt="G Hotelaria" /></div></section>
          <PropertyAccess properties={pousadas} onTools={() => scrollTo("ferramentas")} onCalendar={() => scrollTo("calendario")} />
          <CalendarSection month={month} year={year} monthLabel={monthLabel} days={days} todayKey={todayKey} holidays={holidays} selectedHoliday={selectedHoliday} onMonthChange={navigateMonth} onHolidaySelect={setSelectedHoliday} />
          <ToolsPanel quote={quote} quoteResult={quoteResult} quoteCopied={quoteCopied} quoteProperty={quoteProperty} quoteGuests={quoteGuests} quoteRoom={quoteRoom} quoteLanguage={quoteLanguage} total={total} percentage={percentage} currencyValue={currencyValue} currency={currency} loft={loft} copied={copied} onQuoteChange={setQuote} onQuoteGenerate={generateQuote} onQuoteCopy={copyQuote} onPropertyChange={changeProperty} onGuestsChange={setQuoteGuests} onRoomChange={setQuoteRoom} onLanguageChange={setQuoteLanguage} onTotalChange={setTotal} onPercentageChange={setPercentage} onCurrencyValueChange={setCurrencyValue} onCurrencyChange={setCurrency} onLoftChange={setLoft} onCopyText={copyText} />
          <footer><span>G Hotelaria · Painel de operação</span><span>Feito para a recepção de Búzios</span></footer>
        </div>
      </main>
    </div>
  );
}
