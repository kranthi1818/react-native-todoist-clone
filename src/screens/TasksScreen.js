import React from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react"
import { getAllTasks,deleteTask, getTaskId } from '../redux/reducers/taskSlice';

import { showDeleteConfirmation } from '../utils/alert';
import  CreateTask  from '../screens/sub/CreateTask';

const TasksScreen = ({navigation}) => {
  const dispatch = useDispatch()
    
   const {tasks} = useSelector((state)=>state.tasks)
   const {projectID} = useSelector((state)=>state.projects)

    useEffect(() => {
      if (projectID) {
        dispatch(getAllTasks(projectID))
      }
    }, [projectID, dispatch])

    function handleClikTask(taskId){
      dispatch(getTaskId(taskId))
      navigation.navigate('comments')
    }

    function handleDeleteTask(itemId){
    
        showDeleteConfirmation(
          'Delete Task', 
          'Are you sure you want to delete this task?',
          itemId, 
          (itemId) => dispatch(deleteTask(itemId))  
        )
    }

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>handleClikTask(item.id)} style={[styles.card, { backgroundColor:'lightblue' }]}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.content}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.createdAt}>{item.created_at}</Text>
          </View>
          <TouchableOpacity onPress={()=>handleDeleteTask(item.id)} style={styles.deleteButton}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>Nothing To Show</Text>}
    />
    <CreateTask/>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cardDescription: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  createdAt:{
    fontSize:10,
    marginTop:10
  }});

export default TasksScreen;
