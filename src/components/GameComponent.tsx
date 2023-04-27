import { IconButton, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "../store";
import { QuestionComponent } from "./QuestionComponent";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { FooterComponent } from "./FooterComponent";

export const GameComponent = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);

  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  const question = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        marginBottom={3}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew />
        </IconButton>

        <Typography>
          {currentQuestion + 1} / {questions.length}
        </Typography>

        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>

      <QuestionComponent question={question} />

      <FooterComponent />
    </>
  );
};
