"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser, isLoading } = useLogin();

  const onSubmit = async (data) => {
    const success = await loginUser(data);
    if (success) {
      dispatch(showMessage({ message: "Login successful!", type: "success" }));
      router.push(routes.plans);
    } else {
      dispatch(
        showMessage({
          message: "Login failed. Please try again.",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            📄
          </div>
          <h1 className="text-xl font-semibold">DocuAI Pro</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* Google Sign-in */}
        <GoogleLoginButton />

        <div className="relative my-4">
          <Separator />
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            OR CONTINUE WITH
          </p>
        </div>

        {/* Email + Password form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
