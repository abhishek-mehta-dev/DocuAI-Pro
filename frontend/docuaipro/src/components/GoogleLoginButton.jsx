"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";
import routes from "@/lib/routes";

export default function GoogleLoginButton({ onSuccess }) {
  const { loginWithGoogle } = useGoogleLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleSubmit = async (token) => {
    const { success, error } = await loginWithGoogle(token);

    if (success) {
      dispatch(showMessage({ message: "Login successful!", type: "success" }));
      router.push(routes.plans);

      if (typeof onSuccess === "function") {
        onSuccess(); // Optional callback from parent
      }
    } else {
      dispatch(
        showMessage({
          message: error || "Login failed. Please try again.",
          type: "error",
        })
      );
    }
  };

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const token = credentialResponse.credential;
        if (token) await handleGoogleSubmit(token);
      }}
      onError={() => {
        dispatch(
          showMessage({ message: "Google login failed", type: "error" })
        );
        console.error("Google login failed");
      }}
    />
  );
}
