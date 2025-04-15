// src/data/statements.js - Modify to include multilingual support

// English statements
const enTrueStatements = [
  "Twitter (now X) was founded in 2006 by Jack Dorsey, Noah Glass, Biz Stone, and Evan Williams.",
  "The first newspaper published in North America was 'Publick Occurrences' in 1690.",
  "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.",
  "The Associated Press was founded in 1846 as a cooperative of five New York newspapers.",
  "The first SMS text message was sent in 1992 with the message 'Merry Christmas'.",
  "Netflix began as a DVD-by-mail service in 1997 before moving to streaming.",
  "The term 'citizen journalism' became popular after the 2004 Indian Ocean tsunami.",
  "The New York Times has won more than 130 Pulitzer Prizes.",
  "Facebook was originally called 'TheFacebook' when it launched in 2004.",
  "The first television broadcast in Algeria was in 1956.",
  "YouTube was created by former PayPal employees in 2005.",
  "The first podcasts appeared in 2004 when Adam Curry and Dave Winer coded iPodder.",
  "Google was founded in 1998 by Larry Page and Sergey Brin.",
  "The BBC (British Broadcasting Corporation) was founded in 1922.",
  "The smartphone market exploded after Apple introduced the iPhone in 2007.",
  "Wikipedia was launched in 2001 and now has articles in over 300 languages.",
  "The first commercial radio station began broadcasting in 1920.",
  "The 'inverted pyramid' writing style originated during the American Civil War.",
  "TikTok was launched internationally in 2017 after merging with Musical.ly.",
  "The term 'blog' is short for 'weblog' and was first used in 1999.",
];

// French statements
const frTrueStatements = [
  "Twitter (maintenant X) a été fondé en 2006 par Jack Dorsey, Noah Glass, Biz Stone et Evan Williams.",
  "Le premier journal publié en Amérique du Nord était 'Publick Occurrences' en 1690.",
  "Tim Berners-Lee a inventé le World Wide Web en 1989 alors qu'il travaillait au CERN.",
  "L'Associated Press a été fondée en 1846 en tant que coopérative de cinq journaux new-yorkais.",
  "Le premier SMS a été envoyé en 1992 avec le message 'Joyeux Noël'.",
  "Netflix a commencé comme un service de DVD par courrier en 1997 avant de passer au streaming.",
  "Le terme 'journalisme citoyen' est devenu populaire après le tsunami de l'océan Indien en 2004.",
  "Le New York Times a remporté plus de 130 prix Pulitzer.",
  "Facebook s'appelait à l'origine 'TheFacebook' lors de son lancement en 2004.",
  "La première émission de télévision en Algérie a eu lieu en 1956.",
  "YouTube a été créé par d'anciens employés de PayPal en 2005.",
  "Les premiers podcasts sont apparus en 2004 lorsque Adam Curry et Dave Winer ont codé iPodder.",
  "Google a été fondé en 1998 par Larry Page et Sergey Brin.",
  "La BBC (British Broadcasting Corporation) a été fondée en 1922.",
  "Le marché des smartphones a explosé après qu'Apple a introduit l'iPhone en 2007.",
  "Wikipedia a été lancé en 2001 et compte maintenant des articles dans plus de 300 langues.",
  "La première station de radio commerciale a commencé à émettre en 1920.",
  "Le style d'écriture en 'pyramide inversée' est apparu pendant la guerre de Sécession américaine.",
  "TikTok a été lancé internationalement en 2017 après avoir fusionné avec Musical.ly.",
  "Le terme 'blog' est l'abréviation de 'weblog' et a été utilisé pour la première fois en 1999.",
];

// Arabic statements
const arTrueStatements = [
  "تأسس تويتر (المعروف الآن باسم X) في عام 2006 من قبل جاك دورسي، نوح غلاس، بيز ستون، وإيفان ويليامز.",
  "كانت أول صحيفة نُشرت في أمريكا الشمالية هي 'بابليك أوكيرنسز' في عام 1690.",
  "اخترع تيم بيرنرز-لي شبكة الويب العالمية في عام 1989 أثناء عمله في سيرن.",
  "تأسست وكالة أسوشيتد برس في عام 1846 كتعاونية بين خمس صحف نيويوركية.",
  "تم إرسال أول رسالة نصية قصيرة SMS في عام 1992 وكانت 'عيد ميلاد سعيد'.",
  "بدأت نتفليكس كخدمة أقراص DVD عبر البريد في عام 1997 قبل التحول إلى البث المباشر.",
  "أصبح مصطلح 'صحافة المواطن' شائعًا بعد تسونامي المحيط الهندي عام 2004.",
  "فازت صحيفة نيويورك تايمز بأكثر من 130 جائزة بوليتزر.",
  "كان فيسبوك يسمى في الأصل 'ذا فيسبوك' عند إطلاقه في عام 2004.",
  "كان أول بث تلفزيوني في الجزائر في عام 1956.",
  "تم إنشاء يوتيوب من قبل موظفين سابقين في باي بال في عام 2005.",
  "ظهرت أول بودكاست في عام 2004 عندما قام آدم كوري وديف وينر ببرمجة آي بودر.",
  "تأسست جوجل في عام 1998 من قبل لاري بيج وسيرجي برين.",
  "تأسست هيئة الإذاعة البريطانية (BBC) في عام 1922.",
  "انفجر سوق الهواتف الذكية بعد أن قدمت آبل آيفون في عام 2007.",
  "تم إطلاق ويكيبيديا في عام 2001 ولديها الآن مقالات بأكثر من 300 لغة.",
  "بدأت أول محطة إذاعية تجارية البث في عام 1920.",
  "نشأ أسلوب الكتابة 'الهرم المقلوب' خلال الحرب الأهلية الأمريكية.",
  "تم إطلاق تيك توك دوليًا في عام 2017 بعد الاندماج مع Musical.ly.",
  "مصطلح 'مدونة' هو اختصار لـ 'ويب لوج' واستخدم لأول مرة في عام 1999.",
];

// Function to generate false statements by modifying true ones
function generateFalseStatements(trueStatements, count = 20) {
  const falseStatements = [];

  // Modifications for false statements
  const modifications = [
    // Change dates
    (s) => s.replace(/\b(19|20)\d{2}\b/, match => {
      const year = parseInt(match);
      return `${year + Math.floor(Math.random() * 10) + 1}`;
    }),

    // Change numbers
    (s) => s.replace(/\b\d+\b/, match => {
      const num = parseInt(match);
      return `${num * 2}`;
    }),

    // Swap names
    (s) => {
      const names = ["Mark Zuckerberg", "Jeff Bezos", "Elon Musk", "Steve Jobs",
                    "Bill Gates", "Tim Cook", "Sundar Pichai"];
      const regex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/;
      return s.replace(regex, names[Math.floor(Math.random() * names.length)]);
    },

    // Change company names
    (s) => {
      const companies = ["Facebook", "Amazon", "Apple", "Microsoft", "Google",
                        "Twitter", "Netflix", "TikTok", "YouTube", "Instagram"];
      const regex = new RegExp(`\\b(${companies.join('|')})\\b`);
      const match = s.match(regex);

      if (match) {
        let replacement;
        do {
          replacement = companies[Math.floor(Math.random() * companies.length)];
        } while (replacement === match[0]);

        return s.replace(regex, replacement);
      }
      return s;
    },
  ];

  // Generate unique false statements
  let attempts = 0;
  while (falseStatements.length < count && attempts < 100) {
    attempts++;

    // Pick a random true statement
    const trueStatement = trueStatements[Math.floor(Math.random() * trueStatements.length)];

    // Apply a random modification
    const modification = modifications[Math.floor(Math.random() * modifications.length)];
    const falseStatement = modification(trueStatement);

    // Check if it's actually different and not accidentally true
    if (falseStatement !== trueStatement &&
        !trueStatements.includes(falseStatement) &&
        !falseStatements.includes(falseStatement)) {
      falseStatements.push(falseStatement);
    }
  }

  return falseStatements;
}

// Generate false statements for each language
const enFalseStatements = generateFalseStatements(enTrueStatements);
const frFalseStatements = generateFalseStatements(frTrueStatements);
const arFalseStatements = generateFalseStatements(arTrueStatements);

// Export statements by language
export const statements = {
  en: {
    true: enTrueStatements,
    false: enFalseStatements
  },
  fr: {
    true: frTrueStatements,
    false: frFalseStatements
  },
  ar: {
    true: arTrueStatements,
    false: arFalseStatements
  }
};
