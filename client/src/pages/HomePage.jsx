import { useEffect, useState } from 'react';
import './HomePage.css';
import bgImage from '../images/background.png';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import user3 from '../images/user3.jpg';
import user4 from '../images/user4.jpg';
import user5 from '../images/user5.jpg';
import user6 from '../images/user6.jpg';

const commentsData = [
  { id: 1, name: "Anna Smith", photo: user1, text: "I found my perfect teammate for a hackathon here! The platform made it so much easier to collaborate with others. We were able to share ideas, brainstorm, and implement our project within just a few weeks. It was an amazing experience, and I highly recommend Studdy Buddy to anyone looking to work with motivated and creative individuals!" },
  { id: 2, name: "John Doe", photo: user2, text: "Awesome platform! It's so much easier to find people for group projects now. I was struggling to find like-minded students in my course, but thanks to Studdy Buddy, I found several amazing partners. We managed to complete our project on time and even exceeded expectations. I couldn't have done it without this community!" },
  { id: 3, name: "Emily Johnson", photo: user3, text: "I love how simple and fast it is to connect with like-minded students! Studdy Buddy made it so easy to build a team for my final-year project. The platform is intuitive, and the communication tools made the whole process smooth. My team and I managed to create a solid prototype, and we all had fun during the process!" },
  { id: 4, name: "Michael Brown", photo: user4, text: "We created an amazing startup team thanks to Studdy Buddy! I had an idea, but I needed the right people to bring it to life. Thanks to the platform, I met a talented group of individuals who shared my passion. Together, we launched a prototype that we later presented to investors. This platform is a game-changer for anyone looking to collaborate and innovate!" },
  { id: 5, name: "Sophia Williams", photo: user5, text: "This platform is exactly what I needed for my university projects. As a student, I was often stuck working on group assignments with people who weren't as invested. However, on Studdy Buddy, I found dedicated and hard-working students. We not only finished our projects on time but also made some amazing memories along the way!" },
  { id: 6, name: "Daniel Martinez", photo: user6, text: "Thanks to Studdy Buddy, I met amazing people and boosted my career! What I love most about this platform is the diversity of students. I was able to meet people with different backgrounds, skills, and perspectives, and that made our projects unique and creative. We now have a great network, and I've even been offered a job through one of the connections I made!" },
];

const getRandomComments = () => {
  const randomIndexes = [];
  while (randomIndexes.length < 3) {
    const randomIndex = Math.floor(Math.random() * commentsData.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  return randomIndexes.map(index => commentsData[index]);
};

const HomePage = () => {
  const currentComments = getRandomComments(); 


  return (
    <div>
      <div className="home-content" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="overlay">
          <h1 className="welcome-title">Welcome to Studdy Buddy</h1>
          <p className="welcome-text">
            A platform for finding like-minded people among students and jointly developing projects on any topic. Find partners, exchange ideas and create cool works together!
          </p>
        </div>

        
      </div>
      <div className="comments-section-wrapper">
        <h2 className="comments-title">Hear from Our Community</h2>
        <div className="comments-section">
          {currentComments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <img src={comment.photo} alt={comment.name} className="comment-photo" />
                <h3 className="comment-name">{comment.name}</h3>
              </div>
              <div className="comment-body">
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default HomePage;
