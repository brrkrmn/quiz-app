import { useQuizContext } from "@/context/quizProvider";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Progress } from "@nextui-org/react";
import cn from "classnames";
import { useEffect, useState } from "react";
import { options } from "./Quiz.constants";

const Quiz = () => {
  const { currentQuestion, handleSaveAndNext, step } = useQuizContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    setSeconds(30);
    setIsDisabled(true);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev <= 0 ? 30 : prev - 1;
        if (newSeconds === 20) {
          setIsDisabled(false);
        }
        if (newSeconds === 0) {
          handleSaveAndNext();
          clearInterval(interval);
        }
        return newSeconds;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [step]);

  const handleClick = (e: any) => {
    handleSaveAndNext(e.target.id);
  };

  return (
    <Card
      isBlurred
      radius="md"
      className="bg-zinc-800 relative p-2 tablet:p-10 w-full max-w-3xl h-auto *:text-center *:tablet:text-start"
    >
      <CardHeader className="flex items-center justify-start gap-4">
        <p className="bg-content3 min-w-14 w-14 h-14 aspect-square rounded-full text-2xl flex items-center justify-center">
          {currentQuestion?.number}
        </p>
        <p className="text-xl text-wrap">{currentQuestion?.title} ?</p>
      </CardHeader>
      <Divider className="my-4" />
      <CardBody className="flex flex-col items-start justify-center gap-4">
        {options.map((option) => (
          <Button
            isDisabled={isDisabled}
            id={option}
            onPress={handleClick}
            className={cn("flex items-center justify-start gap-4 py-2 flex-1", {
              "pointer-events-auto cursor-not-allowed": isDisabled,
            })}
          >
            <span>{option}</span>
            <span className="text-wrap text-start">
              {currentQuestion?.options[option]}
            </span>
          </Button>
        ))}
      </CardBody>
      <CardFooter className="flex items-end justify-center tablet:justify-end">
        <Button
          color="warning"
          variant="flat"
          onPress={() => handleSaveAndNext()}
        >
          Next Question
        </Button>
      </CardFooter>
      <div className="absolute left-0 bottom-0 flex items-end w-full">
        <Progress
          value={Math.min(seconds, 20)}
          maxValue={20}
          label={`${seconds}s`}
          color="warning"
          radius="none"
          size="sm"
          className="basis-[0] flex-grow-[2]"
          classNames={{
            label: "ml-2 tracking-wider font-medium text-default-600",
          }}
        />
        <Progress
          value={seconds - 20}
          maxValue={10}
          color="default"
          radius="none"
          size="sm"
          className="basis-0 flex-grow-[1]"
        />
      </div>
    </Card>
  );
};

export default Quiz