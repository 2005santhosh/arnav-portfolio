import { Suspense, lazy, useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from '@/components/Nav'

const Work         = lazy(() => import('@/pages/Work'))
const CategoryPage = lazy(() => import('@/pages/CategoryPage'))
const Testimonials = lazy(() => import('@/pages/Testimonials'))
const Contact      = lazy(() => import('@/pages/Contact'))

function Loader() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #e5e5e5', borderTopColor: '#555', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/"               element={<Work />} />
            <Route path="/work/:category" element={<CategoryPage />} />
            <Route path="/testimonials"   element={<Testimonials />} />
            <Route path="/contact"        element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default function App() {
  return <HashRouter><AppInner /></HashRouter>
}
