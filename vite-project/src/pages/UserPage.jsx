import React, {useEffect , useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserPageStyle from '../css/Users.module.css';

function UserPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users : ', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className={UserPageStyle.container}>
      {users.map((user) => (
        <div key={user.userId} className={UserPageStyle.user} onClick={() => handleUserClick(user.user_id)}>
           <p>id : {user.user_id}</p>
           <p>username : {user.username}</p>
           <p>email : {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserPage;
