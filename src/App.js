import './App.css';
import NFTpage from './components/NFTpage';
import './config'
import { Route, Routes } from 'react-router-dom';
import NFTAddressPage from './components/NFTAddressPage';


function App() {

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
