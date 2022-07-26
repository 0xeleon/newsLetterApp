import logo from './logo.svg';
import './App.css';
import Categories from './components/categories'
import Emails from './components/emails'
import Editor from './components/editor'
import Login from './components/login'
import Layout from './components/layout'
import Dashboard from './components/dashboard'
import Unsubscribed from './components/unsubscribed'

import { Route, Routes, BrowserRouter } from 'react-router-dom'



const App = () => {
  return (
    <div className="App">
      < BrowserRouter >
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/category" element={ <Categories /> } />
          <Route path="/emails" element={ <Emails /> } />
          <Route path="/editor" element={ <Editor /> } />
          <Route path="/unsubscribed/:mail" element={ <Unsubscribed /> } />
          
          <Route path="*">Ups</Route>          
        </Routes>
      </ BrowserRouter >
    </div>
  );
}

export default App;
