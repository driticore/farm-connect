"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z, ZodError } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChromeIcon, AppleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";

export function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const continueAsSeller = () => {
    router.push('?as=seller');
  };

  const continueAsCustomer = () => {
    router.replace('/login', undefined);
  };

  const { mutate: login, isPending } = trpc.auth.logIn.useMutation({
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push(`/sell`);
        return;
      }

      router.push(`/`);
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password, please try again.");
      }
    },
  });

  const onSubmit = (data: TAuthCredentialsValidator) => {
    const { email, password } = data;
    login({
      email, password,
    });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none mt-8 md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Login to your {isSeller ? "seller" : ""} account
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-500">
        If you don&apos;t have an account,{" "}
        <Link href="/sign-up" className="text-white font-semibold">
          Signup here
        </Link>
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            className={cn({ "focus-visible:ring-red-600": errors.email })}
            placeholder="projectmayhem@fc.com"
            type="email"
            aria-label="Email Address"
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
            aria-label="Password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <Button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-green-800 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium mt-3 mb-3 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          aria-label="Login"
          disabled={isPending}
        >
          Login &rarr;
          <BottomGradient />
        </Button>

        <Link href="/" className="text-neutral-800 text-sm">
          Forgot password?
        </Link>          

        <div className='relative mt-10'>
          <div
            aria-hidden='true'
            className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              or
            </span>
          </div>
        </div>

        {isSeller ? (
          <Button
            onClick={continueAsCustomer}
            variant='secondary'
            disabled={isPending}
            className="items-center mt-5 w-full">
            Continue as customer
          </Button>
        ) : (
          <Button
            onClick={continueAsSeller}
            disabled={isPending}
            className="items-center mt-5 w-full"
            variant='secondary'>
            Continue as seller
          </Button>
        )}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
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
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Login;
