export function formatEuro(value: number): string {
  return Math.round(value)
    .toLocaleString('fr-FR')
    .replace(/[\u202F\u00A0]/g, ' ')
    .concat(' €');
}
