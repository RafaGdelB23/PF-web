import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import './Comments.css';

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      onSubmit(comment, rating);
      setComment('');
      setRating(0);
    }
  };

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="formComment">
      <div className="star-rating">
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          changeRating={changeRating}
          numberOfStars={5}
          name='rating'
          starDimension="30px"
          starSpacing="5px"
        />
      </div>
        <textarea className="textArea-comment"
            value={comment}
            onChange={handleChange}
            placeholder="Escribe tu comentario..."
            required
        />
        <button type="submit">Enviar comentario</button>
        </form>
  );
};

export default CommentForm;