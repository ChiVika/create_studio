import { Routes, Route } from 'react-router-dom'
import './App.scss'
import MainPost from './components/MainPost/MainPost'
import Pageheader from './components/PageHeader/PageHeader'
function App() {

  return (
    <>
      <div className='App__container'>
        <Pageheader/>
        <Routes>
          <Route path='/' element={<MainPost/>}/>
        </Routes>
      </div>
      
    </>
  )
}

export default App
