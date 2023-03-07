import { User as FirebaseUser } from "firebase/auth";

export interface authData {
  user: FirebaseUser | null | undefined;
  username: string | null;
}
