import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import Work         from '@/pages/Work'
import CategoryPage from '@/pages/CategoryPage'
import Testimonials from '@/pages/Testimonials'
import Contact      from '@/pages/Contact'

/* Scroll to top on route change — use requestAnimationFrame to avoid
   triggering before the new page has painted, preventing blank flash */
function ScrollTop() {
  const loc = useLocation()
  const prev = useRef(loc.pathname)

  useEffect(() => {
    if (prev.current !== loc.pathname) {
      prev.current = loc.pathname
      requestAnimationFrame(() => {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      })
    }
  }, [loc.pathname])

  return null
}

function AppInner() {
  return (
    <>
      <ScrollTop />
      <Nav />
      <div style={{ paddingTop: '52px', minHeight: '100vh', background: '#fff' }}>
        <Routes>
          <Route path="/"               element={<Work />} />
          <Route path="/work/:category" element={<CategoryPage />} />
          <Route path="/testimonials"   element={<Testimonials />} />
          <Route path="/contact"        element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return <BrowserRouter><AppInner /></BrowserRouter>
}
