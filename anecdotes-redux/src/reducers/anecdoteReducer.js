import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';
import { setNotification } from './notificationReducer';

export const fetchAnecdotes = createAsyncThunk(
  'anecdotes/fetchAnecdotes',
  async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
  }
);

export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content, { dispatch }) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(setNotification(`Created new anecdote: "${newAnecdote.content}"`, 5));
    return newAnecdote;
  }
);

export const voteAnecdote = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async (id, { dispatch, getState }) => {
    const anecdoteToVote = getState().anecdotes.find(anecdote => anecdote.id === id);
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
    const result = await anecdoteService.update(id, updatedAnecdote);
    dispatch(setNotification(`Voted for anecdote: "${result.content}"`, 5));
    return result;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnecdotes.fulfilled, (state, action) => action.payload)
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        return state.map(anecdote =>
          anecdote.id !== action.payload.id ? anecdote : action.payload
        );
      });
  }
});

export default anecdoteSlice.reducer;
