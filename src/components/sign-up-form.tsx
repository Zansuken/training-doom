import { Button, Form, Input } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import EyeClosedIconOutlined from "./icons/EyeClosedIconOutlined";
import EyeOpenIconOutlined from "./icons/EyeOpenIconOutlined";

export interface SignUpFormData {
  email: string;
  password: string;
  nickname: string;
}

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const validationSchema = yup.object().shape({
  nickname: yup
    .string()
    .required()
    .min(3, "Nickname must be at least 3 characters")
    .max(20, "Nickname must be at most 20 characters"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type SignUpFormProps = {
  onSubmit: SubmitHandler<SignUpFormData>;
};

const SignUpForm: FC<SignUpFormProps> = ({ onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        isRequired
        label="Nickname"
        labelPlacement="outside"
        placeholder="Enter your nickname"
        variant="bordered"
        {...register("nickname")}
        isInvalid={!!formState.errors.nickname}
        errorMessage={formState.errors.nickname?.message}
      />
      <Input
        isRequired
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
        {...register("email")}
      />
      <Input
        isRequired
        endContent={
          <button type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <EyeClosedIconOutlined className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeOpenIconOutlined className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        label="Password"
        labelPlacement="outside"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
        className="pb-4"
        {...register("password")}
        isInvalid={!!formState.errors.password}
        errorMessage={formState.errors.password?.message}
      />
      <Button
        color="primary"
        type="submit"
        className="w-full"
        isDisabled={!formState.isValid}
        isLoading={formState.isSubmitting}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
