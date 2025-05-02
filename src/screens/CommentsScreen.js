import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { getAllComments } from "../redux/reducers/commentsSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { deleteComment } from "../redux/reducers/commentsSlice"
import CreateComment from '../screens/sub/CreateComment'

import { showDeleteConfirmation } from "../utils/alert"

function CommentsScreen() {
  const dispatch = useDispatch()

  const { taskId } = useSelector((state) => state.tasks)
  const { comments } = useSelector((state) => state.comments)

  useEffect(() => {
    if (taskId) {
      dispatch(getAllComments(taskId))
    }
  }, [taskId, dispatch])

  function handleDeleteTask(itemId) {
    showDeleteConfirmation(
      "Delete Task",
      "Are you sure you want to delete this task?",
      itemId,
      (itemId) => dispatch(deleteComment(itemId))
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.author}</Text>
              <Text style={styles.cardContent}>{item.content}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteTask(item.id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Comments Yet</Text>
        }
      />
      <CreateComment/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "lightyellow",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  cardContent: {
    fontSize: 14,
    color: "black",
    marginTop: 5,
  },
  deleteButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
})

export default CommentsScreen
