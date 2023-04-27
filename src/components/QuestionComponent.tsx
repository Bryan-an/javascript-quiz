import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Question } from "../types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionsStore } from "../store";

interface Props {
  question: Question;
}

const getBackgroundColor = (index: number, question: Question) => {
  const { userSelectedAnswer, correctAnswer } = question;

  if (userSelectedAnswer == null) return "transparent";
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  if (index === correctAnswer) return "success.main";
  if (index === userSelectedAnswer) return "error.main";

  return "transparent";
};

export const QuestionComponent = ({ question }: Props) => {
  const {
    question: questionText,
    code,
    answers,
    id,
    userSelectedAnswer,
  } = question;

  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  return (
    <Card variant="outlined" sx={{ textAlign: "left", p: 2, bgcolor: "#222" }}>
      <Typography variant="h5">{questionText}</Typography>

      <SyntaxHighlighter language="javascript" style={a11yDark}>
        {code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={userSelectedAnswer != null}
              onClick={() => selectAnswer(id, index)}
              sx={{ bgcolor: getBackgroundColor(index, question) }}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
