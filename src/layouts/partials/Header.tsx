import Link from "next/link";

export default function Header() {
	return (
		<header className="flex h-16 items-center justify-between px-3">
			<Link href="/">
				<h1>Singular</h1>
			</Link>
		</header>
	);
}
