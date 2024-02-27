"use client";
import { Reaction } from "@/firebase/types";

export default function Reactions({reactions, day_id} : {reactions: {
    [chef_id: string]: Reaction;
},
day_id: string;
}) {

    if(Object.keys(reactions).length === 0) return (
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar-group -space-x-6 rtl:space-x-reverse">
            <div className="avatar placeholder">
                <div className="w-10 bg-neutral text-neutral-content">
                    <span>+</span>
                </div>
            </div>
        </div>
    );

    const threeReactions = Object.keys(reactions).slice(0, 3).map((chef_id, index) => {
        return (
            <div className="avatar placeholder border-opacity-0" key={index}>
                <div className="w-10 text-center text-xl">
                    <span>{reactions[chef_id]}</span>
                </div>
            </div>
        )
    });

    const remainingReactions = Object.keys(reactions).length - 3;

    return (
        <>
            <ReactionModal reactions={reactions} modal_id={day_id} />
            <div tabIndex={0} role="button" onClick={()=>{
                    const modal = document.getElementById(`reaction-modal-${day_id}`) as HTMLDialogElement | null ;
                    if(modal) return modal.showModal();
                }}
             className="btn btn-ghost avatar-group -space-x-6 rtl:space-x-reverse">
                {threeReactions}

                {
                    remainingReactions > 0 && (
                        <div className="avatar placeholder border-opacity-0">
                            <div className="w-10 text-neutral-content">
                            <span>+{remainingReactions}</span>
                            </div>
                        </div>
                    )
                }
            </div>
    
            </>
    );
}

export function ReactionModal({reactions, modal_id}: {reactions: {
    [chef_id: string]: Reaction;
    }
    modal_id: string;}) {
    return (
        <dialog id={`reaction-modal-${modal_id}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Do your roomies like it?</h3>
                <p className="py-4">
                    
                </p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}