import DayPanel from "@/components/DayPanel";
import Header from "@/components/header";
import { fetchKitchenName, fetchKitchenWeek } from "@/firebase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";

   
export async function generateMetadata(
    { params }: {
        params: { kitchen: string }
    }
  ): Promise<Metadata> {
    const kitchenName = await fetchKitchenName(params.kitchen);
    return {
      title: `Kitchen Lords | ${kitchenName}`,
    }
  }

export default async function Page({ params }: { params: { kitchen: string } }) {
    const loggedInUser = JSON.parse(cookies().get("currentUser")?.value || "{}");

    if(!loggedInUser.email){
      return "No logged in user";
    }

    const kitchenWeek = await fetchKitchenWeek(params.kitchen);

    return (
      <>
        <div className="px-4 py-2">
            <Header title={"Dpv lords @2111"} isKitchenPage={true} />
            <div className="flex w-full justify-center">
              <div className="px-8 py-4 mt-2 overflow-x-auto w-full xl:w-4/5 flex flex-col">
                  {
                    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day_name) => {
                        const day = kitchenWeek[day_name];
                        return <DayPanel key={day.day} currentUserEmail={loggedInUser.email} default_day={day} kitchen_id={params.kitchen}/>
                    })
                  }
              </div>
            </div>
        </div>
      </>
    );
}