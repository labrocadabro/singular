/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("./src/auth/lucia.js").Auth;
	type UserAttributes = {
		username: string;
		avatar: string;
	};
}
