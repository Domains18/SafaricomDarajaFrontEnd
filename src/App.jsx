//eslint-disable-next-line
import React from 'react'
import { Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={Home}></Route>
        <Route path='*' element={Home}></Route>
      </Routes>
    </>
  )
}

export default App
