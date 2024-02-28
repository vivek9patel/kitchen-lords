'use client';
import { Day, Chef, DishType } from "@/firebase/types";
import UserAvatar from "./UserAvatar";
import Reactions from "./Reactions";
import curryIcon from "@/images/icons/curry.png";
import tacoIcon from "@/images/icons/taco.png";
import pastaIcon from "@/images/icons/pasta.png";
import deleteIcon from "@/images/icons/delete.png";
import chineseIcon from "@/images/icons/chinese.png";
import { deleteKitchenDayDishAndAssignee, fetchChefByEmail } from "@/firebase/server";
import { useContext, useEffect, useState } from "react";
import Badge from "./Badge";
import UnAssignedPanel from "./UnAssignedPanel";
import { ToastContext } from "@/context/ToastProvider";
import { updateKitchenDayDishAndAssignee } from "@/firebase/server";
import { AuthContext } from "@/context/AuthProvider";
import { ChefsContext } from "@/context/ChefsProvider";

const panelStyles: {
    [dishType: string]: string
} = {
    italian: "border-amber-400 bg-amber-300 bg-opacity-10 text-primary-content",
    indian: "border-violet-400 bg-violet-50 bg-opacity-50 text-primary-content",
    mexican: "border-cyan-200 bg-cyan-50 bg-opacity-50 text-primary-content",
    chienese: "border-rose-300 bg-rose-50 bg-opacity-50 text-primary-content",
    other: "border-neutral border-opacity-20 bg-white bg-opacity-50 text-primary-content",
}

const iconsSrc: {
    [dishType: string]: string
} = {
    italian: pastaIcon.src,
    indian: curryIcon.src,
    mexican: tacoIcon.src,
    chienese: chineseIcon.src,
}

export const ALLOWED_DISH_STYLES: DishType[] = ['italian', 'indian', 'mexican', 'chienese', 'other'];

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
    const [disabled, setDisabled] = useState(false);
    const {user: currentUser} = useContext(AuthContext);
    const {kitchenChefs} = useContext(ChefsContext);
    const isUnassigned = typeof day.chef_id !== "string" || day.chef_id.length === 0;
    const allowUpdate = (day.chef_id === currentUser?.email || currentUser?.is_god) && !isUnassigned;

    useEffect(() => {
        if(!isUnassigned) {
            if(kitchenChefs[day.chef_id]){
                setAssignee(kitchenChefs[day.chef_id]);
            }
            else{
                fetchChefByEmail(day.chef_id).then((chef)=>{
                    setAssignee(chef);
                });
            }
        }
    }, [day]);

    const toggleAlert = useContext(ToastContext);

    const handleUnAssignSubmit = () => {
        if(disabled) return;
        setDisabled(true);
        deleteKitchenDayDishAndAssignee(kitchen_id, day.day, currentUserEmail).then((data)=>{
            if(data.success){
                toggleAlert('success', `You are no longer the chef for ${day.day}`);
                setDay({...day, dish_name: '', dish_style: 'other', chef_id: ''});
            }
            else{
                toggleAlert('error', 'Something went wrong');
            }
        }).catch(()=>{
            toggleAlert('error', 'Something went wrong');
        }).finally(()=>{
            setDisabled(false);
        });
    }

    const updateDish = async (dishName: string, dishStyle: string, godAssignee?: Chef) => {
        if(dishName.length < 1 || dishStyle.length < 1){
            toggleAlert('error', 'Please fill in all fields');
            return;
        }
        if(!ALLOWED_DISH_STYLES.includes(dishStyle.toLowerCase() as DishType)){
            toggleAlert('error', 'Invalid dish style');
            return;
        }
        const assigneEmail = godAssignee?.email || currentUserEmail;
        return await updateKitchenDayDishAndAssignee(kitchen_id, day.day, assigneEmail, dishName.toLowerCase(), dishStyle.toLowerCase()).then((data)=>{
            if(data.success){
                toggleAlert('success', `You are now the chef for ${day.day}!`);
                setDay({...day, dish_name: dishName, dish_style: dishStyle as DishType, chef_id: assigneEmail});
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
            <div className={`border relative rounded-xl my-2 py-2 px-0 sm:px-4 grid grid-cols-7 sm:grid-cols-8 md:gap-2 gap-1 ${panelStyles[day.dish_style]}`}>
                {
                    iconsSrc[day.dish_style] && (
                        <div className="absolute hidden sm:block top-1/2 -left-1 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 shadow-md shadow-slate-400 rounded-full bg-white p-1">
                            <img src={iconsSrc[day.dish_style]} alt="dish icon" className="w-10 h-10"/>
                        </div>
                    )
                }
                <div className="font-bold self-center text-center align-middle content-center col-span-2 sm:text-base text-sm">
                    <div className="capitalize">{day.day}</div>
                </div>
                <div className="flex items-center gap-3 col-span-2">
                    {
                        assignee.email.length === 0 ? (
                            <>
                                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                                <div className="flex flex-col">
                                    <div className="skeleton h-3 "></div>
                                    <div className="skeleton h-2 mt-2"></div>
                                </div>
                            </>
                        ):(
                            <>
                                <div className="sm:block hidden">
                                    <UserAvatar photoURL={assignee.url} displayName={assignee.name} isGod={assignee.is_god} />
                                </div>
                                <div className="capitalize flex flex-col items-center sm:items-start sm:text-base text-sm flex-1">
                                    <div className="whitespace-nowrap text-ellipsis overflow-hidden">{assignee.name}</div>
                                    <Badge content={assignee.kitchens[kitchen_id].position} />
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="text-center col-span-2 sm:text-base text-sm">
                    <div className="font-bold capitalize sm:w-64 whitespace-nowrap text-ellipsis overflow-hidden link-hover">
                        <a href={`https://www.youtube.com/results?search_query=${day.dish_name}`} target="_blank">
                            {day.dish_name}
                        </a>
                    </div>
                    <div className="text-sm opacity-50 capitalize sm:w-64 whitespace-nowrap text-ellipsis overflow-hidden">{day.dish_style}</div>
                </div>
                <Reactions reactions={day.reactions || {}} day_id={day.day} />
                {
                    allowUpdate ? (
                        <>
                            <div className="tooltip" data-tip="Remove yourself">
                                <button onClick={() => {
                                    const modal = document.getElementById(`delete-modal-${day.day}`) as HTMLDialogElement | null ;
                                    if(modal) return modal.showModal();
                                }} className="btn btn-ghost btn-circle px-0"> 
                                    <img src={deleteIcon.src} alt="edit icon" className="w-4 h-4" />
                                </button>
                            </div>
                            <dialog id={`delete-modal-${day.day}`} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Feeling lazy?</h3>
                                <p className="py-4">Are you sure you don't want to cook on {day.day}</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button disabled={disabled} className="btn btn-ghost">Cancel</button>
                                    </form>
                                    <button onClick={handleUnAssignSubmit} disabled={disabled} className="btn btn-error">
                                        {
                                            disabled ? <span className="loading loading-spinner"></span> : <span>Proceed</span>
                                        }
                                    </button>
                                </div>
                            </div>
                            </dialog>
                        </>
                    ): (
                        <div className="w-10"></div>
                    )
                }
            </div>
    );
}