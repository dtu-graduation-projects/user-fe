import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import About from './Components/Contents/About';
import Homepage from './Components/Contents/Homepage';
import Scroll from './Components/Scroll/Scroll';
import { UserContext } from './UserContext';
import { useState, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function App(props) {
  const [getCart,setCart] = useState("")
  const [getid,setid] = useState("")
  const [getidlarge,setidlarge] = useState("")
  const [getidwishlist,setidwishlist] = useState("")
  const [getvalueaorefresh,setvalueaorefresh] = useState("")
  const [getpageKey,setpageKey] = useState("")
  const [gettotalorder,settotalorder] = useState("")
  const [loading, setLoading] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const initialOptions = {
    clientId:"AUiz_-HyipJfmSMuQWlpURDajkySVzuQYjdm_xsEZ8chn0VThOm7HyBILax88CVxn9Ht2pzqRpsRnbOo",
    currency: "USD",
    intent: "capture",
    };
  return (    
    <PayPalScriptProvider options={initialOptions}>
      <div>
      <ToastContainer />
      <UserContext.Provider value={{
        getCart,setCart
        ,getid,setid,
        getidlarge,setidlarge,
        getidwishlist,setidwishlist,
        getvalueaorefresh,setvalueaorefresh,
        getpageKey,setpageKey,
        gettotalorder,settotalorder,
        loading, setLoading,
        refresh, setrefresh}}>
          <Header/>
            <main class="main-content">
              {props.children}
            </main>
          <Footer/>
          <Scroll/> 
      </UserContext.Provider>
    </div>
    </PayPalScriptProvider>
  );
}
export default App;