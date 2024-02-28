import { fetchKitchenName, fetchKitchenImage } from "@/firebase/server";
import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";

export default async function KitchenCard({ kitchen_id, position }: { kitchen_id: string, position: string}) {
    const kitchen_name = await fetchKitchenName(kitchen_id);
    const url = await fetchKitchenImage(kitchen_id);

    return (
        <Link href={`/kitchen/${kitchen_id}`} className="card w-96 mx-4 my-4 bg-primary bg-opacity-10 hover:bg-opacity-5 hover:cursor-pointer hover:shadow-2xl border-2 border-neutral hover:border-secondary hover:border-opacity-30 shadow-xl transition-all duration-300">
            <figure className="px-10 pt-10">
                <Image src={url} alt={`${kitchen_name} cover photo`} className="rounded-xl border" width={300} height={100} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title capitalize my-2 text-primary-content font-bold">{kitchen_name}</h2>
                <Badge content={position} size="text-sm max-w-64 px-2" />
            </div>
        </Link>
    );
}