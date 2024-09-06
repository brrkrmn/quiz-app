import { useQuizContext } from "@/context/quizProvider";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const StartingMenu = () => {
  const { startQuiz, isLoading } = useQuizContext();

  return (
    <Card
      isBlurred
      radius="md"
      className="bg-zinc-800 w-full max-w-3xl p-10 h-auto *:text-center *:tablet:text-start"
    >
      <CardHeader>
        <h1 className="text-5xl w-full">Quiz Project</h1>
      </CardHeader>
      <CardBody className="flex flex-col items-start justify-center gap-2">
        <p>* You will have 30 seconds to answer 10 questions.</p>
        <p>* For the first 10 seconds, the options will not be clickable.</p>
      </CardBody>
      <CardFooter>
        <Button
          isLoading={isLoading}
          onPress={startQuiz}
          variant="flat"
          color="warning"
          size="lg"
          radius="sm"
          className="w-full tablet:w-auto"
        >
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StartingMenu