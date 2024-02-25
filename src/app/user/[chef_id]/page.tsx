import KitchenCard from "@/components/KitchenCard";
import Header from "@/components/header";
import ChefDB from "@/firebase/models/Chef"
import KitchenDB from "@/firebase/models/Kitchen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kitchen Lords | Your Kitchens",
};

export default async function Page({ params }: { params: { chef_id: string } }) {
    const chef = ChefDB.getInstanceByID(params.chef_id);
    const chef_name = await chef.getName();
    const kitchens = await chef.getKitchens();
    if (Object.keys(kitchens).length === 0){
        return (
            <div className="text-center px-4 py-2 flex flex-col justify-center items-center h-screen">
                <h2 className=" text-2xl">You have no kitchens yet</h2>
                <p>Contact vivek.p9737@gmail.com add or create one!</p>
            </div>
        )
    }

    return (
        <div className="px-4 py-2">
            <Header title={chef_name} />
            <div className="px-8 py-4 flex flex-wrap justify-center">
                {Object.keys(kitchens).map(async (kitchen_id) => {
                    const kitchen = new KitchenDB(kitchen_id);
                    const kitchen_name = await kitchen.getKitchenName();
                    const url = await kitchen.getKitchenImageURL();
                    return <KitchenCard kitchen_id={kitchen_id} position={kitchens[kitchen_id].position} kitchen_name={kitchen_name} url={url} />;
                })}
            </div>
        </div>
    )
}