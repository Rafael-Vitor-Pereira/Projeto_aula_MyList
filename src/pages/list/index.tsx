import React, { useContext, useRef } from "react";
import { styles } from "./styles";
import { Ball } from "@/components/ball";
import { Flag } from "@/components/flag";
import { themas } from "@/global/themes";
import { Input } from "@/components/input";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { AuthContextList } from "@/context/authContext_list";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { formatDateToBR } from "@/global/functions";
import { Directions, Swipeable } from "react-native-gesture-handler";

export default function List() {
  const { taskList, handleDelete, handleEdit, filter } =
    useContext<AuthContextType>(AuthContextList);
  const swipleableRefs = useRef<Array<Swipeable | null>>([]);

  const renderRightActions = () => {
    return (
      <View style={styles.button}>
        <AntDesign name="delete" size={20} color="#FFF" />
      </View>
    );
  };

  const renderLeftActions = () => {
    return (
      <View
        style={[styles.button, { backgroundColor: themas.Colors.blueLigth }]}
      >
        <AntDesign name="edit" size={20} color="#FFF" />
      </View>
    );
  };

  const handleSwipeOpen = (directions: "right" | "left", item, index) => {
    if (directions == "right") {
      handleDelete(item);
    } else {
      handleEdit(item);
    }
    swipleableRefs.current[index]?.close();
  };

  const _renderCard = (item: PropCard, index) => {
    const color =
      item.flag == "opcional" ? themas.Colors.blueLigth : themas.Colors.red;

    return (
      <Swipeable
        ref={(ref) => (swipleableRefs.current[index] = ref)}
        key={index}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableOpen={(directions) =>
          handleSwipeOpen(directions, item, index)
        }
      >
        <View style={styles.card}>
          <View style={styles.rowCard}>
            <View style={styles.rowCardLeft}>
              <Ball color={color} />
              <View>
                <Text style={styles.titleCard}>{item.title}</Text>
                <Text style={styles.descriptionCard}>{item.description}</Text>
                <Text style={styles.descriptionCard}>
                  {" "}
                  Até {formatDateToBR(item.timeLimit)}
                </Text>
              </View>
            </View>
            <Flag caption={item.flag} color={color} />
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Bom dia, <Text style={{ fontWeight: "bold" }}>Rafael Vitor</Text>
        </Text>
        <View style={styles.boxInput}>
          <Input
            IconLeft={MaterialIcons}
            IconLeftName="search"
            onChangeText={(t) => filter(t)}
          />
        </View>
      </View>

      <View style={styles.boxList}>
        <FlatList
          data={taskList}
          style={{ marginTop: 40, paddingHorizontal: 30 }}
          keyExtractor={(item, index) => item.item.toString()}
          renderItem={({ item, index }) => {
            return _renderCard(item, index);
          }}
        />
      </View>
    </View>
  );
}
