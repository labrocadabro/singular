import Link from "next/link";
import type { User } from "lucia-auth";
import { useRouter } from "next/router";
import Image from "next/image";
import UserAvatar from "~/components/UserAvatar";

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
					<p>
						<UserAvatar user={user} size={40} />
						You are logged in as @{user.username}.
					</p>
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
