import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAnecdote } from '../services/anecdotes';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [, dispatch] = useNotification();

  const mutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
      dispatch({ type: 'SET_NOTIFICATION', payload: 'A new anecdote was created' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    if (content.length >= 5) {
      mutation.mutate({ content, votes: 0 });
    } else {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Anecdote too short, must be at least 5 characters long' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;