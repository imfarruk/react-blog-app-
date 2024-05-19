
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// importing components
import Header from './components/Header';
import Home from './components/Home';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

import {store }  from './store/store';
import {Provider} from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const theme = createTheme({
    palette:{
      primary:{
        main:"#509841",
        dark:"#2e3b76"
      },
      secondary:{
        main:"#b471b0"
      }
    },
  })

  return (
    <div className="App">
      <Provider store={store}>
      {/* <PersistGate loading={null} persistor={Persistor}> */}
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/post-details" element={<PostDetails/>}/>
        <Route exact path='/create-post' element={<CreatePost/>}/>
        <Route exact path='/edit-post' element={<EditPost/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
      <ToastContainer/>
      </ThemeProvider>
      </BrowserRouter>
      {/* </PersistGate> */}
      </Provider>
      
    </div>
  );
}

export default App;
