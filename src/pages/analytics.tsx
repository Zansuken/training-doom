import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AnalyticsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <span className={title({ color: "violet", size: "lg" })}>
          Analytics Page
        </span>
      </section>
    </DefaultLayout>
  );
}
