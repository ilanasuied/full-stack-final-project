import React, { useState } from 'react';
import styles from '../css/Users.module.css';

const User = ({ user }) => {


    

    return (
       <div className={styles.user}>
            <p className={styles.nameUser}>{user.username}</p>
            <div className={styles.userContent}>
             {user.role}
            </div>

        </div>


    );   

}

export default User;