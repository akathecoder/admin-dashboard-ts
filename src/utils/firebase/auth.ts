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

interface CreateUserWithEmailAndPasswordProps {
    (email: string, password: string, name: string, profileImage: string): Promise<string | null | undefined>;
}

export const CreateUserWithEmailAndPassword: CreateUserWithEmailAndPasswordProps = async (
    email,
    password,
    name,
    profileImage,
) => {
    return firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            await userCredential.user?.updateProfile({
                displayName: name,
                photoURL: profileImage,
            });
            return userCredential.user?.uid;
        })
        .catch((error) => {
            console.error(error);
            return null;
        });
};
