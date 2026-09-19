import { Routes, Route } from 'react-router-dom'
import Landing_page from './components/Landing_page/Landing_page'
import Mainsec from './components/Main_sec/Mainsec'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing_page />} />
      <Route path='/dashboard' element={<Mainsec />} />
    </Routes>
    
  )
}

export default App