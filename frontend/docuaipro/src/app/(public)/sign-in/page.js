"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Shield,
  Zap,
  Users,
} from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser, isLoading } = useLogin();

  // Password strength calculation moved out of onSubmit
  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(password)) strength += 25;
      return strength;
    };
    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  const onSubmit = async (data) => {
    const success = await loginUser(data);
    if (success) {
      dispatch(showMessage({ message: "Login successful!", type: "success" }));
      setShowSuccess(true);
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Login Successful!
              </p>
              <p className="text-xs text-green-600">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        )}

        <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">
              Sign in to your DocuAI Pro account
            </p>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="secondary" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                10k+ Users
              </Badge>
            </div>
          </div>

          {/* Google Sign-in */}
          <div className="relative group">
            <GoogleLoginButton />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <Separator />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                    focusedField === "email" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 transition-all duration-200 ${
                    focusedField === "email"
                      ? "ring-2 ring-blue-500 border-blue-500"
                      : ""
                  }`}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                    focusedField === "password"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 transition-all duration-200 ${
                    focusedField === "password"
                      ? "ring-2 ring-blue-500 border-blue-500"
                      : ""
                  }`}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Password strength:
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength < 50
                          ? "text-red-600"
                          : passwordStrength < 75
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}

              {errors.password && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                Create one
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-gray-700">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/help" className="hover:text-gray-700">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
