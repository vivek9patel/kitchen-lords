"use client";
import { Day } from "@/firebase/types";
import { useState } from "react";
import { ALLOWED_DISH_STYLES } from "./DayPanel";

export default function UnAssignedPanel({day, updateDish}: {day: Day, updateDish: (dishName: string, dishStyle: string) => Promise<void>;}) {
   return (
            <div className={`border relative rounded-xl my-4 py-2 flex justify-evenly items-center gap-4 border-orange-300 border-opacity-50 bg-opacity-50`}>
                <div className=" min-w-28 ">
                    <div className="font-bold capitalize">{day.day}</div>
                </div>
                <div className="flex flex-col items-center">
                <div className="tooltip" data-tip="Assign to me">
                <button onClick={()=>{
                    const modal = document.getElementById(`add-assignee-modal-${day.day}`) as HTMLDialogElement | null ;
                    if(modal) return modal.showModal();
                }} className="btn btn-ghost rounded-full btn-md transfrom rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                </div>
                </div>
                <AddAssigneeModal day_name={day.day} modal_id={day.day} updateDish={updateDish} />
            </div>
    );
}

export function AddAssigneeModal({day_name, modal_id, updateDish}: {day_name: string, modal_id: string, updateDish: (dishName: string, dishStyle: string) => Promise<void>;}) {
    const [dishName, setDishName] = useState('');
    const [dishStyle, setDishStyle] = useState('');
    const [disabled, setDisabled] = useState(false);

    const handleDishNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDishName(e.target.value);
    }

    const handleDishStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDishStyle(e.target.value);
    }

    const handleSubmit = () => {
        if(disabled) return;
        setDisabled(true);
        updateDish(dishName, dishStyle).then(()=>{
            const modal = document.getElementById(`add-assignee-modal-${modal_id}`) as HTMLDialogElement | null ;
            if(modal) modal.close();
            setDisabled(false);
        });
    }

    return (
        <dialog id={`add-assignee-modal-${modal_id}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Do you want to cook on <span className="capitalize text-primary">{day_name}</span>?</h3>
                <div className="modal-middle pt-4">
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        Dish Name
                        <input onChange={handleDishNameChange} type="text" minLength={1} className="grow text-opacity-50" placeholder="Something fun please..." />
                    </label>
                    <select onChange={handleDishStyleChange} className="select select-bordered w-full my-2 capitalize" defaultValue={"DEFAULT"}>
                        <option disabled value={"DEFAULT"}>Dish style?</option>
                        {
                            ALLOWED_DISH_STYLES.map((style, index) => <option key={index} value={style}>{style}</option>)
                        }
                    </select>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button disabled={disabled} className="btn btn-ghost">Cancel</button>
                    </form>
                    <button onClick={handleSubmit} disabled={disabled} className="btn btn-secondary">
                        {
                            disabled ? <span className="loading loading-spinner"></span> : <span>Yes!</span>
                        }
                    </button>
                </div>
            </div>
        </dialog>
    )
}