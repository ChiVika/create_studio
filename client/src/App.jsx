import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Pageheader from './components/PageHeader/PageHeader'
import MainPage from './pages/MainPage'
function App() {

  return (
    <>
      <div className='App__container'>
        <Pageheader/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
      </div>
      
    </>
  )
}

export default App
