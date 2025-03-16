import { FC } from "react";
import { addToast, Button } from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import SignUpForm, { SignUpFormData } from "@/components/sign-up-form";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const onSubmit: SubmitHandler<SignUpFormData> = async ({
    email,
    password,
    nickname,
  }) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(newUser.user, { displayName: nickname });
      navigate("/home");
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        addToast({
          title: "Registration failed. Please verify your email address.",
          color: "danger",
        });
      }
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
          <SignUpForm onSubmit={onSubmit} />
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
