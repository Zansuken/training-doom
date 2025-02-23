import { FC } from "react";
import { addToast, Button, Form, Input } from "@heroui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUser } from "@/functions/user";
import { useAppContext } from "@/context";
import { updateProfile } from "firebase/auth";

interface ProfileFormData {
  nickname: string;
  birthDate: string;
  height: number;
  currentWeight: number;
}

const validationSchema = yup.object().shape({
  nickname: yup
    .string()
    .required("Nickname is required")
    .min(3, "Nickname must be at least 3 characters")
    .max(20, "Nickname must be at most 20 characters"),
  birthDate: yup
    .string()
    .required("Birth date is required")
    .test("is-in-past", "Birth date must be in the past", (value) => {
      const date = new Date(value as string);
      const isPast = date < new Date();

      return isPast;
    }),
  height: yup.number().required().min(0),
  currentWeight: yup.number().required().min(0),
});

const ProfileForm: FC = () => {
  const { user, refreshUserDetails, userDetails } = useAppContext();

  const { register, handleSubmit, formState, reset } = useForm<ProfileFormData>(
    {
      mode: "onBlur",
      defaultValues: {
        nickname: user?.displayName || "",
        birthDate:
          userDetails?.birthDate || new Date().toISOString().split("T")[0],
        height: userDetails?.height || 0,
        currentWeight: userDetails?.currentWeight || 0,
      },
      resolver: yupResolver(validationSchema),
    }
  );

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      if (user?.uid) {
        const { nickname, ...profile } = data;

        if (nickname !== user.displayName) {
          await updateProfile(user, { displayName: nickname });
        }
        if (
          userDetails?.birthDate !== profile.birthDate ||
          userDetails?.height !== profile.height ||
          userDetails?.currentWeight !== profile.currentWeight
        ) {
          await updateUser(user.uid, profile);
          await refreshUserDetails();
        }
      }
      reset(data);
      addToast({
        title: "Profile updated successfully",
        color: "success",
      });
    } catch (error: any) {
      console.error(error);
      addToast({
        title: error?.message || "An error occurred",
        color: "danger",
      });
    }
  };

  const inputs = [
    {
      name: "nickname",
      label: "Nickname",
      placeholder: "Enter your nickname",
      errorMessage: formState.errors.nickname?.message,
    },
    {
      name: "birthDate",
      label: "Birth Date",
      placeholder: "Enter your birth date",
      type: "date",
      errorMessage: formState.errors.birthDate?.message,
    },
    {
      name: "height",
      label: "Height",
      placeholder: "Enter your height",
      type: "number",
      endContent: "cm",
      errorMessage: formState.errors.height?.message,
    },
    {
      name: "currentWeight",
      label: "Current Weight",
      placeholder: "Enter your current weight",
      type: "number",
      endContent: "kg",
      errorMessage: formState.errors.currentWeight?.message,
    },
  ];

  return (
    <Form
      className="flex flex-col items-end gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {inputs.map((input) => (
        <Input
          key={input.name}
          isRequired
          label={input.label}
          labelPlacement="outside"
          placeholder={input.placeholder}
          type={input.type}
          variant="bordered"
          endContent={input.endContent}
          {...register(input.name as keyof ProfileFormData)}
          isInvalid={!!input.errorMessage}
          errorMessage={input.errorMessage}
        />
      ))}
      {formState.isDirty && (
        <Button
          color="primary"
          type="submit"
          isDisabled={!formState.isValid}
          isLoading={formState.isSubmitting}
        >
          Save
        </Button>
      )}
    </Form>
  );
};

export default ProfileForm;
