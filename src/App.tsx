import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from '@/components/Nav'

// Eager imports — no lazy loading, no blank flash between pages
import Work         from '@/pages/Work'
import CategoryPage from '@/pages/CategoryPage'
import Testimonials from '@/pages/Testimonials'
import Contact      from '@/pages/Contact'

function ScrollTop() {
  const loc = useLocation()
  useEffect(() => window.scrollTo(0, 0), [loc.pathname])
  return null
}

function AppInner() {
  return (
    <>
      <ScrollTop />
      <Nav />
      <main style={{ paddingTop: '52px' }}>
        <Routes>
          <Route path="/"               element={<Work />} />
          <Route path="/work/:category" element={<CategoryPage />} />
          <Route path="/testimonials"   element={<Testimonials />} />
          <Route path="/contact"        element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return <BrowserRouter><AppInner /></BrowserRouter>
}
