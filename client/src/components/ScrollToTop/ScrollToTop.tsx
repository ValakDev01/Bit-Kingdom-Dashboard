import { FC, useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

import './ScrollToTop.scss';

type ScrollToTopProps = {
  scrollTop: number;
  scrollRef: React.RefObject<HTMLDivElement>;
};

const ScrollToTop: FC<ScrollToTopProps> = ({ scrollTop, scrollRef }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scrollTop > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollTop]);

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label='Scroll to top'
    >
      <IoIosArrowUp className='arrowTop' />
    </button>
  );
};

export default ScrollToTop;
