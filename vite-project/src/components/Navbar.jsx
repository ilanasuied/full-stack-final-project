import React, { useState } from 'react';
import styles from '../css/Navbar.module.css';

const Navbar = ({onChangeTab}) => {
    const [activeTab, setActiveTab] = useState('myPosts');

    const handleTabClick = (tab) => {
        if(tab != activeTab){
            onChangeTab();
        }
        setActiveTab(tab);
    };

    return (
        <table className={styles.container}>
            <tbody>
                <tr>
                    <td
                        className={`${styles.tab} ${activeTab === 'myPosts' ? styles.active : ''}`}
                        onClick={() => handleTabClick('myPosts')}
                    >
                        My Posts
                    </td>
                    <td
                        className={`${styles.tab} ${activeTab === 'allPosts' ? styles.active : ''}`}
                        onClick={() => handleTabClick('allPosts')}
                    >
                        All Posts
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Navbar;
