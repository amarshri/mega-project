import './App.css'
import React, {useState,useEffect}from 'react'
import {useDispatch} from 'react-redux'
import authservice from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import {Header, Footer} from './components'

import { Outlet } from 'react-router-dom'
function App() {
 const [loading, setloading] = useState(true)
 const dispatch = useDispatch()

 useEffect(()=>{
  authservice.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=> setloading(false))
 }, [])

 return !loading ? (
  <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
    <Header/>
    <main>
     TODO : <Outlet/>
    </main>
    <Footer/>
    </div>
  </div>
 ) : null

}

export default App
