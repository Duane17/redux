import React from 'react';
import { useAnecdotes } from './useAnecdotes'
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Anecdote from './components/Anecdote';
import { useVoteMutation } from './hooks/voteMutation';

const App = () => {
  const { data: anecdotes, error, isLoading } = useAnecdotes();

  const voteMutation = useVoteMutation()

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} onVote={handleVote} />
      ))}
    </div>
  );
};

export default App;