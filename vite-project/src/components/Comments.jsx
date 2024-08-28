import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/Comments.module.css';

const Comments = ({ initialComments, createComment, deleteComment, currentUserId }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');


    //create a new comment
    const handleCreateComment = async () => {
        try {
            const newCommentData = await createComment(newComment);
            setComments(newCommentData);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment: ', error);
        }
    };


    //delete the choosen comment
    const handleDeleteComment = async(commentToDelete) => {
        try{
            const newCommentData = await deleteComment(commentToDelete);
            setComments(newCommentData);
        } catch (error) {
            console.error('Error deletting comment: ', error)
        }
        
    };

    return (
        <div className={styles.commentsContainer}>
            <ul className={styles.comments}>
                {comments.map((comment, index) => (
                    <li key={index} className={styles.comment}>
                        <div className={styles.commentText}>
                            <b>{comment.commenter}:</b> {comment.content}
                        </div>
                        {comment.user_id === parseInt(currentUserId,10)&& <FontAwesomeIcon
                            icon={faMinusCircle}
                            className={styles.deleteIcon}
                            onClick={() => handleDeleteComment(comment.comment_id)}
                        />   }                 
                    </li>
                ))}
                <li>
                    <input
                        type="text"
                        placeholder="new comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className={styles.newCommentInput}
                    />
                    <button onClick={handleCreateComment} className={styles.createCommentButton}>
                        Send
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Comments;
