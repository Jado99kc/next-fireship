import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { User as FirebaseUser } from "firebase/auth";

interface NavbarProps {}

const Navbar: NextPage<NavbarProps> = ({}) => {
  const user = {} as FirebaseUser;
  const username = null;
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
                <Image src={user?.photoURL || ""} alt=""></Image>
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
