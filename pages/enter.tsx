import { NextPage } from "next";
import { auth, provider } from "@/lib/firebase";
import { User as FirebaseUser, signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image";
import googleLogo from "@/assets/images/google-logo.png";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
interface EnterProps {}
const Enter: NextPage<EnterProps> = ({}) => {
  const { user, username } = useContext(UserContext);
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      {/* <Image src={googleLogo} alt="" width={30} height={30}></Image> */}
      <Image
        src={"/images/google-logo.png"}
        alt=""
        width={30}
        height={30}
      ></Image>
      Sign In with Google
    </button>
  );
};

const SignOutButton = () => {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
};

const UsernameForm = () => {
  return <div>Hello</div>;
};
export default Enter;
