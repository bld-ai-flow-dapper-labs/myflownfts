import './App.css';
import Nav from './components/_Nav';
import NFTpage from './components/NFTpage';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './config'
import * as fcl from "@onflow/fcl";
import { Route, Routes } from 'react-router-dom';
import NFTAddressPage from './components/NFTAddressPage';


function App() {

  const [session, setSession] = useState(null)
  const [user, setUser] = useState({loggedIn: null})


  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    fcl.currentUser.subscribe(setUser)

  }, [])

  // console.log(session)

  return (
    <div className="App min-h-screen">
      <div>
        <Routes>
          <Route path='*' element={<NFTpage />} />
          <Route path='/address/:address' element={<NFTAddressPage />} />
        </Routes> 
        
      </div>
  </div> 
  );
}

export default App;
