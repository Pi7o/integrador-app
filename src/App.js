import './App.css';
import NewsList from './components/NewsList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './components/Base';
import Layout from './components/Layout';

console.log(process.env.REACT_APP_WEATHER_API_KEY)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element = {<Base/>}/>
          <Route path='resultados' element ={<NewsList/>}/>
        </Route>
        <Route path="*" element={<div> 404 </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
