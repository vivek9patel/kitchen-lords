import KitchenCard from "@/components/KitchenCard";
import Header from "@/components/header";
import { fetchChefById } from "@/firebase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kitchen Lords | Your Kitchens",
};

export default async function Page({ params }: { params: { chef_id: string } }) {
    const chef = await fetchChefById(params.chef_id);
    const chef_name = chef.name;
    const kitchens = chef.kitchens;

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
            <div className="px-0 sm:px-4 md:px-8 sm:py-2 md:py-4 flex flex-wrap justify-center">
                {Object.keys(kitchens).map(async (kitchen_id) => <KitchenCard kitchen_id={kitchen_id} position={kitchens[kitchen_id].position} />)}
            </div>
        </div>
    )
}