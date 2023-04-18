import { saveAs } from 'file-saver';

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function downloadCSV(data: any, fileName: string): void {
  const replacer = (key, value) => (value === null ? '' : value);
  const header = Object.keys(data[0]);
  let csv = data.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');

  var blob = new Blob([csvArray], { type: 'text/csv' });
  saveAs(blob, `${fileName}.csv`);
}
