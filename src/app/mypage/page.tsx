import Profile from '@/components/features/mypage/profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RPP 마이페이지',
  description: 'RPP 마이페이지',
}

const MyPage = () => {
  return (
    <div className='container mx-auto'>
      <Profile/>
    </div>
  )
}

export default MyPage