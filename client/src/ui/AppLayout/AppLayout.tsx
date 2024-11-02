import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
// import useUser from '../../hooks/authentication/useUser';
import Header from '../../ui/Header/Header';
import Sidebar from '../../ui/Sidebar/Sidebar';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './AppLayout.scss';

function AppLayout() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);

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
      <Header />
      <Sidebar />
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
