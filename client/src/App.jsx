import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import ReelsFeed from './pages/videos/ReelsFeed'
import UserProvider from './context/user/UserProvider'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  
  return (
    <BrowserRouter>
      <UserProvider>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route index element={ <LandingPage /> } />
        <Route path={ "/auth" } element={ <Auth /> } />
        <Route path={ "/reels-feed" } element={ <ProtectedRoute> <ReelsFeed /> </ProtectedRoute> } />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App