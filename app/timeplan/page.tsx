import { getCurrentUser } from "@/lib/auth";
import Calendar from "../components/fullCalendar";

export default async function Dashboard() {
  const user = await getCurrentUser();
  const displayName = user?.username || user?.full_name || "Sjef";

  return (
    <div>
      <div className="flex flex-col items-center justify-start min-h-screen px-4 pb-10 bg-white dark:bg-[#121212]">
        <div className="mt-25 py-5 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl px-4 md:px-6 gap-4 md:max-w-6xl w-full border border-gray-200/50 dark:border-white/10">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
