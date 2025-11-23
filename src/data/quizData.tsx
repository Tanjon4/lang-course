// /data/quizData.ts
export type Question = {
  id: number;
  question: string;
  answer: string;
  options?: string[]; // QCM only
};

// QCM Questions
export const qcmQuestions: Question[] = [
  { id: 1, question: "How do you say 'Hello' to greet someone?", options: ["Goodbye", "Hello", "Thank you", "Excuse me"], answer: "Hello" },
  { id: 2, question: "Which greeting is used in the morning?", options: ["Good evening", "Good morning", "Good night", "See you"], answer: "Good morning" },
  { id: 3, question: "What do you say when you meet someone for the first time?", options: ["Nice to meet you", "See you later", "Take care", "Good night"], answer: "Nice to meet you" },
  { id: 4, question: "Which greeting is used in the afternoon?", options: ["Good afternoon", "Good morning", "Good night", "Hello"], answer: "Good afternoon" },
  { id: 5, question: "Which greeting is used in the evening when you meet someone?", options: ["Good afternoon", "Good evening", "Good night", "Welcome"], answer: "Good evening" },
];


// Input Questions
export const inputQuestions: Question[] = [
  { id: 11, question: "How do you ask about someone's well-being? (Write the question)", answer: "How are you?" },
  { id: 12, question: "Write a common reply to 'How are you?'", answer: "I'm fine, thank you" },
  { id: 13, question: "Write another polite reply to 'How are you?' (short answer)", answer: "I'm good" },
  { id: 14, question: "How do you say 'See you soon'?", answer: "See you soon" },
  { id: 15, question: "Write the greeting used on the phone.", answer: "Hello" },
];

