import AdminPage from './pages/admin/adminPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/homePage'
import Testing from './components/testing'
import LoginPage from './pages/login/login'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register/register'
function App() {

  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes path='/*'>
        <Route path='/testing' element={<Testing/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/admin/*' element={<AdminPage/>}/> // 'admin/any' will Route to AdminPage
        <Route path='/*' element={<HomePage/>}/> //every wrong URL s Route to HomePage. inside it will display if it is wrong
      </Routes>
    </BrowserRouter>  
  )
}

export default App
