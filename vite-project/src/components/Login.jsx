import React, { useState } from "react";
import styles from '../css/Login.module.css';



const Login = () =>{
    
    return(
        <div className={styles.container}>
            <h1>LogIn</h1>
            <input type = "text" placeholder="name"></input>
            <input type = "password" placeholder="password"></input>
            <div className={styles.loginBnt}>Login</div>
            <p className={styles.textLogin}></p>

        </div>
    

    )
}

export default Login;