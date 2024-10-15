'use client'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const NavBar = ({children} : {children: ReactNode}) => {
  const path = usePathname();
  console.log('current path :', path);
  let backgroundColor = 'bg-white';
  let textColor = 'text-black'

  if (['/sign-in', '/sign-up', '/mypage'].includes(path)) {
    backgroundColor = 'bg-gray-700'
    textColor = 'text-gray-300'
  }

  return (
    <header className={`${backgroundColor} ${textColor} flex justify-between items-center sticky top-0 left-0 right-0 py-2 px-4`}>{children}</header>
  )
}

export default NavBar