import React, {useEffect , useState} from 'react';
import axios from 'axios';
import Login from '../components/Login';
import User from '../components/User'

function UserPage() {
const [users,setUsers] = useState([]);


useEffect(()=>{
    const fetchUsers = async () => {
        try{
            const response = await axios.get('http://localhost:3001/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users : ', error);

        }
    };

    fetchUsers();
},[])

return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <User key={user.userId} user={user} />
        ))}
      </ul>
    </div>
  );



};

export default UserPage;