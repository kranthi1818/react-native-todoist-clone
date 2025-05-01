import React from "react"
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

import { showDeleteConfirmation } from "../utils/alert"

import { useDispatch, useSelector } from "react-redux"
import { getAllProjectsForUser } from "../redux/reducers/projectsSlice"
import { useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"
import { deleteProject } from "../redux/reducers/projectsSlice"
import { getProjectId } from "../redux/reducers/projectsSlice"

import CreateProject from "./sub/CreateProject"

function ProjectsScreen({ navigation }) {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.login)

  const userid = user?.userId
  const userName = user?.name
  const { projects, loading, error } = useSelector(
    (state) => state.projects
  )

  useEffect(() => {
    if (userid) {
      dispatch(getAllProjectsForUser(userid))
    }
  }, [userid, dispatch])

  function handleClickProject(projectId) {
    dispatch(getProjectId(projectId))
    navigation.navigate("tasks")
  }

  function handleDeleteProject(itemId) {
    showDeleteConfirmation(
      "Delete Project",
      "Are you sure you want to delete this Project?",
      itemId,
      (itemId) => dispatch(deleteProject(itemId))
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View>
        <Text style={styles.nameText}>Hello {userName}</Text>
      </View>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleClickProject(item.id)}
            style={[styles.card, { backgroundColor: item.color }]}
          >
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteProject(item.id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nothing To Show</Text>
        }
      />
      <CreateProject />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardDescription: {
    marginTop: 5,
    color: "gray",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  deleteButton: {
    padding: 8,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
})

export default ProjectsScreen
