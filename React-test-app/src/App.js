import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Toolbar from './components/Toolbar'
import Login from './components/Login'
import SearchPage from './components/Search'


function App() {
  return (
    <div>
        <Routes>  

   <Route path='/' element={<Toolbar/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/search' element={<SearchPage/>}/>

  </Routes>  
    </div>
  )
}

export default App
