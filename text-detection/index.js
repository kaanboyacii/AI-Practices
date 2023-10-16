import fs from 'fs';
import csv from 'csv-parser';

const arananKelime = "";
const dosyaYolu = 'resume.csv';

const okumaAkisi = fs.createReadStream(dosyaYolu);

okumaAkisi
  .pipe(csv())
  .on('data', (row) => {
    if (row.Resume_str && row.Resume_str.includes(arananKelime)) {
      console.log(`ID: ${row.ID}, Kategori: ${row.Category}`);

    }
  })
  .on('end', () => {
    console.log('Arama tamamlandı.');
  });
