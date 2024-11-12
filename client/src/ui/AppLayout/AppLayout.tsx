import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import Header from '../../ui/Header/Header';
import Sidebar from '../../ui/Sidebar/Sidebar';
import './AppLayout.scss';

function AppLayout() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu(el => !el);
  };

  const handleScroll = () => {
    if (mainRef.current) {
      setScrollTop(mainRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const currentMain = mainRef.current;

    if (currentMain) {
      currentMain.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentMain) {
        currentMain.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className='app-layout'>
      <Header showMenu={showMenu} onShow={handleShowMenu} />
      <Sidebar showMenu={showMenu} />
      <main className='app-layout-main' ref={mainRef}>
        <div className='app-layout-extra-block'>
          <Outlet />
        </div>
        <ScrollToTop scrollTop={scrollTop} scrollRef={mainRef} />
      </main>
    </div>
  );
}

export default AppLayout;
