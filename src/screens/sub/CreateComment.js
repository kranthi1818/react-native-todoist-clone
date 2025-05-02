import React, { useState } from "react"
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native"

import { Ionicons } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { createComment } from "../../redux/reducers/commentsSlice"
import {
  setContent,
  resetTaskForm,
  setModalVisible,
} from "../../redux/reducers/sub/createCommentSlice"

export default function CreateTask() {
  const dispatch = useDispatch()

  const { content, modalVisible } = useSelector((state) => state.commentCreate)

  const { projectID } = useSelector((state) => state.projects)
  const { taskId } = useSelector((state) => state.tasks)

  const commentData = {
    content: content,
  }

  const handleCreate = () => {
    createComment({projectID, taskId, commentData})
    dispatch(createComment({projectID, taskId, commentData}))
      .then((response) => {
        if (response.error) {
          console.log(response.error.message)
        } else {
          dispatch(resetTaskForm())
        }
      })
      .catch((err) => {
        throw new Error("Enter valid data inside fields")
      })
    dispatch(setModalVisible(false))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => dispatch(setModalVisible(false))}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBottomSheet}>
            <Text style={styles.modalTitle}>Enter Task</Text>

            <TextInput
              value={content}
              onChangeText={(text) => dispatch(setContent(text))}
              style={styles.input}
              placeholder="Enter something..."
            />

            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCreate}
              >
                <Text style={styles.okText}>OK</Text>
                
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  dispatch(setModalVisible(false))
                  dispatch(resetTaskForm())
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => dispatch(setModalVisible(true))}
      >
        <Ionicons name="add-circle" size={80} color="#007AFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBottomSheet: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    padding: 20,
    paddingBottom: 30,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  okText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
})
