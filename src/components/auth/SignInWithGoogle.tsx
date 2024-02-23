'use client';
import {signInWithGoogle} from '../../firebase/auth';

export default function SignInWithGoogle() {
    return (
        <button onClick={signInWithGoogle} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-10">
            Sign in with Google
        </button>
    );
}
