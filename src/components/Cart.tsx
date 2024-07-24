"use client"
import { formatPrice } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { buttonVariants } from './ui/button';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const Cart = () => {
  const [openSheet, setOpenSheet] = useState(false);

  const itemCount = 0

  const fee = 1

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger className='group flex items-center p-2'>
        <div className='flex flex-row flex-1 items-center cursor-pointer'>
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span>Cart</span>
          <span className='ml-3 bg-black text-white pl-1 pr-1 pt-0.5 pb-0.5 rounded-full'>0</span>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className='fixed z-50 flex flex-col pr-0 sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>Cart (0)</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
            <>
                <div className='flex w-full pr-2 flex-col'>
                    {/*TODO: Cart logic */}
                    Shopping Basket
                </div>
                <div className='space-y-4 pr-6'>
                    <Separator />
                </div>
                <div className='space-y-1.5 pr-6 text-sm'>
                    <div className='flex'>
                        <div className='flex-1'>Delivery</div>
                        <span>Free</span>
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>Transaction Fee</div>
                        <span>{formatPrice(fee)}</span>
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>Total</div>
                        <span>{formatPrice(fee)}</span>
                    </div>
                </div>

                <SheetFooter>
                    <SheetTrigger asChild>
                        <Link href="/cart" className={buttonVariants(
                            {
                                className: "w-full"
                            }
                        )}>Continue to basket</Link>
                    </SheetTrigger>
                </SheetFooter>
                
            </>
        ) : (
            <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div className='relative mb-4 h-60 w-60 text-muted-foreground' aria-hidden="true">
                    <Image 
                        src='/ui/emptyCart.gif' 
                        fill 
                        alt='An empty cart'
                    />
                </div>
                <div className='text-xl font-semibold'>Your cart is empty</div>
                <SheetTrigger asChild>
                    <Link href="/products" className={buttonVariants({
                        className: "text-sm text-green-600 hover:text-green-700",
                        variant: "link"
                    })}>Add items to your cart for checkout</Link>
                </SheetTrigger>
            </div>
        ) }
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
