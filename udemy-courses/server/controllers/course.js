import fs from 'fs';
import csvParser from 'csv-parser';
import pdfjs from 'pdfjs-dist';

const dosyaYolu = './data/udemy_courses.csv';
const cvDosyaYolu = './data/cv.pdf';

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

export const readPDF = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(cvDosyaYolu);
    const data = new Uint8Array(dataBuffer);

    const loadingTask = pdfjs.getDocument(data);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    let pdfText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const pdfPage = await pdfDocument.getPage(pageNum);
      const textContent = await pdfPage.getTextContent();
      pdfText += textContent.items.map((item) => item.str).join(' ');
    }

    const skills = extractSkills(pdfText);
    res.json({ fullText: pdfText, skills });

  } catch (error) {
    console.error('PDF okuma hatası:', error);
    res.status(500).json({ error: 'PDF okuma hatası' });
  }
};

export const extractSkills = (pdfText) => {
  const skillsIndex = pdfText.toLowerCase().indexOf("skills");
  const programmingIndex = pdfText.toLowerCase().indexOf("programming");

  if (skillsIndex !== -1 && programmingIndex !== -1) {
    // "Skills" ve "Programming" başlıkları arasındaki metni al
    const skillsText = pdfText.slice(skillsIndex, programmingIndex);
    // Metni satırlara bölmek
    const lines = skillsText.split('\n');
    // Becerileri saklamak için bir dizi oluştur
    const skills = [];
    // Her satırı gezin ve becerileri çıkar
    for (let line of lines) {
      // Her satırı boşluklara göre ayırarak kelimeleri elde et
      const words = line.split(' ');
      // Boşlukları temizle
      const cleanedWords = words.map((word) => word.trim());
      // Boş olan kelimeleri veya işareti içeren kelimeleri filtrele
      const validWords = cleanedWords.filter((word) => word !== '');
      // Eğer bu satırda geçerli kelimeler varsa, beceri olarak kabul et
      if (validWords.length > 0) {
        skills.push(validWords.join(' '));
      }
    }

    return skills;
  } else {
    return [];
  }
};

export const loadUdemyCourses = () => {
  return new Promise((resolve, reject) => {
    const udemyCourses = [];
    fs.createReadStream(dosyaYolu)
      .pipe(csvParser())
      .on('data', (row) => {
        udemyCourses.push({
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
      })
      .on('end', () => {
        resolve(udemyCourses);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

export const findCoursesBySkills = async (req, res) => {
  try {
    // Özgeçmişten beceri bilgilerini al
    const dataBuffer = fs.readFileSync(cvDosyaYolu);
    const data = new Uint8Array(dataBuffer);
    const loadingTask = pdfjs.getDocument(data);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    let pdfText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const pdfPage = await pdfDocument.getPage(pageNum);
      const textContent = await pdfPage.getTextContent();
      pdfText += textContent.items.map((item) => item.str).join(' ');
    }

    const skills = extractSkills(pdfText);

    // Kurs verilerini yükle
    const udemyCourses = await loadUdemyCourses();

    // Uygun kursları depolamak için bir dizi oluştur
    const matchingCourses = [];

    // Her bir beceri kelimesini tek tek bölerek kursları arayın
    skills.forEach((skill) => {
      const keywords = skill.split(' ');

      keywords.forEach((keyword) => {
        udemyCourses.forEach((course) => {
          const courseTitle = course.course_title || '';
          if (courseTitle.toLowerCase().includes(keyword.toLowerCase())) {
            matchingCourses.push(course);
          }
        });
      });
    });

    res.json({ courses: matchingCourses });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};

