import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from './pages/PostPage.jsx';
import Message from "./components/Message.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import Login from "./components/Login.jsx";
import Board from "./pages/Board.jsx"
import SignUp from './pages/SignUp.jsx';
import UserPage from "./pages/UserPage.jsx";
import User from "./components/User.jsx";
import Profile from "./components/Profile.jsx";
import Quizz from "./components/Quizz.jsx";
import Contact from "./components/Contact.jsx";
import ScorePage from "./components/ScorePage.jsx";
import HomePage from "./pages/Home.jsx";

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/messages/:id" element={<Message />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/quiz/:id" element={<Quizz />} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="/scores/:id" element={<ScorePage />} />
      </Routes>
    </BrowserRouter>
  );
}

