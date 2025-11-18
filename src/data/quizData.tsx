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
  { id: 6, question: "What do you say before going to sleep?", options: ["Good evening", "Good night", "Hello", "See you soon"], answer: "Good night" },
  { id: 7, question: "Which phrase is a friendly greeting?", options: ["What's up?", "Go away", "Leave me alone", "Be quiet"], answer: "What's up?" },
  { id: 8, question: "Which expression is used to politely greet a guest?", options: ["Welcome", "Get out", "Later", "Never mind"], answer: "Welcome" },
  { id: 9, question: "Which phrase is used when you are leaving?", options: ["Goodbye", "Nice to meet you", "Good morning", "Hello"], answer: "Goodbye" },
  { id: 10, question: "Which phrase is used when you hope to meet again soon?", options: ["Please", "See you later", "Thank you", "Excuse me"], answer: "See you later" },
];


// Input Questions
export const inputQuestions: Question[] = [
  { id: 11, question: "How do you ask about someone's well-being? (Write the question)", answer: "How are you?" },
  { id: 12, question: "Write a common reply to 'How are you?'", answer: "I'm fine, thank you" },
  { id: 13, question: "Write another polite reply to 'How are you?' (short answer)", answer: "I'm good" },
  { id: 14, question: "How do you say 'See you soon'?", answer: "See you soon" },
  { id: 15, question: "Write the greeting used on the phone.", answer: "Hello" },
  { id: 16, question: "How do you politely say good wishes when someone is leaving? (short phrase)", answer: "Take care" },
  { id: 17, question: "How do you greet someone after a long time? (friendly phrase)", answer: "Long time no see" },
  { id: 18, question: "How do you say 'I am happy to meet you' in a greeting phrase?", answer: "Nice to meet you" },
  { id: 19, question: "How do you introduce yourself? (start with 'My name is...')", answer: "My name is ..." },
  { id: 20, question: "How do you greet in a formal situation? (polite greeting)", answer: "Good afternoon" },
];

