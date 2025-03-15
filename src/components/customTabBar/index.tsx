import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { themas } from "@/global/themes";
import { useContext } from "react";
import { AuthContextList } from "@/context/authContext_list";

export default ({ state, navigation }) => {
  const {onOpen} = useContext<any>(AuthContextList);

	const go = (screenName: string) => {
		navigation.navigate(screenName);
	}

  return (
    <View style={styles.tabArea}>
      <TouchableOpacity style={styles.tabItem} onPress={() => go('List')}>
        <AntDesign name="bars" size={28} style={{opacity: state.index === 0 ? 1 : 0.2, color: themas.Colors.primary}} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItemButton} onPress={onOpen}>
        <View style={{ width: "100%", left: 10, top: 4 }}>
          <Entypo name="plus" size={32} color={"#FFF"} />
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            width: "100%",
            right: 10,
            bottom: 10,
          }}
        >
          <MaterialIcons name="edit" size={24} color={"#FFF"} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => go("User")}>
        <FontAwesome name="user" size={28} style={{opacity: state.index === 1 ? 1 : 0.2, color: themas.Colors.primary}} />
      </TouchableOpacity>
    </View>
  );
};
