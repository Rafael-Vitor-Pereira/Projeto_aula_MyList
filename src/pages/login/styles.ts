import { themas } from "@/global/themes";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	boxTop: {
		height: Dimensions.get("window").height/3,
		width: "100%",
		alignItems: 'center',
		justifyContent: 'center'
	},

	boxMid: {
		height: Dimensions.get("window").height/4,
		width: "100%",
		paddingHorizontal: 37
	},

	boxBotton: {
		height: Dimensions.get("window").height/3,
		width: "100%",
		// justifyContent: 'center',
		alignItems: 'center'
	},

	logo:{
		width: 80,
		height: 80,
	},

	title:{
		fontWeight: 'bold',
		marginTop: 40,
		fontSize: 18
	},

	textBottom:{
		fontSize:16,
		color:themas.Colors.gray
	},

	textBottomCreate:{
			fontSize:16,
			color:themas.Colors.primary
	}
});