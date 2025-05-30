import { useState } from 'react'
import './App.css'

//Components 
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { AddNewTask } from './components/AddNewTask/AddNewTask';
import { CreateAccount } from './components/CreateAccount/CreateAccount';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MyProfile } from './components/MyProfile/MyProfile';
import { SignIn } from './components/SignIn/SignIn';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/projeto-tarefas' element={<Main />} />
          <Route path='/createtask' element={<AddNewTask />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/protectedRoute' element={<ProtectedRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

