import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/anecdotes'

export const useAnecdotes = () => {
    return useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
    });
  };