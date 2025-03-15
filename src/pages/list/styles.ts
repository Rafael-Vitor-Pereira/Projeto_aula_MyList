import { themas } from "@/global/themes";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    width: "100%",
    height: Dimensions.get("window").height / 6,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: themas.Colors.primary,
  },

  greeting: {
    fontSize: 20,
    color: "#FFF",
    marginTop: 20,
  },

  boxInput: {
    width: "80%",
  },

  boxList: {
    flex: 1,
    width: "100%",
  },

  card: {
    width: "100%",
    minHeight: 60,
    backgroundColor: "#FFF",
    marginTop: 6,
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: themas.Colors.lightGray,
  },

  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowCardLeft: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  titleCard: {
    fontSize: 16,
    fontWeight: "bold",
  },

  descriptionCard: {
    color: themas.Colors.gray,
  },

  button: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
});
