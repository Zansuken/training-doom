import { Navbar } from "@/components/navbar";
import { Divider } from "@heroui/react";
import { FC, PropsWithChildren } from "react";

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <Divider />
      <main className="container mx-auto max-w-7xl px-6 mb-6 mt-2 pt-3 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
