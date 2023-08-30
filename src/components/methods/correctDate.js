//Purchase, sales and movements(editing)
export function sendFormattedDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

//Movements(table, details)
export function getFormattedDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String((date.getMonth() + 1)).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}