import KitchenCard from "@/components/KitchenCard";
import Header from "@/components/header";
import Chef from "@/firebase/models/Chef"
import KitchenDB from "@/firebase/models/Kitchen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kitchen Lords | Your Kitchens",
};

export default async function Page({ params }: { params: { chef_id: string } }) {
    const chef = new Chef(params.chef_id);
    const chef_name = await chef.getName();
    const kitchens = await chef.getKitchens();
    return (
        <div className="px-4 py-2">
            <Header chef_name={chef_name} />
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