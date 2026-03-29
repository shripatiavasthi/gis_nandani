import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { request } from '../../lib/api'

export const loginAdmin = createAsyncThunk('auth/loginAdmin', async (credentials) => {
  const payload = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  return payload.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    username: '',
    status: 'idle',
    error: '',
  },
  reducers: {
    logoutAdmin: (state) => {
      state.token = ''
      state.username = ''
      state.status = 'idle'
      state.error = ''
    },
    clearAuthError: (state) => {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.username = action.payload.username
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Login failed'
      })
  },
})

export const { logoutAdmin, clearAuthError } = authSlice.actions
export default authSlice.reducer
