import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login.jsx';
import App from './App.jsx';
import Post from "./components/Post.jsx";


 export default function Router() {

   return (
    
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/posts" element={<App />} />
       </Routes>
     </BrowserRouter>
   );
 }