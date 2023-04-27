import { create } from "zustand";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

import { type Question } from "../types";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => ({
      // state
      questions: [],
      currentQuestion: 0,

      // actions
      fetchQuestions: async (limit) => {
        const res = await fetch("http://localhost:5173/data.json");
        const json = await res.json();
        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

        set(() => ({ questions }));
      },

      selectAnswer: (questionId, answerIndex) => {
        const { questions } = get();
        const newQuestions: State["questions"] = structuredClone(questions);

        const questionIndex = newQuestions.findIndex(
          (question) => question.id === questionId
        );

        const question = newQuestions[questionIndex];
        const isCorrectUserAnswer = question.correctAnswer === answerIndex;

        if (isCorrectUserAnswer) confetti();

        newQuestions[questionIndex] = {
          ...question,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        };

        set(() => ({ questions: newQuestions }));
      },

      goNextQuestion: () => {
        const { currentQuestion, questions } = get();
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
          set(() => ({ currentQuestion: nextQuestion }));
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestion } = get();
        const previousQuestion = currentQuestion - 1;

        if (previousQuestion >= 0) {
          set({ currentQuestion: previousQuestion });
        }
      },

      resetQuiz: () => {
        set({ questions: [], currentQuestion: 0 });
      },
    }),
    { name: "questions" }
  )
);
