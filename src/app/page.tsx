import AuthButton from "@/components/auth";
import DashboardButton from "@/components/dashboardButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <div className="text-6xl font-bold text-center">
        Kitchen Lords
      </div>
      <div className="text-2xl text-center mt-2 text-white">
        A dinner chef planner for your favourite rommies.
      </div>
      <div className="text-lg text-center mt-2 mb-6">
        Made with ❤️ by <Link className="underline text-primary" target="_blank" href={"https://github.com/vivek9patel"}>V9</Link>
      </div>
      <DashboardButton/>
      <div className="mt-10 max-w-52">
        <AuthButton />
      </div>
    </div>
  );
}
