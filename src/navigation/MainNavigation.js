
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"

import ProjectsScreen from "../screens/ProjectsScreen"
import TasksScreen from "../screens/TasksScreen"
import CommentsScreen from "../screens/CommentsScreen"

const Stack = createStackNavigator();
//options={{ headerShown: false }}
export default function MainNavigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
                <Stack.Screen name="login" component={LoginScreen}/>
                <Stack.Screen name="register" component={RegisterScreen}/>
                <Stack.Screen name="projects" options={{ headerShown: false }} component={ProjectsScreen}/> 
                <Stack.Screen name="tasks" component={TasksScreen}/>
                <Stack.Screen name="comments" component={CommentsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

