import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
interface NavbarProps {}

const Navbar: NextPage<NavbarProps> = ({}) => {
  const { user, username } = useContext(UserContext);
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href={{ pathname: "/" }}>
            <button className="btn-logo">Feed</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image
                  src={user?.photoURL || ""}
                  alt="profile picture"
                  width={30}
                  height={30}
                ></Image>
              </Link>
            </li>
          </>
        )}

        {!username && (
          <>
            <li>
              <Link href="/enter">
                <button className="btn-blue">Log In</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
