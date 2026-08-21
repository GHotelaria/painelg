/* Maré Editorial: dados operacionais centralizados para reduzir acoplamento entre componentes. */
export type PropertyColor = "blue" | "terracotta" | "sage" | "sand";
export type Property = { name: string; short: string; url: string; rooms: number; color: PropertyColor };

export const pousadas: Property[] = [
  { name: "Pousada Centro Class", short: "Centro Class", url: "http://hotels.cloudbeds.com/connect/208581#/calendar", rooms: 10, color: "blue" },
  { name: "Pousada Casa Centro", short: "Casa Centro", url: "http://hotels.cloudbeds.com/connect/207758#/calendar", rooms: 7, color: "terracotta" },
  { name: "Pousada Centro Up", short: "Centro Up", url: "http://hotels.cloudbeds.com/connect/209202#/calendar", rooms: 0, color: "sage" },
  { name: "Solar João Fernandes", short: "Solar João Fernandes", url: "http://hotels.cloudbeds.com/connect/239462#/calendar", rooms: 8, color: "sand" },
];

export const loftMessage = "Olá! Somos seus anfitriões da G Hotelaria Brasil durante sua estadia em Búzios.\n\nO check-in é a partir das 14h. O seu apartamento é o loft {num}. Para entrar, use o cofre mecânico com o código 0816. A piscina funciona até às 22h. Estamos à disposição!";
