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

import WheelColorPicker from "react-native-wheel-color-picker"

import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { createProject } from "../../redux/reducers/projectsSlice"
import {
  setProjectName,
  setProjectColor,
  setFavourite,
  resetProjectForm,
  setModalVisible,
} from "../../redux/reducers/sub/createProjectSlice"

export default function CreateProject() {
  const dispatch = useDispatch()
  const { name, color, isFavourite, modalVisible } = useSelector(
    (state) => state.projectCreate
  )

  const { user } = useSelector((state) => state.login)
  const userid = user?.userId

  const projectData = {
    user_id: userid,
    name: name,
    color: color,
    is_favourite: isFavourite,
  }

  const handleCreate = () => {
    dispatch(createProject(projectData))
      .then((response) => {
        if (response.error) {
          console.log(response.error.message)
        } else {
          dispatch(resetProjectForm())
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
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => dispatch(setModalVisible(false))}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create Project</Text>
            <Text>Enter Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => dispatch(setProjectName(text))}
              style={styles.input}
              placeholder="Project Name"
            />
            <Text>Select Project Color</Text>
            <View style={styles.colorPickerWrapper}>
              <WheelColorPicker
                color={color}
                onColorChangeComplete={(selectedColor) =>
                  dispatch(setProjectColor(selectedColor))
                }
                thumbStyle={{ height: 24, width: 24, borderRadius: 12 }}
                sliderHidden={true}
              />
            </View>

            <TouchableOpacity
              onPress={() => dispatch(setFavourite(!isFavourite))}
              style={styles.favoriteButton}
            >
              <FontAwesome
                name={isFavourite ? "heart" : "heart-o"}
                size={28}
                color={isFavourite ? "red" : "gray"}
              />
              <Text style={styles.favoriteText}>Add To Favorites</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleCreate()}
              >
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  dispatch(setModalVisible(false))
                  dispatch(resetProjectForm())
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
        <Ionicons name="add-circle" size={64} color="#007AFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop:30
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  okText: {
    color: "green",
    fontWeight: "bold",
  },
  cancelText: {
    color: "red",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  colorPickerWrapper: {
    width: 210,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  }
})
