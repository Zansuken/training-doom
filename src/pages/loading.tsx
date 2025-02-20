import DefaultLayout from "@/layouts/default";
import { CircularProgress } from "@heroui/react";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <DefaultLayout>
      <CircularProgress />
    </DefaultLayout>
  );
}

export default Loading;