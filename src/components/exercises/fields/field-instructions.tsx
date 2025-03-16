import { FC, useRef } from "react";
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
  Textarea,
} from "@heroui/react";
import { generateId } from "@/helpers/ids";
import NumberOutlined from "@/components/icons/NumbersOutlined";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import NumberedListIcon from "@/components/icons/NumberedListIcon";
import AddIconOutlined from "@/components/icons/AddIconOutlined";
import RestoreIcon from "@/components/icons/RestoreIcon";
import MinusIcon from "@/components/icons/MinusIcon";

const MAX_INSTRUCTIONS = 9;

interface FieldInstructionsProps {
  instructionsValue: ExerciseInstructionsType;
  context: "SHOW" | "EDIT" | "CREATE";
  setValue: UseFormSetValue<ExerciseFormData>;
  control?: Control<ExerciseFormData, any>;
}

const FieldInstructions: FC<FieldInstructionsProps> = ({
  instructionsValue,
  context,
  setValue,
  control,
}) => {
  const instructionsRef = useRef(instructionsValue);

  const addInstruction = () => {
    setValue("instructions", [
      ...instructionsValue,
      {
        id: generateId(),
        description: "",
      },
    ]);
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

  const resetInstructions = () => {
    setValue("instructions", instructionsRef.current);
  };

  const isAddDisabled = instructionsValue.length >= MAX_INSTRUCTIONS;
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
      render={(field) => (
        <div className="flex flex-col gap-3">
          {isActive && (
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  onPress={addInstruction}
                  color="primary"
                  size="sm"
                  startContent={<AddIconOutlined className="w-5 h-5" />}
                  isDisabled={isAddDisabled}
                >
                  Add Step
                </Button>
                <Badge
                  color="primary"
                  variant="solid"
                  size="sm"
                  content={`${instructionsValue.length}/${MAX_INSTRUCTIONS}`}
                  isInvisible={!instructionsValue.length}
                >
                  <NumberedListIcon width={32} height={32} />
                </Badge>
              </div>
              {!(
                field.field.value.toString() ===
                instructionsRef.current.toString()
              ) && (
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
          )}
          <Accordion
            selectionMode="multiple"
            variant="bordered"
            itemClasses={{
              indicator:
                isActive && "!transform-none !rotate-0 !transition-none",
            }}
            className="max-h-60 overflow-y-auto"
          >
            {instructionsValue.map(({ id, description }, index) => (
              <AccordionItem
                key={index}
                title={<NumberOutlined number={index + 1} />}
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
                />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    />
  );
};

export default FieldInstructions;
