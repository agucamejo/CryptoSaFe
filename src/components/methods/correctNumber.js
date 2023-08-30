export function formattedNumber(number) {
  if (number === undefined) {
    return '';
  }
  
  return number.toLocaleString('es-AR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 5 });
}