import Link from "next/link";
import { UserButton, useAuth, useClerk } from "@clerk/nextjs";

export default function Header() {
  const { openSignUp, openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  return (
    <header className="flex h-16 items-center justify-between px-3">
      <Link href="/">
        <h1>Singular</h1>
      </Link>
      {isSignedIn !== undefined &&
        (isSignedIn ? (
          <UserButton />
        ) : (
          <div>
            <button onClick={() => openSignUp({})}>Sign up</button>&nbsp;|&nbsp;
            <button onClick={() => openSignIn({})}>Sign in</button>
          </div>
        ))}
    </header>
  );
}
