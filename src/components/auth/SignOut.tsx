'use client';
import {signOut} from '../../firebase/auth';

export default function SignOut() {
    return (
        <button onClick={signOut} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full w-full">
            Sign out
        </button>
    );
}