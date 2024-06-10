import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdoteVotes } from '../services/anecdotes';
import { useNotification } from '../NotificationContext';

export const useVoteMutation = () => {
  const queryClient = useQueryClient();
  const [, dispatch] = useNotification();

  const voteMutation = useMutation({
    mutationFn: updateAnecdoteVotes,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries('anecdotes');
      dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote '${updatedAnecdote.content}' voted` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  return voteMutation;
};
