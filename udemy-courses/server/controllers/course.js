import fs from 'fs';
import csvParser from 'csv-parser';

const dosyaYolu = './data/udemy_courses.csv';

export const getCoursesByWord = (req, res, next) => {
  try {
    const { word } = req.params; 

    if (!word) {
      return res.status(400).json({ error: 'Aranan kelime eksik.' });
    }

    const kurslar = [];

    fs.createReadStream(dosyaYolu)
      .pipe(csvParser())
      .on('data', (row) => {
        const courseTitle = row['course_title'] || '';
        if (courseTitle.toLowerCase().includes(word.toLowerCase())) {
          kurslar.push({
            course_id: row['course_id'],
            course_title: row['course_title'],
            url: row['url'],
            is_paid: row['is_paid'],
            price: row['price'],
            num_subscribers: row['num_subscribers'],
            num_reviews: row['num_reviews'],
            num_lectures: row['num_lectures'],
            level: row['level'],
            content_duration: row['content_duration'],
            published_timestamp: row['published_timestamp'],
            subject: row['subject'],
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
