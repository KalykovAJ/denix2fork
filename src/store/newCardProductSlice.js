import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/constants'

export const getProdictItem = createAsyncThunk(
   'cartItem/getProdictItem',
   async function (id, { rejectWithValue, dispatch }) {
      try {
         const response = await fetch(`${BASE_URL}/products/${id}.json`)
         if (!response.ok) {
            throw new Error('Server Error')
         }
         const data = await response.json()
         dispatch(setData(data)) // Assuming you have a setData action to update the state
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
   },

   reducers: {
      setData: (state, action) => {
         state.data = action.payload
      },
   },
})

export const { setData } = newCardProduct.actions
