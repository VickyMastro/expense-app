export function getDaysNames(dateStr) {
  let dateSplit = dateStr.split("-");
  let date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

  let dayName = date.toLocaleDateString("es-AR", { weekday: "long" });

  return (
    dayName.charAt(0).toUpperCase() +
    dayName.slice(1) +
    ", " +
    dateStr.slice(-2)
  );
}
