export type Question = {
  question: string;
  options: string[];
  correctOption: string; // The correct option's value
};

export type Result = {
  userName: string; // Name of the user who took the quiz
  score: number;  // User's score
  ipAddress: string;
  timestamp: Date; // When the quiz was taken
};

export type Quiz = {
  quizName: string;
  creatorName: string;
  startTime: Date;
  endTime: Date;
  questions: Question[];
  results: Result[];
};
