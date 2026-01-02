import AdminPage from './pages/admin/adminPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/homePage'
function App() {

  return (
    <BrowserRouter>
      <Routes path='/*'>
        <Route path='/admin/*' element={<AdminPage/>}/> // 'admin/any' will Route to AdminPage
        <Route path='/*' element={<HomePage/>}/> //every wrong URL s Route to HomePage. inside it will display if it is wrong
      </Routes>
    </BrowserRouter>  
  )
}

export default App
