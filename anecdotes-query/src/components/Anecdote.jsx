import React from 'react';

const Anecdote = ({ anecdote, onVote }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={() => onVote(anecdote)}>vote</button>
    </div>
  </div>
);

export default Anecdote;
