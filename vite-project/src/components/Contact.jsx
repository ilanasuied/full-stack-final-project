import React from 'react'
import NavbarFirst from '../components/NavbarFirst';
import styles from '../css/Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <NavbarFirst />
      <div className={styles.contactContainer}>
        <h1>Contact Us</h1>


        {/* Video Section
        <div className={styles.videoContainer}>
          <h2>Introduction Video</h2>
          <video width="600" controls>
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}

        {/* Photo Gallery
        <div className={styles.photoGallery}>
          <h2>Photo Gallery</h2>
          <div className={styles.photos}>
            <img src="photo1.jpg" alt="Photo 1" />
            <img src="photo2.jpg" alt="Photo 2" />
            <img src="photo3.jpg" alt="Photo 3" />
          </div>
        </div> */}

        {/* About Us Section */}
        <div className={styles.aboutUs}>
          <h2>About Us</h2>
          <p>
            Welcome to our social network dedicated to learning React! 
            Our mission is to create a community where developers, whether beginners or experienced, 
            can share their knowledge, ask questions, and collaborate on projects. 
            We believe that learning is a continuous and collaborative process, and our platform 
            is designed to help you progress quickly in React while connecting with other coding enthusiasts.
          </p>
          <p>
            Whether you're looking to hone your skills or just discover the basics of React, 
            our site is the perfect place to start. Join us and become part of a community 
            that values innovation, knowledge sharing, and personal growth through technology.
          </p>
        </div>
        Google Maps Section
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094!2d144.95373531531703!3d-37.81627977975153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777e84ff3e9a3b!2sVictoria%20State%20Library!5e0!3m2!1sen!2sus!4v1617787868912!5m2!1sen!2sus"
            width="200"
            height="150"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact;
