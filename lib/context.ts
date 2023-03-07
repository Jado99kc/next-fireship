import { authData } from "@/interfaces/auth";
import { createContext } from "react";

export const UserContext = createContext<authData>({
  user: null,
  username: null,
});
