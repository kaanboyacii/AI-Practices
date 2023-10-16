import fs from 'fs';
import csv from 'csv-parser';

const arananKelime = "react";
const dosyaYolu = 'jobs.csv';

const okumaAkisi = fs.createReadStream(dosyaYolu);

okumaAkisi
  .pipe(csv())
  .on('data', (row) => {
    // Verilerde aranan kelimeyi içeren satırları bulun
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
      console.log('Job Title:', jobTitle);
      console.log('Job Experience Required:', jobExperience);
      console.log('Key Skills:', keySkills);
      console.log('Role Category:', roleCategory);
      console.log('Location:', location);
      console.log('Functional Area:', functionalArea);
      console.log('Industry:', industry);
      console.log('Role:', role);
      console.log('Longitude:', longitude);
      console.log('Latitude:', latitude);
      console.log('sal:', sal);
      console.log('---');
    }
  })
  .on('end', () => {
    console.log('Arama tamamlandı.');
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
