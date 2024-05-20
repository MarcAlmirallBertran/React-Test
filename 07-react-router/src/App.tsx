import { Router } from './components/Router'
import { Route } from './components/Route'
import './App.css'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/About'))
const SearchPage = lazy(() => import('./pages/Search'))

function App () {
  const routes = [
    { path: '/:lang/about', Component: AboutPage },
    { path: '/search/:query', Component: SearchPage }
  ]

  return (
    <main>
      <Suspense>
        <Router routes={routes} defualtComponent={() => <h1>404</h1>}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
        </Router> 
      </Suspense>
    </main>
  )
}

export default App
