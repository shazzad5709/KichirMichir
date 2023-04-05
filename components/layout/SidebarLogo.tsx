import { useRouter } from 'next/router';
import { BsPencilSquare } from 'react-icons/bs';

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div className='flex' onClick={() => router.push('/')}>
      <div
        className='
        rounded-full
        lg:hidden
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    '
      >
        <BsPencilSquare size={28} className='text-emerald-500' />
      </div>
      <div 
        className='
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4
        w-full 
        px-4
        mt-4
        py-2 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
        '
      >
        <BsPencilSquare size={28} className='text-emerald-500' />
        <p
          className='
            hidden 
            lg:block 
            text-center
            text-2xl
            font-bold
            text-emerald-400 
          '
        >
          কিচিরমিচির
        </p>
      </div>
    </div>
  );
};

export default SidebarLogo;
