
// import logoTimer from '../../assets/logo-timer.svg'
import { MenubarDemo } from '@/components/MenuBar'

export function Header() {
  return (
    <header className='flex items-center justify-center w-full z-50'>
      {/* <img src={logoTimer} alt="logo timer" width={45} /> */}

      <MenubarDemo />
    </header>
  )
}

