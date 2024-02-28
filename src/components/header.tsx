"use client";
import { useContext } from 'react';
import AuthButton from './auth';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthProvider';

export default function Header({ title, isKitchenPage=false }: { title: string, isKitchenPage?: boolean}) {
    const {user: currentUser} = useContext(AuthContext);
    if(!currentUser) return null;
    const photoURL = currentUser.url;
    const displayName = currentUser.name;
    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl capitalize">{title}{!isKitchenPage && "'s Kitchen"}</a>
        </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
            <UserAvatar photoURL={photoURL} displayName={displayName} isGod={currentUser.is_god} />
            <div
                tabIndex={0}
                className="mt-1 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
                <div className="card-body">
                    <div className='btn btn-md btn-ghost'>
                        <Link href="/user" className="capitalize">your kitchens</Link>
                    </div>
                    <div className='btn btn-sm btn-ghost text-slate-400'>
                        <a href="mailto:vivek.p9737@gmail.com" className="capitalize">feature request</a>
                    </div>
                    <div className="card-actions">
                        <AuthButton />
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
