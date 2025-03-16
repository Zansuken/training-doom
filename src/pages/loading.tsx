import DefaultLayout from "@/layouts/default";
import { CircularProgress } from "@heroui/react";
import { FC } from "react";

interface LoadingProps {
  withoutLayout?: boolean;
}

const Loading: FC<LoadingProps> = ({ withoutLayout }) => {
  if (withoutLayout) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CircularProgress aria-label="loading-icon" />
      </div>
    );
  }
  return (
    <DefaultLayout>
      <div className="flex h-full w-full items-center justify-center">
        <CircularProgress aria-label="loading-icon" />
      </div>
    </DefaultLayout>
  );
};

export default Loading;
