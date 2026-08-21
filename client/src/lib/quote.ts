/* Maré Editorial: parser Cloudbeds e gerador de cotações prontas para envio. */
export type QuoteLanguage = "Português" | "Español" | "English" | "Italiano";

export type QuotePropertyData = { address: string; maps: string; photos: string };

export const quotePropertyData: Record<string, QuotePropertyData> = {
  "Pousada Centro Class": { address: "R. Rui Barbosa, 08 - Centro, Armação dos Búzios - RJ", maps: "https://maps.app.goo.gl/sF6QJmEnK5qKA7ji8", photos: "https://photos.app.goo.gl/HizRbSCCoEL75sqh9" },
  "Pousada Casa Centro": { address: "R. Rui Barbosa, 390 A - Lot. Triangulo de Buzios, Armação dos Búzios", maps: "https://maps.app.goo.gl/guP7PDbX854PmhmZ6", photos: "https://photos.app.goo.gl/3JPDo4cmN8kzXSZU6" },
  "Pousada Centro Up": { address: "R. Rui Barbosa, 229 A - Lot. Triangulo de Buzios, Armação dos Búzios", maps: "https://maps.app.goo.gl/8LPvmBV2XCA1wKNP9", photos: "https://photos.app.goo.gl/dpSKEJCMKNFF7jJE7" },
  "Solar João Fernandes": { address: "Rua São Cristóvão, R. João Fernandes, 16, Armação dos Búzios - RJ", maps: "https://maps.app.goo.gl/qszQTRjtk92Pnfkn6", photos: "https://photos.app.goo.gl/ez61zesWzVXZFh388" },
};

export const quoteAddresses = Object.fromEntries(Object.entries(quotePropertyData).map(([name, data]) => [name, data.address]));

export const roomOptions: Record<string, string[]> = {
  "Pousada Centro Class": ["Duplo Standard", "Triplo"],
  "Pousada Casa Centro": ["Duplo Standard", "Triplo"],
  "Pousada Centro Up": ["Duplo Standard", "Triplo"],
  "Solar João Fernandes": ["Duplo", "Triplo", "Quadruplo", "Sextuplo"],
};

const monthNumbers: Record<string, number> = { janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5, julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11, jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11 };
const propertyNames: Record<string, Record<QuoteLanguage, string>> = {
  "Pousada Centro Class": { Português: "POUSADA CENTRO CLASS", Español: "POSADA CENTRO CLASS", English: "CENTRO CLASS INN", Italiano: "LOCANDA CENTRO CLASS" },
  "Pousada Casa Centro": { Português: "POUSADA CASA CENTRO", Español: "POSADA CASA CENTRO", English: "CASA CENTRO INN", Italiano: "LOCANDA CASA CENTRO" },
  "Pousada Centro Up": { Português: "POUSADA CENTRO UP", Español: "POSADA CENTRO UP", English: "CENTRO UP INN", Italiano: "LOCANDA CENTRO UP" },
  "Solar João Fernandes": { Português: "SOLAR JOÃO FERNANDES", Español: "SOLAR JOÃO FERNANDES", English: "SOLAR JOÃO FERNANDES", Italiano: "SOLAR JOÃO FERNANDES" },
};
const roomNames: Record<string, Record<QuoteLanguage, string>> = {
  "Duplo Standard": { Português: "Duplo Standard", Español: "Doble Estándar", English: "Standard Double", Italiano: "Doppia Standard" },
  Duplo: { Português: "Duplo", Español: "Doble", English: "Double", Italiano: "Doppia" },
  Triplo: { Português: "Triplo", Español: "Triple", English: "Triple", Italiano: "Tripla" },
  Quadruplo: { Português: "Quadruplo", Español: "Cuádruple", English: "Quadruple", Italiano: "Quadrupla" },
  Sextuplo: { Português: "Sextuplo", Español: "Séxtuple", English: "Sextuple", Italiano: "Sestupla" },
};
const dayNames: Record<QuoteLanguage, Record<string, string>> = {
  Português: { Seg: "Seg", Ter: "Ter", Qua: "Qua", Qui: "Qui", Sex: "Sex", Sáb: "Sáb", Dom: "Dom" },
  Español: { Seg: "Lun", Ter: "Mar", Qua: "Mié", Qui: "Jue", Sex: "Vie", Sáb: "Sáb", Dom: "Dom" },
  English: { Seg: "Mon", Ter: "Tue", Qua: "Wed", Qui: "Thu", Sex: "Fri", Sáb: "Sat", Dom: "Sun" },
  Italiano: { Seg: "Lun", Ter: "Mar", Qua: "Mer", Qui: "Gio", Sex: "Ven", Sáb: "Sab", Dom: "Dom" },
};

export function parseCloudbedsText(text: string) {
  const dateMatch = text.match(/([A-Za-zÀ-ÿ]{2,3})[, ]+([A-Za-zÀ-ÿ]+)\.?\s*(\d{1,2})\s*[-–]\s*([A-Za-zÀ-ÿ]{2,3})[, ]+([A-Za-zÀ-ÿ]+)\.?\s*(\d{1,2})/i);
  const valueMatch = text.match(/Total\s+da\s+Acomoda(?:ç|c)(?:ão|ao)\s*:\s*R\$\s*([\d.]+,\d{2}|[\d.]+)/i) || text.match(/R\$\s*([\d.]+,\d{2}|[\d.]+)/i);
  if (!dateMatch || !valueMatch) throw new Error("Cole o período e o campo Total da Acomodação da Cloudbeds.");
  const [, inWeek, inMonthRaw, inDay, outWeek, outMonthRaw, outDay] = dateMatch;
  const inMonth = monthNumbers[inMonthRaw.toLowerCase().replace(".", "")];
  const outMonth = monthNumbers[outMonthRaw.toLowerCase().replace(".", "")];
  if (inMonth === undefined || outMonth === undefined) throw new Error("Mês não reconhecido. Use, por exemplo, Ago. ou Agosto.");
  const now = new Date();
  let checkinYear = now.getFullYear();
  let checkoutYear = checkinYear;
  if (inMonth < now.getMonth() - 2) checkinYear += 1;
  if (outMonth < inMonth) checkoutYear = checkinYear + 1;
  else if (outMonth < now.getMonth() - 2) checkoutYear += 1;
  const checkin = new Date(checkinYear, inMonth, Number(inDay));
  const checkout = new Date(checkoutYear, outMonth, Number(outDay));
  const nights = Math.round((checkout.getTime() - checkin.getTime()) / 86400000);
  if (nights <= 0) throw new Error("As datas da estadia são inválidas.");
  const amount = Number(valueMatch[1].replace(/\./g, "").replace(",", "."));
  return { inWeek, outWeek, checkin: `${String(inDay).padStart(2, "0")}/${String(inMonth + 1).padStart(2, "0")}/${checkinYear}`, checkout: `${String(outDay).padStart(2, "0")}/${String(outMonth + 1).padStart(2, "0")}/${checkoutYear}`, nights, amount };
}

export function buildQuote(text: string, property: string, guests: number, room: string, language: QuoteLanguage) {
  const parsed = parseCloudbedsText(text);
  const data = quotePropertyData[property];
  const title = propertyNames[property][language];
  const translatedRoom = roomNames[room]?.[language] ?? room;
  const translateDay = (day: string) => dayNames[language][day] ?? day;
  const formattedAmount = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parsed.amount);
  const labels = language === "Português" ? { address: "Endereço", location: "Localização", dates: "Datas da Estadia", checkin: "Check-in", checkout: "Check-out", checkinTime: "Check-in: 14h", checkoutTime: "Check-out: 12h", summary: "Resumo da Reserva", nights: "noite", nightsPlural: "noites", people: "pessoa", peoplePlural: "pessoas", breakfast: "❤️ Café da manhã incluído.", total: "Valor Total", images: "Imagens", important: "🚨 *Importante:*", validity: "Esta cotação é válida por 24 horas.", recheck: "Após esse período, será necessário verificar novamente a disponibilidade e a tarifa.", payment: "✅ Para garantir a reserva, solicitamos o *pagamento de 50%* via PIX.", balance: "✅ Os *50% restantes* deverão ser pagos no momento do check-in." } : { address: "Endereço", location: "Localização", dates: "Datas da Estadia", checkin: "Check-in", checkout: "Check-out", checkinTime: "Check-in: 14h", checkoutTime: "Check-out: 12h", summary: "Resumo da Reserva", nights: "night", nightsPlural: "nights", people: "guests", peoplePlural: "guests", breakfast: "❤️ Café da manhã incluído.", total: "Valor Total", images: "Imagens", important: "🚨 *Importante:*", validity: "Esta cotação é válida por 24 horas.", recheck: "Após esse período, será necessário verificar novamente a disponibilidade e a tarifa.", payment: "✅ Para garantir a reserva, solicitamos o *pagamento de 50%* via PIX.", balance: "✅ Os *50% restantes* deverão ser pagos no momento do check-in." };
  const nightsLabel = parsed.nights === 1 ? labels.nights : labels.nightsPlural;
  const peopleLabel = guests === 1 ? labels.people : labels.peoplePlural;
  return `🏡 ${title}\n📍 ${labels.address}: ${data.address}\n📍 ${labels.location}: ${data.maps}\n\n🛏️ ${translatedRoom}\n\n📅 ${labels.dates}\n➡️ ${labels.checkin}: ${translateDay(parsed.inWeek)}, ${parsed.checkin}\n\n- ${labels.checkinTime}\n  ⬅️ ${labels.checkout}: ${translateDay(parsed.outWeek)}, ${parsed.checkout}\n- ${labels.checkoutTime}\n\n📊 ${labels.summary}\n🌙 ${parsed.nights} ${nightsLabel}\n👥 ${guests} ${peopleLabel}\n${labels.breakfast}\n\n💰 ${labels.total}: ${formattedAmount}\n\n⚠️ *Tarifa não reembolsável.*\n\n📷 ${labels.images}:\n${data.photos}\n\n${labels.payment}\n\n${labels.balance}\n\n${labels.important}\n${labels.validity}\n${labels.recheck}\n\nAguardamos você! 🌟`;
}
