'use client';
import { AuthContext } from "@/context/AuthProvider";
import md5 from "md5";
import Link from "next/link";
import { useContext } from "react";

export default function DashboardButton() {
    const auth = useContext(AuthContext);

    if(auth.user) {
        return (
            <Link href={`/user/${md5(auth.user.email)}`} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-10">
                Go To Your Kitchens
            </Link>
        );
    }

    return null;
}