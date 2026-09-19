import { Routes, Route } from 'react-router-dom'
import Landingpage from './components/Landing page/Landingpage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landingpage />}></Route>
    </Routes>
    
  )
}

export default App