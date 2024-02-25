import { cookies } from 'next/headers';
import AuthButton from './auth';
import UserAvatar from './UserAvatar';

export default function Header({ title, isKitchenPage=false }: { title: string, isKitchenPage?: boolean}) {
    const currentUser = JSON.parse(cookies().get("currentUser")?.value || "{}");
    const photoURL = currentUser.photoURL;
    const displayName = currentUser.displayName;
    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl capitalize">{title}{!isKitchenPage && "'s Kitchen"}</a>
        </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
            <UserAvatar photoURL={photoURL} displayName={displayName} />
            <div
                tabIndex={0}
                className="mt-1 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
                <div className="card-body">
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
