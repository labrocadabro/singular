import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import {
  MagicLinkErrorCode,
  isMagicLinkError,
  useClerk,
  useSignUp,
} from "@clerk/nextjs";
import { sign } from "crypto";

// pages/sign-up.jsx
// Render the sign up form.
// Collect user's email address and send a magic link with which
// they can sign up.
export default function SignUp() {
  const [emailAddress, setEmailAddress] = useState("");
  const [expired, setExpired] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const { signUp, isLoaded, setSession } = useSignUp();

  if (!isLoaded) {
    return null;
  }

  const { startMagicLinkFlow, cancelMagicLinkFlow } =
    signUp.createMagicLinkFlow();

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    setExpired(false);
    setVerified(false);

    if (!signUp) return;
    // Start the sign up flow, by collecting
    // the user's email address.
    await signUp.create({ emailAddress });

    // Start the magic link flow.
    // Pass your app URL that users will be navigated
    // when they click the magic link from their
    // email inbox.
    // su will hold the updated sign up object.
    const su = await startMagicLinkFlow({
      redirectUrl: "https://your-app.domain.com/verification",
    });

    // Check the verification result.
    const verification = su.verifications.emailAddress;
    if (verification.verifiedFromTheSameClient()) {
      setVerified(true);
      // If you're handling the verification result from
      // another route/component, you should return here.
      // See the <MagicLinkVerification/> component as an
      // example below.
      // If you want to complete the flow on this tab,
      // don't return. Check the sign up status instead.
      return;
    } else if (verification.status === "expired") {
      setExpired(true);
    }

    if (su.status === "complete") {
      // Sign up is complete, we have a session.
      // Navigate to the after sign up URL.
      setSession(su.createdSessionId, () => router.push("/after-sign-up-path"));
      return;
    }
  }

  if (expired) {
    return <div>Magic link has expired</div>;
  }

  if (verified) {
    return <div>Signed in on other tab</div>;
  }

  return (
    <form onSubmit={submit}>
      <input
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <button type="submit">Sign up with magic link</button>
    </form>
  );
}
