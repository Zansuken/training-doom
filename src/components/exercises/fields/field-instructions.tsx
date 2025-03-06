import { FC, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { ExerciseInstructionsType } from "@/types/exercise.type";
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  Textarea,
} from "@heroui/react";
import { compareArrays } from "@/helpers/arrays";
import { generateId } from "@/helpers/ids";
import NumberOutlined from "@/components/icons/NumbersOutlined";

const MAX_INSTRUCTIONS = 9;

interface FieldInstructionsProps {
  instructions: ExerciseInstructionsType;
  context: "SHOW" | "EDIT";
  onChange: (value: ExerciseInstructionsType) => void;
}

const FieldInstructions: FC<FieldInstructionsProps> = ({
  instructions,
  context,
  onChange,
}) => {
  const [formInstructions, setFormInstructions] = useState(instructions);

  const instructionsRef = useRef(instructions);

  const addInstruction = () => {
    setFormInstructions([
      ...formInstructions,
      {
        id: generateId(),
        description: "",
      },
    ]);
  };
  const removeInstruction = (id: string) => {
    setFormInstructions(
      formInstructions.filter((instruction) => instruction.id !== id)
    );
  };
  const updateInstruction = (id: string, value: string) => {
    setFormInstructions(
      formInstructions.map((instruction) =>
        instruction.id === id
          ? { ...instruction, description: value }
          : instruction
      )
    );
  };

  const resetInstructions = () => {
    setFormInstructions(instructionsRef.current);
    onChange(instructionsRef.current);
  };

  const hasChanged = !compareArrays(instructions, formInstructions);

  const isAddDisabled = formInstructions.length >= MAX_INSTRUCTIONS;

  if (formInstructions.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <Alert title="No instructions added" color="primary" variant="faded" />
        {context === "EDIT" && (
          <Button
            onPress={addInstruction}
            color="primary"
            size="sm"
            startContent={<Icon icon="akar-icons:plus" width={16} />}
            isDisabled={isAddDisabled}
          >
            Add Step
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {context === "EDIT" && (
        <div className="flex justify-between gap-2">
          <Button
            onPress={addInstruction}
            color="primary"
            size="sm"
            startContent={<Icon icon="akar-icons:plus" width={16} />}
            isDisabled={isAddDisabled}
          >
            Add Step
          </Button>
          {hasChanged && (
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                color="primary"
                size="sm"
                variant="bordered"
                onPress={resetInstructions}
              >
                <Icon icon="mdi:restore" width={16} />
              </Button>
              <Button
                color="primary"
                size="sm"
                onPress={() => onChange(formInstructions)}
              >
                Confirm Changes
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
            context === "EDIT" && "!transform-none !rotate-0 !transition-none",
        }}
        className="max-h-60 overflow-y-auto"
      >
        {formInstructions.map(({ id, description }, index) => (
          <AccordionItem
            key={index}
            title={
              <div className="flex items-center gap-1">
                <span className="text-primary font-semibold">Step</span>
                <NumberOutlined number={index + 1} className="text-primary" />
              </div>
            }
            indicator={() =>
              context === "EDIT" && (
                <div
                  className="flex items-center justify-center cursor-pointer w-8 h-8 hover:bg-danger-100 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeInstruction(id);
                    return false;
                  }}
                >
                  <Icon
                    icon="akar-icons:minus"
                    width={16}
                    className="text-danger"
                  />
                </div>
              )
            }
            textValue={`Step ${index + 1}: ${description}`}
          >
            <Textarea
              isReadOnly={context === "SHOW"}
              value={description}
              onChange={(e) => updateInstruction(id, e.target.value)}
              variant="flat"
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FieldInstructions;
