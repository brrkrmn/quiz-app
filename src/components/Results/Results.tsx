import { useQuizContext } from "@/context/quizProvider";
import { Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const Results = () => {
  const { questions, setStatus } = useQuizContext();

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl text-warning-300 font-bold">Results</h1>
      <Table
        color="warning"
        classNames={{
          th: "text-center text-lg",
          td: "text-center text-lg",
          wrapper: "border-[1px] border-divider",
        }}
        aria-label="Results Table"
        className="*:text-center"
      >
        <TableHeader>
          <TableColumn key="number">Question</TableColumn>
          <TableColumn key="selected">Answer</TableColumn>
        </TableHeader>
        <TableBody items={questions}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {getKeyValue(item, columnKey) ?? "Skipped"}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button
        onPress={() => setStatus("notStarted")}
        color="warning"
        variant="flat"
        size="lg"
        fullWidth
      >
        Home
      </Button>
    </div>
  );
}

export default Results