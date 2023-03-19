import { NextPage } from "next";
import { auth, provider, db } from "@/lib/firebase";
import { User as FirebaseUser, signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image";
import { doc, writeBatch, getDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/context";
import debounce from "lodash.debounce";
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
  const { user, username } = useContext(UserContext);
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // create reference for both documents
    const userDoc = doc(db, `users/${user?.uid}`);
    const usernameDoc = doc(db, `usernames/${formValue}`);

    //commit both docs togetehr as a batch write
    const batch = writeBatch(db);
    batch.set(userDoc, {
      username: formValue,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameDoc, { uid: user?.uid });

    await batch.commit();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    //only set form value if lenght is < 3 or passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(true);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length > 3) {
        try {
          const ref = doc(db, `usernames/${username}`);
          const usernameDocument = await getDoc(ref);
          console.log("Firestore read executed");
          setIsValid(!usernameDocument.exists());
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );

  function UsernameMessage({
    username,
    isValid,
    loading,
  }: {
    username: string;
    isValid: boolean;
    loading: boolean;
  }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }
};

export default Enter;
