
import {configureStore} from '@reduxjs/toolkit';
import setAuthDetails from '../signup/authSlice'

export default configureStore({
    reducer:{
        authDetails:setAuthDetails,
    },
})
