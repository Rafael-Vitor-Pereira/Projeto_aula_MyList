import { themas } from "@/global/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	tabArea: {
		flexDirection: "row",
		height: 80,
		justifyContent: "space-around",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7
	},

	tabItem:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},

	tabItemButton:{
		width: 70, 
		height: 70,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 99,
		backgroundColor: themas.Colors.primary,
		top: -30
	}
});