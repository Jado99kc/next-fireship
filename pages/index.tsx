import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link
          prefetch={true}
          href={{ pathname: "/[username]", query: { username: "jahdiel" } }}
        >
          Jahdiel&apos;s Profile
        </Link>

        <div>
          <Loader show={true}></Loader>
        </div>
        <div>
          <button onClick={() => toast.success("Hello Toast")}>
            Toast Me!
          </button>
        </div>
      </main>
    </>
  );
}
