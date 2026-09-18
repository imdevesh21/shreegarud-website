import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on every route change — without this, React Router
// preserves scroll position between pages, which feels like a broken
// layout shift when the new page is shorter than where you scrolled to.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
