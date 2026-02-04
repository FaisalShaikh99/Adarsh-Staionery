import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi route change hoga, window top pe scroll karega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
