import { firebaseAuth } from './firebase';
import firebase from './firebase';
interface SignInWithEmailPasswordProps {
    (email: string, password: string): Promise<null | firebase.auth.UserCredential>;
}

export const SignInWithEmailPassword: SignInWithEmailPasswordProps = async (email, password) => {
    return firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            return userCredentials;
        })
        .catch(() => {
            // console.error(error.code, error.message);
            return null;
        });
};
