import React from 'react';

const PostContent = ({ content }) => {
  // Fonction pour vérifier si le contenu est une URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div>
      {isValidUrl(content) ? (
        <img src={content} alt="Post content" width='100rem'/>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default PostContent;
