import DayPanel from "@/components/DayPanel";
import Header from "@/components/header";
import { fetchChefByEmail, fetchKitchenDay, fetchKitchenName, fetchKitchenWeek } from "@/firebase/server";
import { Day } from "@/firebase/types";
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
              <div className="px-8 py-4 overflow-x-auto w-full xl:w-4/5 flex flex-col">
                  {
                    Object.keys(kitchenWeek).map(async (day_name) => {
                        const day = kitchenWeek[day_name];
                        const assignee = await fetchChefByEmail(day.chef_id);
                        const unassigned = day.chef_id.length === 0;
                        return <DayPanel key={day.day} day={day} assignee={assignee} kitchen_id={params.kitchen} unassigned={unassigned}/>
                    })
                  }
              </div>
            </div>
        </div>
      </>
    );
}