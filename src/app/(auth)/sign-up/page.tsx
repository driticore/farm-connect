"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z, ZodError } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptTerms } from "@/components/acceptTerms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChromeIcon, AppleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate, isPending } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");
      } else if (err instanceof ZodError) {
        toast.error(err.errors[0]?.message || "Validation error");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Check for a verification link in ${sentToEmail}.`);
      router.push(`/verify-email?to=${encodeURIComponent(sentToEmail)}`);
    },
  });

  const onSubmit = (data: TAuthCredentialsValidator) => {
    const { email, password } = data;
    mutate({
      email,
      password,
    });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 mt-8 md:p-8 shadow-input dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to FarmConnect
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-500">
        Create your account to get started or{" "}
        <Link href="/login" className="font-semibold text-white">
          login
        </Link>{" "}
        if you already have one?
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              placeholder="Tyler"
              type="text"
              className={cn({ "focus-visible:ring-red-600": null })}
            />
            {/* Error handling for first name */}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="surname">Last name</Label>
            <Input
              placeholder="Durden"
              type="text"
              className={cn({ "focus-visible:ring-red-600": null })}
            />
            {/* Error handling for surname */}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            className={cn({ "focus-visible:ring-red-600": errors.email })}
            placeholder="projectmayhem@fc.com"
            type="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            className={cn({ "focus-visible:ring-red-600": errors.password })}
            placeholder="••••••••"
            type="password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-green-800 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isPending || !isValid}
        >
          {isPending ? "Signing up..." : "Sign up →"}
          <BottomGradient />
        </button>
        <AcceptTerms></AcceptTerms>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-6">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <ChromeIcon className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <AppleIcon className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Apple
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default Signup;
