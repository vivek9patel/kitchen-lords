import DayPanel from "@/components/DayPanel";
import Header from "@/components/header";
import ChefDB from "@/firebase/models/Chef";
import KitchenDB from "@/firebase/models/Kitchen";
import { Day } from "@/firebase/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

   
export async function generateMetadata(
    { params }: {
        params: { kitchen: string }
    }
  ): Promise<Metadata> {
    const kitchen = KitchenDB.getInstance(params.kitchen);
    const kitchenName = await kitchen.getKitchenName();
    return {
      title: `Kitchen Lords | ${kitchenName}`,
    }
  }

export default async function Page({ params }: { params: { kitchen: string } }) {
    const loggedInUser = JSON.parse(cookies().get("currentUser")?.value || "{}");

    if(!loggedInUser.email){
      return "No logged in user";
    }

    return (
      <>
        <div className="px-4 py-2">
            <Header title={"Dpv lords @2111"} isKitchenPage={true} />
            <div className="flex w-full justify-center">
              <div className="px-8 py-4 overflow-x-auto w-full xl:w-4/5 flex flex-col">
                  {["monday"].map(async (day_name) => {
                        const day: Day = await KitchenDB.getInstance(params.kitchen).getDay(day_name);
                        const assignee = await ChefDB.getInstance(day.chef_id).get();
                        const unassigned = day.chef_id.length === 0;
                        return <DayPanel key={day_name} day={day} assignee={assignee} kitchen_id={params.kitchen} unassigned={unassigned}/>
                    })}
              </div>
            </div>
        </div>
      </>
    );
}