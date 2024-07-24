
import { VerifyEmail } from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative pt-10 flex flex-col items-center justify-center">
      <div className="flex mx-auto w-full flex-col justify-center space-y-6">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex flex-col space-y-6 items-center justify-center">
            <div className="relative h-[250px] w-[250px]">
              <Image src="/verifyemail.png" fill alt="a farmer with mail" />
            </div>

            <h3 className="font-semibold text-2xl text-center">Check your email</h3>

            {toEmail && typeof toEmail === "string" ? (
            <p className="text-center text-black">
                We&apos;ve sent a verification link to your email <span className="font-bold">{toEmail}</span>
            </p>
            ) : (
            <p className="text-center text-black">
                We&apos;ve sent a verification link to your email.
            </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
