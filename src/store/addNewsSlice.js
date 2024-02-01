import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DENIX_URL } from '../utils/constants'

export const postNews = createAsyncThunk(
   'news/postNews',
   async function asyncPostNews(news, { rejectWithValue }) {
      try {
         const response = await fetch(`${DENIX_URL}/news.json`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(news),
         })

         if (!response.ok) {
            throw new Error('Server not Found')
         }

         const data = await response.json()
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const addNewsSlice = createSlice({
   name: 'news',
   initialState: {},
   reducers: {},
})
