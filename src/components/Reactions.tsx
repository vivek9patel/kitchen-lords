"use client";
import { fetchChefById, updateKitchenDayReaction } from "@/firebase/server";
import { Reaction } from "@/firebase/types";
import { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import Cookies from 'js-cookie';
import md5 from "md5";

const ALLOWED_EMOJIS: Reaction[] = ['👍', '👎', '🤮', '😍', '🥳', '💗'];

export default function Reactions({reactions, day_id} : {reactions: {
    [chef_id: string]: Reaction;
},
day_id: string;
}) {
    const [allReactions, setAllReactions] = useState<{
        [chef_id: string]: Reaction;
    }>(reactions);
    const openModal = ()=>{
        const modal = document.getElementById(`reaction-modal-${day_id}`) as HTMLDialogElement | null ;
        if(modal) return modal.showModal();
    }

    const handleEmojiChange = async (kitchenId:string, email: string, emoji: Reaction) => {
        updateKitchenDayReaction(kitchenId, email, day_id, emoji)
        .then((result) => {
            if(result.success){
                const chef_id = md5(email);
                setAllReactions({
                    ...allReactions,
                    [chef_id]: emoji
                });
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    const top3Reactions = Object.keys(allReactions).slice(0, 3).map((chef_id, index) => {
        return (
            <div className="avatar placeholder border-opacity-0" key={index}>
                <div className="w-8 text-center text-xl">
                    <span>{allReactions[chef_id]}</span>
                </div>
            </div>
        )
    });

    const total = Object.keys(allReactions).length;
    if(total - top3Reactions.length  > 0){
        top3Reactions.push(
            <div className="avatar placeholder border-opacity-0">
                <div className="w-8 text-primary-content">
                <span>+{total - top3Reactions.length}</span>
                </div>
            </div>
        );
    }
    return (
        <div className="tooltip" data-tip="See reactions">
            <ReactionModal reactions={allReactions} modal_id={day_id} handleEmojiChange={handleEmojiChange} />
            <div tabIndex={0} role="button" onClick={openModal}
             className="btn btn-ghost avatar-group -space-x-6 w-30 rtl:space-x-reverse">
                {
                    total === 0 ? (
                        <div className="w-10 text-primary-content text-xl">
                            <span>+</span>
                        </div>
                    ): (top3Reactions)
                }
            </div>
        </div>
    );
}

export function ReactionModal({reactions, modal_id, handleEmojiChange}: {reactions: {
    [chef_id: string]: Reaction;
    }
    modal_id: string;
    handleEmojiChange: (kitchenId: string, email: string, emoji: Reaction) => Promise<void>;
}) {
    if(typeof window === "undefined") return null;
    const [reactionsByChef, setReactionsByChef] = useState<JSX.Element[]>([]);
    const kitchenId = window.location.pathname.split("/")[2];
    const currentUserEmail = JSON.parse(Cookies.get("currentUser") || "{}").email;
    const [emojiChecked, setEmojiChecked] = useState<Reaction | null>(null);
    
    useEffect(()=>{
        Promise.all(Object.keys(reactions).map((chef_id) => {
            return fetchChefById(chef_id).then((chef)=>{
                if(chef.email === currentUserEmail){
                    setEmojiChecked(reactions[chef_id]);
                    return <></>;
                }
                return (
                    <>
                    <div className="flex items-center gap-2" key={chef_id}>
                        <UserAvatar photoURL={chef.url} displayName={chef.name} />
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-bold mr-2">{chef.name}</div>
                                <span className="text-sm font-light text-neutral-600">{chef.kitchens[kitchenId].position}</span>
                            </div>
                            <div className="text-lg">{reactions[chef_id]}</div>
                        </div>
                    </div>
                    <div className="divider my-2"></div> 
                    </>
                )
            });
        })).then((reactionsByChef)=>{
            setReactionsByChef(reactionsByChef);
        });
    },[reactions]);

    return (
        <dialog id={`reaction-modal-${modal_id}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Do your roomies like it?</h3>
                <div className="divider mb-1"></div>
                <span className="text-sm font-light text-neutral-600 text-center mr-2">You</span>
                <div className="join">
                    {
                        ALLOWED_EMOJIS.map((emoji, index) => {
                            return (
                                <input key={index} className="join-item btn" type="radio" name={`options-${modal_id}`} aria-label={emoji} checked={emojiChecked === emoji} onChange={()=>{setEmojiChecked(emoji);handleEmojiChange(kitchenId,currentUserEmail,emoji)}} />
                            )
                        })
                    }
                </div>
                <div className="divider mt-1"></div>
                {reactionsByChef}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}