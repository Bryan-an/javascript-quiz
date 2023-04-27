import { Button } from "@mui/material";
import { useQuestionsStore } from "../store";
import { LIMIT_QUESTIONS } from "../constants";

export const StartComponent = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <Button onClick={handleClick} variant="contained" color="primary">
      ¡Empezar!
    </Button>
  );
};
