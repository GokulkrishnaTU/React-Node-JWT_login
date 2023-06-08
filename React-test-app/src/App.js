import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Toolbar from './components/Toolbar'
import Login from './components/Login'


function App() {
  return (
    <div>
        <Routes>  

   <Route path='/' element={<Toolbar/>}/>
   <Route path='/login' element={<Login/>}/>

  </Routes>  
    </div>
  )
}

export default App
