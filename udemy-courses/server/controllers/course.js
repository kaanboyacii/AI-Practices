import csvtojsonV2 from 'csvtojson';
import fs from 'fs';

const arananKelime = "Financial";
const dosyaYolu = './data/udemy_courses.csv';

export const getCoursesByWord = async (req, res, next) => {
  try {
    const kurslar = [];

    fs.createReadStream(dosyaYolu)
      .pipe(csvtojsonV2())
      .on('data', (row) => {
        const courseTitle = row['course_title'] || '';
        if (courseTitle.toLowerCase().includes(arananKelime.toLowerCase())) {
          kurslar.push({
            course_id: row.course_id,
            course_title: row.course_title,
            url: row.url,
            is_paid: row.is_paid,
            price: row.price,
            num_subscribers: row.num_subscribers,
            num_reviews: row.num_reviews,
            num_lectures: row.num_lectures,
            level: row.level,
            content_duration: row.content_duration,
            published_timestamp: row.published_timestamp,
            subject: row.subject,
          });
        }
      })
      .on('end', () => {
        res.json({ courses: kurslar });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};
