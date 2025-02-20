import { FC, useState } from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

type SignUpFormData = {
  email: string;
  password: string;
};

const SignUp: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { register, handleSubmit } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();
  const auth = getAuth();

  const onSubmit: SubmitHandler<SignUpFormData> = async ({
    email,
    password,
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  document.title = "Sign Up";

  return (
    <DefaultLayout>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
          <p className="pb-4 text-left text-3xl font-semibold">
            Sign Up
            <span aria-label="emoji" className="ml-2" role="img">
              👋
            </span>
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
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
            />
            <Button color="primary" type="submit">
              Sign Up
            </Button>
          </form>
          <p className="text-center text-small">
            <Button
              className="w-full"
              color="primary"
              onPress={() => navigate("/auth/sign-in")}
              size="md"
              variant="light"
            >
              Already have an account? Sign In
            </Button>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
