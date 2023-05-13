import Image from "next/image";

interface Props {
	user: {
		avatar: string;
		username: string;
	};
	size: number;
}

export default function UserAvatar({ user, size }: Props) {
	return (
		<Image
			src={user.avatar}
			alt={user.username}
			width={size}
			height={size}
			className="inline rounded-full"
		/>
	);
}
