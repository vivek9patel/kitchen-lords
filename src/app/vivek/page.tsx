export default function Page() {
    return (
      <>Congrats! You found me!!</>
    );
  }

// import DayPanel from "@/components/DayPanel";
// import Header from "@/components/header";
// import ChefDB from "@/firebase/models/Chef";
// import { Day } from "@/firebase/types";
// import { cookies } from "next/headers";


// export default function Page() {
//     const loggedInUser = JSON.parse(cookies().get("currentUser")?.value || "{}");

//     if(!loggedInUser.email){
//       return "No logged in user";
//     }

//     return (
//       <div className="px-4 py-2">
//           <Header title={"Dpv lords @2111"} isKitchenPage={true} />
//           <div className="flex w-full justify-center">
//             <div className="px-8 py-4 overflow-x-auto w-full xl:w-4/5 flex flex-col">
//                 {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(async (day_name) => {
//                         const day: Day = {
//                           day: day_name,
//                           chef_id: "vivek.p9737@gmail.com",
//                           comments: {},
//                           reactions: {},
//                           dish_style: "other",
//                           dish_name: "sev tameta"
//                         }
//                         const assignee = await ChefDB.getInstance(day.chef_id).get();
//                       return <DayPanel key={day_name} day={day} assignee={assignee} />
//                   })}
//             </div>
//           </div>
//       </div>
//     );
//   }
  