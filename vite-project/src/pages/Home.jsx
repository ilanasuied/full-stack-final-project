import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/HomePage.module.css'; 
import video from '../videos/Home.mp4'; 

const HomePage = () => {
    return (
        <div className={styles.container}>
            <h1>IKReact</h1>
            <div className={styles.videoWrapper}>
                <video className={styles.video} autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className={styles.overlayText}>Welcome to IKReact.</div>
            <div className={styles.buttons}>
                <Link to="/login">
                    <button className={styles.button}>Log In</button>
                </Link>
                <Link to="/signup">
                    <button className={styles.button}>Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
