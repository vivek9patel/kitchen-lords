import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from './index';

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
            const token = credential.accessToken;
            const user = result.user;
            return {token, user};
        }
        else {
            throw new Error("Credential not found");
        }
      }).catch((error) => {
        console.log(error);
      })

}

export const signOut = async () => {
    auth.signOut().then(() => {
        console.log("Signout successful");
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
