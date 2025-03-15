import { themas } from "@/global/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themas.Colors.blackTransparent,
  },

  container: {
    width: "80%",
    padding: 16,
    backgroundColor: "#FFF",
    elevation: 5,
    alignItems: "center",
  },

  dateText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
