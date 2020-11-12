import React from 'react';

import Home from "./Routes/Home"
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App(props) {
  return (
    <>
      <Navbar/>
      <Home />
      <Footer />
    </>
  )
}

export default App
