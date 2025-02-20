import { Navbar } from "@/components/navbar";
import { FC, PropsWithChildren } from "react";

const DefaultLayout: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 pb-6 pt-3 flex-grow">
        {children}
      </main>
    </div>
  );
}

export default DefaultLayout;