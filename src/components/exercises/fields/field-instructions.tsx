import { FC, RefObject, useMemo, useState } from "react";
import {
  ExerciseFormData,
  ExerciseInstructionsType,
} from "@/types/exercise.type";
import {
  Accordion,
  AccordionItem,
  Alert,
  Badge,
  Button,
  Selection,
  Textarea,
} from "@heroui/react";
import { generateId } from "@/helpers/ids";
import NumberOutlined from "@/components/icons/NumbersOutlined";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormSetValue,
} from "react-hook-form";
import NumberedListIcon from "@/components/icons/NumberedListIcon";
import AddIconOutlined from "@/components/icons/AddIconOutlined";
import RestoreIcon from "@/components/icons/RestoreIcon";
import MinusIcon from "@/components/icons/MinusIcon";

const MAX_INSTRUCTIONS = 9;

interface FieldInstructionsProps {
  instructionsValue: ExerciseInstructionsType;
  context: "SHOW" | "EDIT" | "CREATE";
  instructionsRef: RefObject<ExerciseInstructionsType>;
  setValue: UseFormSetValue<ExerciseFormData>;
  control?: Control<ExerciseFormData, any>;
  error?:
    | Merge<
        FieldError,
        (
          | Merge<
              FieldError,
              FieldErrorsImpl<{
                id: string;
                description: string;
              }>
            >
          | undefined
        )[]
      >
    | undefined;
}

const FieldInstructions: FC<FieldInstructionsProps> = ({
  instructionsValue,
  context,
  instructionsRef,
  setValue,
  control,
  error,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const addInstruction = () => {
    const newId = generateId();
    setValue("instructions", [
      ...instructionsValue,
      {
        id: newId,
        description: "",
      },
    ]);
    setSelectedKeys((prev) => {
      const prevSet = new Set(prev);
      prevSet.add(newId);
      return prevSet;
    });

    // Use setTimeout to ensure the DOM has updated
    setTimeout(() => {
      const element = document.getElementById("instructions-accordion");
      if (element) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
        // Focus on the new instruction
        const newInstruction = document.getElementById(`instruction-${newId}`);
        if (newInstruction) {
          newInstruction.focus();
        }
      }
    }, 100);
  };
  const removeInstruction = (id: string) => {
    setValue(
      "instructions",
      instructionsValue.filter((instruction) => instruction.id !== id)
    );
  };
  const updateInstruction = (id: string, value: string) => {
    setValue(
      "instructions",
      instructionsValue.map((instruction) =>
        instruction.id === id
          ? { ...instruction, description: value }
          : instruction
      )
    );
  };

  const areInstructionsEqual = useMemo(() => {
    if (instructionsValue.length !== instructionsRef.current.length) {
      return false;
    }

    return instructionsValue.every((instruction, index) => {
      return (
        instruction.description === instructionsRef.current[index].description
      );
    });
  }, [instructionsValue]);

  const resetInstructions = () => {
    setValue("instructions", instructionsRef.current);
  };

  const isAddDisabled =
    instructionsValue.length >= MAX_INSTRUCTIONS ||
    instructionsValue.some((instruction) => !instruction.description);
  const isActive = context === "CREATE" || context === "EDIT";

  if (instructionsValue.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <Alert
          title="No instructions added"
          color="primary"
          variant="faded"
          endContent={
            isActive && (
              <Button
                onPress={addInstruction}
                color="primary"
                size="sm"
                startContent={<AddIconOutlined className="w-5 h-5" />}
                isDisabled={isAddDisabled}
              >
                Add Step
              </Button>
            )
          }
        />
      </div>
    );
  }
  return (
    <Controller
      control={control}
      name="instructions"
      render={() => (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-6">
              <Badge
                color="primary"
                variant="solid"
                size="sm"
                content={`${instructionsValue.length}/${MAX_INSTRUCTIONS}`}
                isInvisible={!instructionsValue.length}
              >
                <NumberedListIcon width={32} height={32} />
              </Badge>
              {isActive && (
                <Button
                  onPress={addInstruction}
                  color="primary"
                  size="sm"
                  startContent={<AddIconOutlined className="w-5 h-5" />}
                  isDisabled={isAddDisabled}
                >
                  Add Step
                </Button>
              )}
            </div>
            {!areInstructionsEqual && context === "EDIT" && (
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  color="primary"
                  size="sm"
                  variant="bordered"
                  onPress={resetInstructions}
                >
                  <RestoreIcon className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <Accordion
            selectionMode="multiple"
            variant="bordered"
            itemClasses={{
              indicator:
                isActive && "!transform-none !rotate-0 !transition-none",
            }}
            className="max-h-60 overflow-y-auto"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            id="instructions-accordion"
          >
            {instructionsValue.map(({ id, description }, index) => (
              <AccordionItem
                key={id}
                title={
                  <div className="flex items-center gap-2 w-full">
                    <NumberOutlined
                      number={index + 1}
                      className={error && !description ? "text-danger" : ""}
                    />
                    <div className="max-w-[250px]">
                      <p className="truncate">{description}</p>
                      {error && !description && (
                        <p className="text-danger text-xs">Empty instruction</p>
                      )}
                    </div>
                  </div>
                }
                indicator={() =>
                  isActive && (
                    <div
                      className="flex items-center justify-center cursor-pointer w-8 h-8 hover:bg-danger-100 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        removeInstruction(id);
                        return false;
                      }}
                    >
                      <MinusIcon className="text-danger w-4 h-4" />
                    </div>
                  )
                }
                textValue={`Step ${index + 1}: ${description}`}
              >
                <Textarea
                  isDisabled={context === "SHOW"}
                  value={description}
                  onChange={(e) => updateInstruction(id, e.target.value)}
                  variant="flat"
                  id={`instruction-${id}`}
                />
              </AccordionItem>
            ))}
          </Accordion>
          {error && (
            <p className="ml-1 -mt-1.5 text-danger text-xs">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FieldInstructions;
