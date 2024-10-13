'use client'

import { signout } from '@/utils/supabase/actions';

const SignOutButton = () => {
  return (
    <button onClick={() => {
      signout();
    }}>로그아웃</button>
  )
}

export default SignOutButton