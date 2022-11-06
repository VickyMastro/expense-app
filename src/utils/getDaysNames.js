export function getDaysNames(dateStr) {
  let date = new Date(dateStr);
  let dayName = date.toLocaleDateString("es-AR", { weekday: "long" });
  return dayName.charAt(0).toUpperCase() + dayName.slice(1) + ", " + dateStr.slice(-2);
}
