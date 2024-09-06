import { useQuizContext } from "@/context/quizProvider";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const StartingMenu = () => {
  const { startQuiz } = useQuizContext();

  return (
    <Card
      isBlurred
      radius="md"
      className="bg-zinc-800 p-10 h-auto *:text-center *:tablet:text-start"
    >
      <CardHeader>
        <h1 className="text-5xl w-full">
          Quiz Project
        </h1>
      </CardHeader>
      <CardBody>
        <p>You will have 30 seconds to answer 10 questions. For the first 10 seconds, the options will not be clickable.</p>
      </CardBody>
      <CardFooter>
        <Button
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
  )
}

export default StartingMenu