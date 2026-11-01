// label: 1 = plagiarized (copied or paraphrased), 0 = not plagiarized
export const pairs = [
  // copied (exact or near-exact)
  { a: 'The quick brown fox jumps over the lazy dog.', b: 'A quick brown fox jumps over a lazy dog.', label: 1 },
  { a: 'Machine learning is changing how we build software.', b: 'Machine learning is changing how we build software today.', label: 1 },
  { a: 'Water boils at one hundred degrees Celsius at sea level.', b: 'Water boils at one hundred degrees Celsius at sea level.', label: 1 },
  { a: 'The Industrial Revolution transformed manufacturing across Europe.', b: 'The Industrial Revolution transformed manufacturing across all of Europe.', label: 1 },
  { a: 'Regular exercise improves both physical and mental health.', b: 'Regular exercise improves physical and mental health.', label: 1 },

  // paraphrased (same meaning, different words)
  { a: 'The car was driven fast down the road.', b: 'The vehicle moved at high speed along the street.', label: 1 },
  { a: 'Students should review their notes before the exam.', b: 'Learners ought to go over their notes prior to the test.', label: 1 },
  { a: 'The company reported a significant increase in profits.', b: 'The firm announced a large rise in earnings.', label: 1 },
  { a: 'Climate change is causing sea levels to rise.', b: 'Global warming is making the oceans climb higher.', label: 1 },
  { a: 'He was extremely tired after the long journey.', b: 'The lengthy trip left him completely exhausted.', label: 1 },

  // unrelated (different topic)
  { a: 'The quick brown fox jumps over the lazy dog.', b: 'Cooking pasta requires boiling water and good salt.', label: 0 },
  { a: 'Machine learning is changing how we build software.', b: 'I enjoy walking on the beach every morning.', label: 0 },
  { a: 'Water boils at one hundred degrees Celsius at sea level.', b: 'The football match ended in a draw last night.', label: 0 },
  { a: 'The Industrial Revolution transformed manufacturing across Europe.', b: 'My sister adopted a small grey kitten yesterday.', label: 0 },
  { a: 'Regular exercise improves both physical and mental health.', b: 'The new phone has a faster processor and better camera.', label: 0 },

  // tricky negatives (same topic, NOT copied)
  { a: 'Machine learning is changing how we build software.', b: 'Software engineers often work in teams using version control.', label: 0 },
  { a: 'Climate change is causing sea levels to rise.', b: 'Many countries are debating new tax policies this year.', label: 0 },
  { a: 'The company reported a significant increase in profits.', b: 'The company hired three new engineers last month.', label: 0 },
  { a: 'Students should review their notes before the exam.', b: 'The library closes at eight in the evening on weekdays.', label: 0 },
  { a: 'He was extremely tired after the long journey.', b: 'She was extremely happy after the long holiday.', label: 0 },

    // harder paraphrases (more words changed)
  { a: 'The government introduced new rules to reduce air pollution.', b: 'Authorities brought in fresh regulations aimed at cutting smog.', label: 1 },
  { a: 'Many students struggle to balance study and part-time work.', b: 'Juggling classes with a job is difficult for a lot of learners.', label: 1 },
  { a: 'The experiment failed because the equipment was not calibrated.', b: 'Poor calibration of the instruments caused the test to fail.', label: 1 },
  { a: 'Online shopping has changed how people buy everyday goods.', b: 'The way consumers purchase daily products has been altered by e-commerce.', label: 1 },
  { a: 'The patient recovered quickly after the surgery.', b: 'After the operation, the patient got better very fast.', label: 1 },

  // harder negatives (similar words, different meaning or fact)
  { a: 'The dog bit the man on the street.', b: 'The man bit the dog on the street.', label: 0 },
  { a: 'The government introduced new rules to reduce air pollution.', b: 'The government introduced new rules to increase school funding.', label: 0 },
  { a: 'The patient recovered quickly after the surgery.', b: 'The patient complained loudly about the hospital food.', label: 0 },
  { a: 'The experiment failed because the equipment was not calibrated.', b: 'The experiment succeeded because the team worked carefully.', label: 0 },
  { a: 'Online shopping has changed how people buy everyday goods.', b: 'Online learning has changed how students attend classes.', label: 0 },
];