import { useRouter } from 'next/router'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'

type Props = {}

const SidebarLogo = (props: Props) => {
  const router = useRouter()
  return (
    <div className='rounded-fullh-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition'>
      <BsTwitter />
    </div>
  )
}

export default SidebarLogo