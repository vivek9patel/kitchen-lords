import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from './index';
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
       const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
            Cookies.set("currentUser", JSON.stringify(result.user));
            redirect(`/user/${result.user.uid}`);
        }
        else {
            throw new Error("Credential not found");
        }
      }).catch((error) => {
        console.log(error);
        Cookies.remove("currentUser");
        redirect("/");
      })

}

export const signOut = () => {
    auth.signOut().then(() => {
        Cookies.remove("currentUser");
        console.log("Signout successful");
        redirect("/");
      }).catch((error) => {
        console.log(error);
      });
}

export const onAuthStateChanged = (callback: (user: any) => void) => {
    auth.onAuthStateChanged((user) => {
        if(user){
            callback(user);
        }
        else {
            callback(null);
        }
    });
};