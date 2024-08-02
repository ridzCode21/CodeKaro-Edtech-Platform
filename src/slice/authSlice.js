import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     signupData : null,
     loading : false,
     token : localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')) : null
}

const authSlice = createSlice({
     name : "auth",
     initialState : initialState,
     reducers : {
        setToken(state,value){
             state.token = value.payload
        },
        setsignupData (state,value) {
                state.signupData = value.payload
        },
        setloading(state,value){
            state.loading = value.payload
        }
     }
})

export const {setToken,setloading,setsignupData} = authSlice.actions
export default authSlice.reducer