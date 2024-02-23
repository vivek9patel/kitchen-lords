'use client';
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import SignInWithGoogle from "@/components/auth/SignInWithGoogle";
import SignOut from "@/components/auth/SignOut";

export default function AuthButton() {
    const auth = useContext(AuthContext);

    if(auth.user) {
        return <SignOut />;
    }

    return <SignInWithGoogle />;
}