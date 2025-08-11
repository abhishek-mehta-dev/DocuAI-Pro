"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRegister } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import {
  Eye, EyeOff, User, Mail, Lock, AlertCircle, Loader2,
  Shield, Zap, Users, ArrowRight, Check, X
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { registerUser, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const watchedFields = watch();
  const password = watch("password");
  const confirmPassword = watch("confirm_password");

  useEffect(() => {
    const calcStrength = (pwd) => {
      if (!pwd) return 0;
      let s = 0;
      if (pwd.length >= 8) s += 25;
      if (/[A-Z]/.test(pwd)) s += 25;
      if (/[0-9]/.test(pwd)) s += 25;
      if (/[^A-Za-z0-9]/.test(pwd)) s += 25;
      return s;
    };
    setPasswordStrength(calcStrength(password));
  }, [password]);

  useEffect(() => {
    const fields = ["first_name", "last_name", "username", "email", "password", "confirm_password"];
    const filled = fields.filter(f => watchedFields[f]?.trim());
    setFormProgress((filled.length / fields.length) * 100);
  }, [watchedFields]);

  const checkUsernameAvailability = async (username) => {
    if (!username || username.length < 3) return;
    setIsCheckingUsername(true);
    await new Promise(r => setTimeout(r, 1000));
    setUsernameAvailable(!username.toLowerCase().startsWith("admin"));
    setIsCheckingUsername(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchedFields.username) checkUsernameAvailability(watchedFields.username);
    }, 500);
    return () => clearTimeout(timer);
  }, [watchedFields.username]);

  const onSubmit = async (data) => {
    if (!agreedToTerms) {
      dispatch(showMessage({ message: "Please agree to the terms and conditions", type: "error" }));
      return;
    }
    const success = await registerUser(data);
    if (success) {
      dispatch(showMessage({ message: "Registered Successfully", type: "success" }));
      router.push(routes.login);
    } else {
      dispatch(showMessage({ message: "Register failed. Please try again.", type: "error" }));
    }
  };

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

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Header - Enhanced */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join DocuAI Pro</h1>
            <p className="text-sm text-gray-600">Create your account and start chatting with PDFs</p>
            
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

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">Account Setup</span>
              <span className="text-xs text-gray-500">{Math.round(formProgress)}%</span>
            </div>
            <Progress value={formProgress} className="h-2" />
          </div>

          {/* Google Sign-up - Enhanced */}
          <div className="relative group mb-6">
            <GoogleLoginButton />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>

          {/* Separator */}
          <div className="relative my-6">
            <Separator />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </p>
          </div>

          {/* Form - Enhanced */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First name
                </Label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                    focusedField === 'firstName' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className={`pl-10 transition-all duration-200 ${
                      focusedField === 'firstName' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                    }`}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                  />
                </div>
                {errors.firstName && (
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {errors.firstName.message}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last name
                </Label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                    focusedField === 'lastName' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className={`pl-10 transition-all duration-200 ${
                      focusedField === 'lastName' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                    }`}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                  />
                </div>
                {errors.lastName && (
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {errors.lastName.message}
                  </div>
                )}
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                  focusedField === 'userName' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <Input
                  id="userName"
                  placeholder="johndoe"
                  className={`pl-10 pr-10 transition-all duration-200 ${
                    focusedField === 'userName' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  } ${
                    usernameAvailable === true ? 'border-green-500' : 
                    usernameAvailable === false ? 'border-red-500' : ''
                  }`}
                  onFocus={() => setFocusedField('userName')}
                  onBlur={() => setFocusedField(null)}
                  {...register("username", { required: "Username is required" })}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isCheckingUsername ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  ) : usernameAvailable === true ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : usernameAvailable === false ? (
                    <X className="w-4 h-4 text-red-500" />
                  ) : null}
                </div>
              </div>
              {usernameAvailable === false && (
                <p className="text-red-500 text-xs">Username is already taken</p>
              )}
              {usernameAvailable === true && (
                <p className="text-green-500 text-xs">Username is available</p>
              )}
              {errors.userName && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.userName.message}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                  focusedField === 'email' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 transition-all duration-200 ${
                    focusedField === 'email' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  }`}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
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
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                  focusedField === 'password' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 transition-all duration-200 ${
                    focusedField === 'password' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  }`}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Password strength:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength < 50 ? 'text-red-600' : 
                      passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
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
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                  focusedField === 'confirmPassword' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 transition-all duration-200 ${
                    focusedField === 'confirmPassword' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  } ${
                    confirmPassword && (passwordsMatch ? 'border-green-500' : 'border-red-500')
                  }`}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  {...register("confirm_password", {
                    required: "Confirm password is required",
                  })}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  {confirmPassword && (
                    passwordsMatch ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {confirmPassword && !passwordsMatch && (
                <p className="text-red-500 text-xs">Passwords do not match</p>
              )}
              
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
