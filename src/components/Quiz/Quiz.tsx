import { useQuizContext } from "@/context/quizProvider";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Quiz = () => {
  const { currentQuestion, handleSaveAndNext, step } = useQuizContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const options = ["A", "B", "C", "D"];

  useEffect(() => {
    setSeconds(30)
    setIsDisabled(true)

    const buttonsTimeout = setTimeout(() => {
      setIsDisabled(false)
    }, 10000)

    const questionTimeout = setTimeout(() => {
      handleSaveAndNext()
    }, 30000)

    const interval = setInterval(() => {
      setSeconds((v) => (v <=0 ? 30 : v - 1));
    }, 1000);

    return () => {
      clearTimeout(buttonsTimeout)
      clearTimeout(questionTimeout)
      clearInterval(interval)
    }
  }, [step])

  const handleClick = (e) => {
    handleSaveAndNext(e.target.id)
  }

  return (
    <Card
      isBlurred
      radius="md"
      className="bg-zinc-800 relative p-2 tablet:p-10 w-full max-w-3xl h-auto *:text-center *:tablet:text-start"
    >
      <CardHeader className="flex items-center justify-start gap-4">
        <p className="bg-content3 min-w-14 w-14 h-14 aspect-square rounded-full text-2xl flex items-center justify-center">{currentQuestion?.id}</p>
        <p className="text-xl text-wrap">{currentQuestion?.title}{' ?'}</p>
      </CardHeader>
      <Divider className="my-4"/>
      <CardBody className="flex flex-col items-start justify-center gap-4">
        {options.map((option, index) => (
          <Button
            isDisabled={isDisabled}
            id={option}
            onPress={handleClick}
            className={`${isDisabled && 'pointer-events-auto cursor-not-allowed'} flex items-center justify-start gap-4 py-2 flex-1`}
          >
            <span>
              {option}
            </span>
            <span className="text-wrap text-start">
              {currentQuestion?.options[option]}
            </span>
          </Button>
        ))}
      </CardBody>
      <CardFooter className="flex items-end justify-center tablet:justify-end">
        <Button color="warning" variant="flat" onPress={() => handleSaveAndNext()}>Next Question</Button>
      </CardFooter>
      <Progress
        value={seconds}
        maxValue={30}
        label={`${seconds}s`}
        color="warning"
        radius="none"
        size="sm"
        className="absolute left-0 bottom-0"
        classNames={{
          label: "ml-2 tracking-wider font-medium text-default-600",
        }}
      />
    </Card>
  )
}

export default Quiz