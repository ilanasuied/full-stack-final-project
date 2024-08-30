import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import UserPageStyle from '../css/Users.module.css';



function UserPage() {
  const [users, setUsers] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [allowed_fetching, setAllowed_fetching] = useState(false);
  const [page, setPage] = useState(localStorage.getItem('currentPageUsers') === null ? 1 : JSON.parse(localStorage.getItem('currentPage')));
  const limit = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (localStorage.getItem('userPageData') === null || allowed_fetching) {
          const response = await axios.get('http://localhost:3001/api/users', {
            params: {
              page,
              limit
            }
          });
          setUsers([...users, ...response.data.users]);
          localStorage.setItem('userPageData', JSON.stringify([...users, ...response.data.users]));
          setTotalPosts(response.data.totalUsers);
        } else {
          setUsers(JSON.parse(localStorage.getItem('userPageData')));
        }
      } catch (error) {
        console.error('Error fetching users : ', error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleUserClick = (userId, username) => {
    navigate(`/users/${userId}`, { state: { username } });
  };


  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
    localStorage.setItem('currentPageUsers', JSON.stringify(page + 1));
    setAllowed_fetching(true);
  };



  const handleGoBack = () => {
    window.history.back();
  };


  return (
    <>
      <div className={UserPageStyle.backBtn}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleGoBack} />
      </div>
      <div className={UserPageStyle.container}>
        {users.map((user, index) => (
          <div key={index} className={UserPageStyle.user} onClick={() => handleUserClick(user.user_id, user.username)}>
            <p>id : {user.user_id}</p>
            <p>username : {user.username}</p>
            <p>email : {user.email}</p>
          </div>
        ))}
      </div>
      {users.length < parseInt(totalPosts) && (
        <FontAwesomeIcon icon={faRefresh} onClick={incrementPage} className={UserPageStyle.refreshBtn} />
      )}
    </>
  );
}

export default UserPage;
