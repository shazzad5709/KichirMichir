import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import useUser from '@/hooks/useUser';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      onClick={onClick}
      className={`
    ${hasBorder ? 'border-4 border-black' : ''}
    ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
    rounded-full
    overflow-hidden
    relative
    hover:opacity-90
    transition
    cursor-pointer
    flex-shrink-0
  `}
    >
      <Image
        fill
        className='rounded-full object-cover'
        alt='Avatar'
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
};

export default Avatar;
