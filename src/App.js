import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
     <BrowserRouter>
     <Navbar></Navbar>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/users/:userId" element={<User/>}/>
     </Routes>
     </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
