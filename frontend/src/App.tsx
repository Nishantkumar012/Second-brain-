
import DashBoard from './pages/DashBoard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
  
      <div>
        <BrowserRouter>
          <Routes>
             <Route path='/' element={<DashBoard/>}/>
             <Route path='/signup' element={<Signup/>}/>
             <Route path='/signin' element={<Signin/>}/>
          </Routes>
        </BrowserRouter>
          {/* <DashBoard/> */}
          
          {/* <Signin/> */}
    </div>
  );
}

export default App;
