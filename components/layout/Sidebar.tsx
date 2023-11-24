import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarChirpButton';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: 'আস্তানা',
      href: 'http://localhost:3000/',
    },
    {
      icon: BsBellFill,
      label: 'কি কি ঘটছে',
      href: 'http://localhost:3000/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'বিবরণ',
      href: `http://localhost:3000/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                alert={item.alert}
                auth={item.auth}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
              />
            ))}
            {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="বের হয়ে যান" />}
            <SidebarTweetButton />
          </div>
        </div>
      </div>
  )
};

export default Sidebar;
