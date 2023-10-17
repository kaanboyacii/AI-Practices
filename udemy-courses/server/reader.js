import fs from 'fs';
import csv from 'csv-parser';

const arananKelime = "Financial"; 
const dosyaYolu = 'udemy_courses.csv'; 
const sonucDosyaYolu = 'aranan_kurslar.txt'; 
const yazmaAkisi = fs.createWriteStream(sonucDosyaYolu);
const okumaAkisi = fs.createReadStream(dosyaYolu);

okumaAkisi
  .pipe(csv())
  .on('data', (row) => {
    const courseTitle = row['course_title'] || '';
    if (courseTitle.toLowerCase().includes(arananKelime.toLowerCase())) {
      const satir = `course_id: ${row.course_id}\n` +
                    `course_title: ${row.course_title}\n` +
                    `url: ${row.url}\n` +
                    `is_paid: ${row.is_paid}\n` +
                    `price: ${row.price}\n` +
                    `num_subscribers: ${row.num_subscribers}\n` +
                    `num_reviews: ${row.num_reviews}\n` +
                    `num_lectures: ${row.num_lectures}\n` +
                    `level: ${row.level}\n` +
                    `content_duration: ${row.content_duration}\n` +
                    `published_timestamp: ${row.published_timestamp}\n` +
                    `subject: ${row.subject}\n---\n`;

      yazmaAkisi.write(satir);
    }
  })
  .on('end', () => {
    console.log(`"${arananKelime}" kelimesini içeren kurslar "${sonucDosyaYolu}" dosyasına kaydedildi.`);
    yazmaAkisi.end();
  });
