import { useRouter } from "next/router";

export default function PostPage({}) {
  const router = useRouter();
  const { username } = router.query;
  return (
    <main>
      <h1>Welcome to {username} profile</h1>
    </main>
  );
}
