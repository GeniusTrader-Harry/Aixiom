import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll position to the top whenever the route (pathname) changes.
// Without this, React Router preserves the previous scroll offset, which can
// leave short pages scrolled to their bottom after navigation.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
