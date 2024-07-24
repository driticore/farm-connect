import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { cookies } from "next/headers";
import Image from 'next/image';
import Cart from './Cart';
import NavItems from './NavItems';
import { buttonVariants } from './ui/button';
import UserProfileMenu from './userProfileMenu';
import { getServerSideUser } from '@/lib/payload-utils';





export const Navbar = async () => {
  const nextCookies = cookies() 
  const { user } = await getServerSideUser( nextCookies )

  return (
    <div className='z-50 top-0 inset-x-0 h-16 min-w-full mt-4 pb-5 mb-4'>
      <header className='relative'>
        <MaxWidthWrapper>
          <div>
            <div className='flex h-16 items-center'>

              {/**TODO: Mobile nav */}

              <div className='ml-3 flex lg:ml-0'>
                <Link href='/'>
                  <Image src="/ui/logo.png" width={110} height={110} alt="FarmConnect logo" className='mb-1'/>
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='ml-[700px] flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                    {user ? null : (
                      <>
                      <Link href="/login" className={buttonVariants({ variant: "ghost" })}>Sign In</Link>
                      <span className='h-6 w-px bg-green-200' aria-hidden="true"></span>
                      <Link href="/sign-up" className={buttonVariants({ variant: "ghost" })}>Create Account</Link>
                      </>
                    )}
                    <span className='h-6 w-px bg-green-200' aria-hidden="true"></span>

                    <Cart/>

                    <span className='h-6 w-px bg-green-200' aria-hidden="true"></span>

                        <span className='h-py w-px' aria-hidden="true"></span>
                        <UserProfileMenu/>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
