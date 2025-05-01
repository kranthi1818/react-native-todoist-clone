import {StyleSheet} from "react-native"

import { Provider } from "react-redux"
import store from "./src/redux/store/store"
import MainNavigation from "./src/navigation/MainNavigation"

export default function App() {
  

  return (
    <Provider store={store}>
      <MainNavigation/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "gray",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  cardText: {
    color: "white",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
})
