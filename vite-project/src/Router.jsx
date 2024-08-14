import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login.jsx';
import PostPage from './pages/PostPage.jsx';
import Message from "./components/Message.jsx";
//import UserPage from './pages/UserPage.jsx';




 export default function Router() {

   return (
    
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/posts" element={<PostPage />} />
         <Route path="/messages" element={<Message />} />

       </Routes>
     </BrowserRouter>
   );
 }

 