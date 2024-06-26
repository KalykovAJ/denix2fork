import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/constants'

export const getProdictItem = createAsyncThunk(
   'cartItem/getProdictItem',
   async function asyncGetProduct(id, { rejectWithValue, dispatch }) {
      try {
         const response = await fetch(`${BASE_URL}/products/${id}.json`)
         if (!response.ok) {
            throw new Error('Server Error')
         }
         const data = await response.json()
         dispatch(setData(data))
         return data
      } catch (error) {
         console.error('Error in getProdictItem:', error)
         return rejectWithValue(error)
      }
   }
)

export const newCardProduct = createSlice({
   name: 'newPage',

   initialState: {
      data: null,
      status: null,
   },

   reducers: {
      setData: (state, action) => {
         state.data = action.payload
      },
      setFavoritesLocal(state) {
         state.data.isFavorites = !state.data.isFavorites
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getProdictItem.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(getProdictItem.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
         })
   },
})

export const { setData, setFavoritesLocal } = newCardProduct.actions
