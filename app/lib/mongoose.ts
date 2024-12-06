import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: String, required: true },
});

// Define the Result schema
const ResultSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

// Define the Quiz schema
const QuizSchema = new mongoose.Schema({
  quizName: { type: String, required: true },
  creatorName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  questions: { type: [QuestionSchema], required: true },
  results: { type: [ResultSchema], default: [] },
}, {collection: "Quizzes"});

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema, "quizzes");
