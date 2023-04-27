import { Button, Paper, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "../store";
import { useQuizResults } from "../hooks";
import { Cancel, CheckCircle, Help } from "@mui/icons-material";

export const FooterComponent = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const resetQuiz = useQuestionsStore((state) => state.resetQuiz);
  const { correct, incorrect, unanswered } = useQuizResults(questions);

  return (
    <>
      <Paper sx={{ mt: 2, p: 3 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
          >
            <CheckCircle color="success" />
            <Typography>{correct} correcta/s</Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
          >
            <Cancel color="error" />
            <Typography>{incorrect} incorrecta/s</Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
          >
            <Help color="warning" />
            <Typography>{unanswered} sin responder</Typography>
          </Stack>
        </Stack>
      </Paper>

      <Button
        onClick={resetQuiz}
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Volver a empezar
      </Button>
    </>
  );
};
