"use client";
import DayPanel from "@/components/DayPanel";
import LoadingPage from "@/components/LoadingPage";
import Header from "@/components/header";
import { AuthContext } from "@/context/AuthProvider";
import { ChefsContext } from "@/context/ChefsProvider";
import { fetchKitchenName, fetchKitchenWeek } from "@/firebase/server";
import { Week } from "@/firebase/types";
import { useContext, useEffect, useState } from "react";


export default function Page({ params }: { params: { kitchen: string } }) {
    const {user} = useContext(AuthContext);
    const [kitchenWeek, setKitchenWeek] = useState<Week>({});
    const {setKitchenId} = useContext(ChefsContext);
    const [kitchenName, setKitchenName] = useState<string>("");

    useEffect(() => {
      if(params.kitchen) {
        fetchKitchenWeek(params.kitchen).then((week) => {
          setKitchenWeek(week);
        });
        setKitchenId(params.kitchen);
        fetchKitchenName(params.kitchen).then((name) => {
          setKitchenName(name);
        });
      }
    },[params.kitchen]);

    if(!user?.email || !kitchenName || Object.keys(kitchenWeek).length === 0){
      return <LoadingPage />
    }


    return (
      <>
        <div className="px-4 py-2">
            <Header title={kitchenName} isKitchenPage={true} />
            <div className="flex w-full justify-center">
              <div className="sm:px-8 px-2 py-4 overflow-x-auto w-full xl:w-4/5 flex flex-col">
                  {
                    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day_name) => {
                        const day = kitchenWeek[day_name];
                        if(!day) return null;
                        return <DayPanel key={day.day} currentUserEmail={user.email} default_day={day} kitchen_id={params.kitchen}/>
                    })
                  }
              </div>
            </div>
        </div>
      </>
    );
}