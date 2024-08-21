import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from './pages/PostPage.jsx';
import Message from "./components/Message.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import Login from "./components/Login.jsx";
import Board from "./pages/Board.jsx"
import SignUp from './pages/SignUp.jsx';




 export default function Router() {

   return (
    
     <BrowserRouter>
       <Routes>
         <Route path="/login" element={<Login/>} />
         <Route path = "/signUp" element = {<SignUp/>}/>
         <Route path="/board/:id" element={<Board />} />
         <Route path="/posts" element={<PostPage />} />
         <Route path="/messages" element={<MessagePage />} />
         <Route path="/messages/:id" element={<Message/>} />


       </Routes>
     </BrowserRouter>
   );
 }

 