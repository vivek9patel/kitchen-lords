'use client';
import { Day, Chef, DishType } from "@/firebase/types";
import UserAvatar from "./UserAvatar";
import Reactions from "./Reactions";
import curryIcon from "@/images/icons/curry.png";
import tacoIcon from "@/images/icons/taco.png";
import pastaIcon from "@/images/icons/pasta.png";
import editIcon from "@/images/icons/edit.png";
import { fetchChefByEmail } from "@/firebase/server";
import { useContext, useEffect, useState } from "react";
import Badge from "./Badge";
import UnAssignedPanel from "./UnAssignedPanel";
import { ToastContext } from "@/context/ToastProvider";
import { updateKitchenDayDishAndAssignee } from "@/firebase/server";

const panelStyles: {
    [dishType: string]: string
} = {
    italian: "border-yellow-200 bg-yellow-100 bg-opacity-10 text-primary-content",
    indian: "border-pink-200 bg-pink-50 bg-opacity-50 text-primary-content",
    mexican: "border-cyan-200 bg-cyan-50 bg-opacity-50 text-primary-content",
    other: "border-neutral border-opacity-20 bg-white bg-opacity-50 text-primary-content",
}

const iconsSrc: {
    [dishType: string]: string
} = {
    italian: pastaIcon.src,
    indian: curryIcon.src,
    mexican: tacoIcon.src,
}

export const ALLOWED_DISH_STYLES = ['italian', 'indian', 'mexican', 'other'];

export default function DayPanel({currentUserEmail, default_day, kitchen_id}: {currentUserEmail:string, default_day: Day, kitchen_id: string}) {
    const [assignee, setAssignee] = useState<Chef>({
        email: "",
        name: "",
        url: "",
        kitchens: {},
        is_god: false,
        has_access: false,
    });
    const [day, setDay] = useState<Day>(default_day);

    const isUnassigned = typeof day.chef_id !== "string" || day.chef_id.length === 0;
    const allowUpdate = day.chef_id === currentUserEmail && !isUnassigned;

    useEffect(() => {
        if(!isUnassigned) {
            fetchChefByEmail(day.chef_id).then((chef)=>{
                setAssignee(chef);
            });
        }
    }, [day]);

    const toggleAlert = useContext(ToastContext);

    const updateDish = async (dishName: string, dishStyle: string) => {
        if(dishName.length < 1 || dishStyle.length < 1){
            toggleAlert('error', 'Please fill in all fields');
            return;
        }
        if(!ALLOWED_DISH_STYLES.includes(dishStyle.toLowerCase())){
            toggleAlert('error', 'Invalid dish style');
            return;
        }
        return await updateKitchenDayDishAndAssignee(kitchen_id, day.day, currentUserEmail, dishName.toLowerCase(), dishStyle.toLowerCase()).then((data)=>{
            if(data.success){
                toggleAlert('success', `You are now the chef for ${day.day}!`);
                setDay({...day, dish_name: dishName, dish_style: dishStyle as DishType, chef_id: currentUserEmail});
            }
            else{
                toggleAlert('error', 'Something went wrong');
            }
        }).catch(()=>{
            toggleAlert('error', 'Something went wrong');
        }).finally(()=>{
            return;
        });
    }
    
    if(isUnassigned) {
        return (
            <UnAssignedPanel key={day.day} day={day} updateDish={updateDish} />
        )
    }

    return (
            <div className={`border relative rounded-xl my-2 py-2 flex justify-evenly items-center gap-4 ${panelStyles[day.dish_style]}`}>
                {
                    iconsSrc[day.dish_style] && (
                        <div className="absolute top-1/2 -left-1 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 shadow-md shadow-slate-400 rounded-full bg-white p-1">
                            <img src={iconsSrc[day.dish_style]} alt="dish icon" className="w-10 h-10"/>
                        </div>
                    )
                }
                <div className=" ml-4 min-w-28 ">
                    <div className="font-bold capitalize text-left">{day.day}</div>
                </div>
                <div className="flex items-center gap-3 w-54 overflow-hidden">
                    {
                        assignee.email.length === 0 ? (
                            <>
                                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                                <div className="flex flex-col">
                                    <div className="skeleton h-3 w-32"></div>
                                    <div className="skeleton h-2 w-28 mt-2"></div>
                                </div>
                            </>
                        ):(
                            <>
                                <UserAvatar photoURL={assignee.url} displayName={assignee.name} />
                                <div className="capitalize flex flex-col items-start">
                                    <div className="w-40 whitespace-nowrap text-ellipsis overflow-hidden">{assignee.name}</div>
                                    <Badge content={assignee.kitchens[kitchen_id].position} />
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="text-center">
                    <div className="font-bold capitalize w-64 whitespace-nowrap text-ellipsis overflow-hidden">{day.dish_name}</div>
                    <div className="text-sm opacity-50 capitalize w-64 whitespace-nowrap text-ellipsis overflow-hidden">{day.dish_style}</div>
                </div>
                <Reactions reactions={day.reactions || {}} day_id={day.day} />
                {
                    allowUpdate ? (
                        <>
                            <div className="tooltip" data-tip="Update">
                            <button className="btn btn-ghost w-10 px-0"> 
                                <img src={editIcon.src} alt="edit icon" className="w-6 h-6" />
                            </button>
                            </div>
                        </>
                    ): (
                        <div className="w-10"></div>
                    )
                }
            </div>
    );
}