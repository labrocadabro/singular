import Link from "next/link";
import type { User } from "lucia-auth";
import { useRouter } from "next/router";

type Props = {
	user: User;
};

export default function Header({ user }: Props) {
	const router = useRouter();
	return (
		<header className="flex h-16 items-center justify-between px-3">
			<Link href="/">
				<h1>Singular</h1>
			</Link>
			{user ? (
				<>
					<p>You are logged in.</p>
					<button
						onClick={async () => {
							try {
								await fetch("/api/logout", {
									method: "POST",
								});
								router.push("/login");
							} catch (e) {
								console.log(e);
							}
						}}
					>
						Sign out
					</button>
				</>
			) : (
				<Link href="/login">Login</Link>
			)}
		</header>
	);
}
