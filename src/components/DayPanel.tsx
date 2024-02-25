import { Chef, Day } from "@/firebase/types";
import Badge from "./Badge";
import UserAvatar from "./UserAvatar";
import Reactions from "./Reactions";

export default function DayPanel({day, assignee, kitchen_id, unassigned}: {day: Day, assignee: Chef, kitchen_id: string, unassigned: boolean}) {
    return (
            <div className="border rounded-xl bg-neutral my-2 py-2 border-white flex justify-evenly items-center gap-4">
                <div className=" min-w-28 ">
                    <div className="font-bold capitalize">{day.day}</div>
                </div>
                {
                    unassigned ? 
                    <div className="flex flex-col items-center">
                        <div className="text-center">Unassigned</div>
                        <Badge content="Unassigned"/>
                    </div>
                    :
                    (
                        <>
                            <div className="flex items-center gap-3">
                                <UserAvatar photoURL={assignee.url} displayName={assignee.name} />
                                <div className="capitalize flex flex-col items-start">
                                    <div className="w-40 whitespace-nowrap text-ellipsis overflow-hidden">{assignee.name}</div>
                                    <Badge content={assignee.kitchens[kitchen_id].position} />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="font-bold capitalize w-64 whitespace-nowrap text-ellipsis overflow-hidden">{day.dish_name}</div>
                                <div className="text-sm opacity-50 capitalize w-64 whitespace-nowrap text-ellipsis overflow-hidden">{day.dish_style}</div>
                            </div>
                            <Reactions reactions={day.reactions || {}} day_id={day.day} />
                            <div>
                                <button className="btn btn-ghost btn-xs">Comments</button>
                            </div>
                        </>
                    )
                }
            </div>
    );
}