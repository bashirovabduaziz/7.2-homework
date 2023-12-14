import React from 'react'
import './App.scss'
import Heading from './components/Heading'
import ToDoList from './components/TodoList'

const App = () => {
  return (
    <div>
      <h1 className='font-[400] container py-16 px-6 min-h-screen mx-auto'>
        <Heading />
        <ToDoList />
      </h1>
    </div>
  )
}

export default App