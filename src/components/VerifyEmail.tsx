"use client"

import { trpc } from '@/trpc/client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

interface VerifyEmailProps {
    token: string
}

export const VerifyEmail = ({token}: VerifyEmailProps) => {
    const { isLoading, isError, data } = trpc.auth.verifyEmail.useQuery({
        token,
    })

    if(isError) {
        return <div className='pt-[150px] flex flex-col items-center gap-4'>
            <XCircle className='h-8 w-8 text-red-600'/>
            <h3 className='font-semibold text-xl'>
                There seems to be a problem
            </h3>
            <p className='text-black'>
                The token is invalid or expired.
                Please try again.
            </p>
        </div>
    }

    if(data?.success) {
        return <div className='flex flex-col items-center gap-4 justify-center'>
            <div className='h-80 w-80 relative mb-4 text-black'>
                <Image src="/verify.gif" fill alt='The email was sent'></Image>
            </div>

            <h3 className='font-semibold text-black text-2xl'>
                You&apos;re all set!
            </h3>
            <p className='mt-4 text-center'>Thank you for verifying. Hope you enjoy!</p>
            <Link href="/login" className={buttonVariants({variant:"secondary", className: "mt-4"})}>Sign In</Link>
        </div>
    }

    if(isLoading) {
        return <div className='pt-[150px] flex flex-col items-center gap-4'>
            <Loader2 className='animate-spin h-8 w-8 text-neutral-600'/>
            <h3 className='font-semibold text-xl'>
                Verifying...
            </h3>
            <p className='text-black mt-4'>
                The won&apos;t take too long. Just finishing up.
            </p>
        </div>  
    }
}

export default VerifyEmail
