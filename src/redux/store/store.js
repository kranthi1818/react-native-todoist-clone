

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../reducers/loginSlice'
import registerReducer from '../reducers/RegisterSlice'
import projectReducer from '../reducers/projectsSlice'
import taskReducer from '../reducers/taskSlice'
import commentReducer from '../reducers/commentsSlice'
import createProjectReducer from '../reducers/sub/createProjectSlice'

const store = configureStore({
    reducer:{
        login:loginReducer,
        register:registerReducer,
        projects:projectReducer,
        tasks:taskReducer,
        comments:commentReducer,
        projectCreate:createProjectReducer
    },
})

export default store

