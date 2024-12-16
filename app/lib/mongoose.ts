import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: String, required: true },
});

const ResultSchema = new mongoose.Schema({
  name: String,
  email: String,
  score: Number,
  ipAddress: String,
  identification: String,
}, { strict: true });

const QuizSchema = new mongoose.Schema(
  {
    quizName: { type: String, required: true },
    creatorName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    identification_name: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true },
    results: { type: [ResultSchema], default: [] },
  },
  { collection: "Quizzes" }
);

export const Quiz =
  mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema, "quizzes");
