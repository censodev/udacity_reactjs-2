import './App.css'
import { Outlet } from '@tanstack/react-router'

function App() {
  return (
    <>
      <h1>App</h1>
      <Outlet />
    </>
  )
}

export default App
