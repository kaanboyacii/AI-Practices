import fs from 'fs';
import csv from 'csv-parser';

const arananKelime = "devops";
const dosyaYolu = 'jobs.csv';
const sonucDosyaYolu = 'result.txt';

const yazmaAkisi = fs.createWriteStream(sonucDosyaYolu);
const okumaAkisi = fs.createReadStream(dosyaYolu);

okumaAkisi
  .pipe(csv())
  .on('data', (row) => {
    const jobTitle = row['Job Title'] || 'Bilgi Yok';
    const jobExperience = row['Job Experience Required'] || 'Bilgi Yok';
    const keySkills = row['Key Skills'] || 'Bilgi Yok';
    const roleCategory = row['Role Category'] || 'Bilgi Yok';
    const location = row['Location'] || 'Bilgi Yok';
    const functionalArea = row['Functional Area'] || 'Bilgi Yok';
    const industry = row['Industry'] || 'Bilgi Yok';
    const role = row['Role'] || 'Bilgi Yok';
    const longitude = row['Longitude'] || 'Bilgi Yok';
    const latitude = row['Latitude'] || 'Bilgi Yok';
    const sal = row['sal'] || 'Bilgi Yok';
    if (jobTitle.toLowerCase().includes(arananKelime.toLowerCase()) || keySkills.toLowerCase().includes(arananKelime.toLowerCase())) {
      const satir = `Job Title: ${jobTitle}\nJob Experience Required: ${jobExperience}\nKey Skills: ${keySkills}\nRole Category: ${roleCategory}\nLocation: ${location}\nFunctional Area: ${functionalArea}\nIndustry: ${industry}\nRole: ${role}\nLongitude: ${longitude}\nLatitude: ${latitude}\nsal: ${sal}\n---\n`;
      yazmaAkisi.write(satir);
    }
  })
  .on('end', () => {
    console.log('Arama tamamlandı.');
    yazmaAkisi.end();
  });




//FOR Resume.csv

// import fs from 'fs';
// import csv from 'csv-parser';

// const arananKelime = "software developer";
// const dosyaYolu = 'resume.csv';

// const okumaAkisi = fs.createReadStream(dosyaYolu);

// okumaAkisi
//   .pipe(csv())
//   .on('data', (row) => {
//     if (row.Resume_str && row.Resume_str.includes(arananKelime)) {
//       console.log(`ID: ${row.ID}, Kategori: ${row.Category}`);

//     }
//   })
//   .on('end', () => {
//     console.log('Arama tamamlandı.');
//   });
