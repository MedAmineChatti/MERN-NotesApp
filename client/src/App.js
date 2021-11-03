import React, {useState, useEffect} from 'react';
import Login from '../src/componentes/Login';
import Notes from '../src/componentes/Notes';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore');
      if(token) {
         const verified = await axios.get("http://localhost:5000/users/verify",{
          headers:{Authorization: token}
         })
         console.log(verified);
         setIsLogin(verified.data);
         if(verified.data === false) return localStorage.clear()
      }else {
        setIsLogin(false); 
      }
    }
    checkLogin()
  },[])
  return (
    <div className="App">
       {
         isLogin ? 
         <Notes setIsLogin={setIsLogin}/> : 
         <Login setIsLogin={setIsLogin}/>
       }
    </div>
  );
}

export default App;
