import KitchenDB from "@/firebase/models/Kitchen";
import { Metadata } from "next";

   
export async function generateMetadata(
    { params }: {
        params: { kitchen: string }
    }
  ): Promise<Metadata> {
    const kitchen = new KitchenDB(params.kitchen);
    const kitchenName = await kitchen.getKitchenName();
    return {
      title: `Kitchen Lords | ${kitchenName}`,
    }
  }

export default function Page({ params }: { params: { kitchen: string } }) {
    return <div>My Kitchen: {params.kitchen}</div>
}