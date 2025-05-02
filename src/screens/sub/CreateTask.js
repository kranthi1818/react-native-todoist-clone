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
import DateTimePicker from "@react-native-community/datetimepicker"

import { Ionicons } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { createTask } from "../../redux/reducers/taskSlice"
import {
  setContent,
  setDescription,
  setDueDate,
  setIsCompleted,
  resetTaskForm,
  setModalVisible,
} from "../../redux/reducers/sub/createTaskSlice"

export default function CreateTask() {
  const [showPicker, setShowPicker] = useState(false)

  const dispatch = useDispatch()

  const { content, description, isCompleted, dueDate, modalVisible } =
    useSelector((state) => state.taskCreate)

  const { projectID } = useSelector((state) => state.projects)

  const taskData = {
    project_id: projectID,
    content: content,
    description: description,
    is_completed: isCompleted,
    due_date: dueDate,
  }
  
  const handleCreate = () => {
    dispatch(createTask(taskData))
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
            <Text style={styles.modalTitle}>Create Task</Text>

            <Text>Content</Text>
            <TextInput
              value={content}
              onChangeText={(text) => dispatch(setContent(text))}
              style={styles.input}
              placeholder="Enter task content"
            />

            <Text>Description</Text>
            <TextInput
              value={description}
              onChangeText={(text) => dispatch(setDescription(text))}
              style={styles.input}
              placeholder="Enter description"
            />

            <TouchableOpacity
              onPress={() => dispatch(setIsCompleted(!isCompleted))}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={isCompleted ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={isCompleted ? "green" : "gray"}
              />
              <Text style={styles.favoriteText}>
                {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
              </Text>
            </TouchableOpacity>

            <Text>Due Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text>{dueDate || "Select Due Date"}</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={dueDate ? new Date(dueDate) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(false)
                  if (selectedDate) {
                    dispatch(
                      setDueDate(selectedDate.toISOString().split("T")[0])
                    )
                  }
                }}
              />
            )}

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
    justifyContent:'center'
  },
  modalBottomSheet: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  favoriteText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#007AFF",
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
