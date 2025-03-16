import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardHeader, Divider, Link } from "@heroui/react";
import { FC } from "react";
import ProfileForm from "@/components/profile-form";
import { useAppContext } from "@/context";
import Loading from "./loading";
import UserIconOutlined from "@/components/icons/UserIconOutlined";

const SettingsPage: FC = () => {
  document.title = "Settings";

  const { isAppLoading, userDetails } = useAppContext();

  if (Boolean(isAppLoading || !userDetails)) {
    return <Loading />;
  }

  return (
    <DefaultLayout>
      <div className="flex h-full w-full flex-col gap-4">
        <section className="flex flex-col gap-4">
          <Card className="flex flex-col gap-4 p-4">
            <CardHeader title="Account">
              <h1 className="text-4xl font-bold">Settings</h1>
            </CardHeader>
            <Divider />
            <CardBody>
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <UserIconOutlined className="w-16 h-16" />
                  <div className="flex flex-col">
                    <Link href="#profile" color="foreground">
                      <h3 className="text-2xl">Profile</h3>
                    </Link>
                    <p>Manage your profile settings here.</p>
                  </div>
                </div>
                <ProfileForm />
              </section>
            </CardBody>
          </Card>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;
