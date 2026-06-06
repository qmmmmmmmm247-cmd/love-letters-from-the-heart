import { createFileRoute } from "@tanstack/react-router";
import { OurTime } from "../components/OurTime";

export const Route = createFileRoute("/our-time")({
  head: () => ({
    meta: [
      { title: "عُمرنا مع بعض - نبض قلبي" },
      { name: "description", content: "عدّاد كل ثانية عشناها سوا، وكام يوم باقي على عيد ميلادك" },
      { property: "og:title", content: "عُمرنا مع بعض" },
      { property: "og:description", content: "كل ثانية معاكي بتتحسب 💗" },
    ],
  }),
  component: OurTimePage,
});

function OurTimePage() {
  return (
    <div className="mx-auto max-w-4xl py-6">
      <OurTime />
    </div>
  );
}
