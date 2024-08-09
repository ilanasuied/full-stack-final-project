import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login.jsx';
import App from './App.jsx';


 export default function Router() {

   return (
    
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login />}>
         <Route path="/app" element={<App />} />
         </Route>
       </Routes>
     </BrowserRouter>
   );
 }