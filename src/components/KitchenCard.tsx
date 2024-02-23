import Image from "next/image";
import Link from "next/link";

export default async function KitchenCard({ kitchen_id, position, kitchen_name, url }: { kitchen_id: string, position: string, kitchen_name:string, url: string }) {
    return (
        <Link href={`/kitchen/${kitchen_id}`} className="card w-96 mx-4 my-4 bg-neutral hover:bg-opacity-90 hover:cursor-pointer hover:shadow-2xl border-2 border-neutral hover:border-secondary hover:border-opacity-30 shadow-xl">
            <figure className="px-10 pt-10">
                <Image src={url} alt={`${kitchen_name} cover photo`} className="rounded-xl" width={300} height={100} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title capitalize">{kitchen_name}</h2>
                <p>Position: <span className=" capitalize">{position}</span></p>
            </div>
        </Link>
    );
}