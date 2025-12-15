import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll suave al inicio cuando cambia la ruta
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Scroll suave y animado
    });
  }, [pathname]);

  return null;
}

export { ScrollToTop };