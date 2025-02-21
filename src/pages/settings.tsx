import DefaultLayout from "@/layouts/default";
import { FC } from "react";

const SettingsPage: FC = () => {
  document.title = "Settings";

  return (
    <DefaultLayout>
      <h1>Settings</h1>
    </DefaultLayout>
  );
};

export default SettingsPage;
