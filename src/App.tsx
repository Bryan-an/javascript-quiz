import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { GameComponent, JavaScriptLogo, StartComponent } from "./components";
import { useQuestionsStore } from "./store";

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  console.log(questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="center"
          marginBottom={4}
        >
          <JavaScriptLogo />
          <Typography variant="h3" component="h1" fontWeight="400">
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length > 0 ? <GameComponent /> : <StartComponent />}
      </Container>
    </main>
  );
}

export default App;
