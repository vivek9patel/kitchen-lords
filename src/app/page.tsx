import AuthButton from "@/components/auth";
import DashboardButton from "@/components/dashboardButton";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <div className="text-6xl font-bold text-center">
        Kitchen Lords
      </div>
      <div className="text-2xl text-center mt-2 mb-6 text-white">
        A dinner chef planner for your favourite rommies.
      </div>
      <DashboardButton/>
      <AuthButton />
    </div>
  );
}
