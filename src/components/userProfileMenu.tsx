"use client"

import {
  BellIcon,
  CreditCard,
  Flower2Icon,
  LifeBuoy,
  LogOut,
  User,
  UserCircle2Icon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function UserProfileMenu(){
  const [user, setUser] = useState<{} | null>(null);

  useEffect(() => {
    // Get user data from local storage or cookies
    const userData = localStorage.getItem('user') || {};
    setUser(userData);
  }, []);

  const handleLogout = () => {
    // Clear local storage or cookies
    localStorage.removeItem('user');
    setUser({});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar id="avatar">
          {user ? (
            <AvatarImage src={/*user.avatarUrl*/"../ui/logo.png"} className='bg-white' />
          ) : (
            <AvatarFallback>
              <UserCircle2Icon />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{`user`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Flower2Icon className="mr-2 h-4 w-4" />
          <span>Event Acquisition</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Customer Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          {user ? (
            <span onClick={handleLogout}>Log out</span>
          ) : (
            <Link href="/login">Log in</Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileMenu;