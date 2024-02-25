import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from './index';
import Cookies from "js-cookie";
import md5 from 'md5';

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
       const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
            Cookies.set("currentUser", JSON.stringify(result.user));
            if(typeof result.user.email === "string") window.location.href = `/user/${md5(result.user.email)}`;
        }
        else {
            throw new Error("Credential not found");
        }
      }).catch((error) => {
        console.log(error);
        Cookies.remove("currentUser");
        window.location.href = "/";
      })

}

export const signOut = () => {
    auth.signOut().then(() => {
        Cookies.remove("currentUser");
        console.log("Signout successful");
        window.location.href = "/";
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