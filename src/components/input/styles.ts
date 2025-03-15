import { themas } from "@/global/themes";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	inputTitle:{
		marginLeft: 5,
		color: themas.Colors.gray,
		marginTop: 20
	},

	boxInput:{
		width: "100%",
		height: 40,
		borderWidth: 1,
		borderRadius: 40,
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 5,
		backgroundColor: themas.Colors.lightGray,
		borderColor: themas.Colors.lightGray
	},

	input: {
		height: "100%",
		width: "90%",
		borderRadius: 40,
		paddingLeft: 5
	},

	icon:{
		width: "100%"
	},

	button:{
		width: "10%"
	}
});