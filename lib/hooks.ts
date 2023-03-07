import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

export const useUserData = () => {
  const [user] = useAuthState(auth);

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    console.log(user);
    console.log(username);
    return unsubscribe;
  }, [user]);
  return { user, username };
};
