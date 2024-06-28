import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Signin from './component/Signin';
import Createuser from './component/Createuser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Createuser />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
