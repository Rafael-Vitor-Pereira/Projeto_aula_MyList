import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import { Flag } from "@/components/flag";
import { themas } from "@/global/themes";
import { Input } from "@/components/input";
import { Modalize } from "react-native-modalize";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CustomDateTimePicker from "@/components/customDateTimePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const AuthContextList = createContext({});

const flags = [
  { caption: "urgente", color: themas.Colors.red },
  { caption: "opcional", color: themas.Colors.blueLigth },
];

export const AuthProviderList = (props: any): any => {
  const modalizaRef = useRef<Modalize>(null);

  const [item, setItem] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("urgente");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [taskList, setTaskList] = useState<Array<PropCard>>();
  const [taskListBackup, setTaskListBackup] = useState<Array<PropCard>>();

  const onOpen = () => {
    modalizaRef?.current?.open();
  };

  const onClose = () => {
    modalizaRef?.current?.close();
  };

  useEffect(() => {
    get_taskList();
  }, []);

  const _renderFlags = () => {
    return flags.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setSelectedFlag(item.caption)}
      >
        <Flag
          caption={item.caption}
          color={item.color}
          selected={item.caption == selectedFlag}
        />
      </TouchableOpacity>
    ));
  };

  const hendleDateChange = (date) => {
    setSelectedDate(date);
  };

  const hendleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSave = async () => {
    if (!title || !description || !selectedFlag) {
      return Alert.alert("Atenção", "Preencha todos os campos corretamente!");
    }

    try {
      const newItem = {
        item: item !== 0 ? item : Date.now(),
        title,
        description,
        flag: selectedFlag,
        timeLimit: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        ).toISOString(),
      };

      const storageData = await AsyncStorage.getItem("tasklist");
      let taskList = storageData ? JSON.parse(storageData) : [];

      const itemIndex = taskList.findIndex(
        (task: PropCard) => task.item === newItem.item
      );

      if (itemIndex >= 0) {
        taskList[itemIndex] = newItem;
      } else {
        taskList.push(newItem);
      }

      await AsyncStorage.setItem("tasklist", JSON.stringify(taskList));

      setTaskList(taskList);
      setTaskListBackup(taskList);

      setData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const setData = () => {
    setItem(0);
    setTitle("");
    setDescription("");
    setSelectedFlag("");
    setSelectedDate(new Date());
    setSelectedTime(new Date());
  };

  async function get_taskList() {
    try {
      const storageData = await AsyncStorage.getItem("tasklist");
      const taskList = storageData ? JSON.parse(storageData) : [];
      setTaskList(taskList);
      setTaskListBackup(taskList);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (itemToDelete: PropCard) => {
    try {
      const storageData = await AsyncStorage.getItem("tasklist");
      const taskList = storageData ? JSON.parse(storageData) : [];

      const updatedTaskList = taskList.filter(
        (item: PropCard) => item.item !== itemToDelete.item
      );

      await AsyncStorage.setItem("tasklist", JSON.stringify(updatedTaskList));

      setTaskList(updatedTaskList);
      setTaskListBackup(updatedTaskList);
    } catch (error) {
      console.log("erro ao excluir: ", error);
    }
  };

  const handleEdit = async (itemToEdit: PropCard) => {
    try {
      setItem(itemToEdit.item);
      setTitle(itemToEdit.title);
      setSelectedFlag(itemToEdit.flag);
      setDescription(itemToEdit.description);

      const timeLimit = new Date(itemToEdit.timeLimit);
      setSelectedDate(timeLimit);
      setSelectedTime(timeLimit);

      onOpen();
    } catch (error) {
      console.log("erro ao editar: ", error);
    }
  };

  const filter = (t: string) => {
    const array = taskListBackup;
    const campos = ["title", "description"];

    if (t) {
      const searchTerm = t.trim().toLowerCase();

      const filteredArray = array?.filter((item) => {
        for (let i = 0; i < campos.length; i++) {
          if (item[campos[i]].trim().toLowerCase().includes(searchTerm))
            return true;
        }
      });

      setTaskList(filteredArray);
    } else {
      setTaskList(array);
    }
  };

  const _container = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={30} />
          </TouchableOpacity>

          <Text style={styles.title}>Criar Tarefa</Text>

          <TouchableOpacity onPress={() => handleSave()}>
            <AntDesign name="check" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Input
            title="Titulo"
            labelStyle={styles.label}
            value={title}
            onChangeText={setTitle}
          />

          <Input
            title="Descrição"
            labelStyle={styles.label}
            heigth={100}
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />

          <View style={{ width: "40%" }}>
            <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
              <TouchableOpacity
                style={{ width: 200 }}
                onPress={() => setShowDatePicker(true)}
              >
                <Input
                  title="Data limite"
                  labelStyle={styles.label}
                  editable={false}
                  value={selectedDate.toLocaleDateString()}
                  onPress={() => setShowDatePicker(true)}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: 120 }}
                onPress={() => setShowTimePicker(true)}
              >
                <Input
                  title="Hora limite"
                  labelStyle={styles.label}
                  editable={false}
                  value={selectedTime.toLocaleTimeString()}
                  onPress={() => setShowTimePicker(true)}
                />
              </TouchableOpacity>
            </View>

            <CustomDateTimePicker
              onDateChange={hendleDateChange}
              setShow={setShowDatePicker}
              show={showDatePicker}
              type="date"
            />

            <CustomDateTimePicker
              onDateChange={hendleTimeChange}
              setShow={setShowTimePicker}
              show={showTimePicker}
              type="time"
            />
          </View>

          <View style={styles.containerFlag}>
            <Text style={styles.label}>Flags:</Text>
            <View style={styles.rowFlags}>{_renderFlags()}</View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <AuthContextList.Provider
      value={{ onOpen, taskList, handleDelete, handleEdit, filter }}
    >
      {props.children}

      <Modalize
        ref={modalizaRef}
        childrenStyle={{ height: Dimensions.get("window").height / 1.6 }}
        adjustToContentHeight={true}
      >
        {_container()}
      </Modalize>
    </AuthContextList.Provider>
  );
};

export const useAuth = () => useContext(AuthContextList);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  header: {
    width: "100%",
    height: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    width: "100%",
    paddingHorizontal: 20,
  },

  containerFlag: {
    width: "100%",
    padding: 10,
  },

  label: {
    fontWeight: "bold",
    color: "#000",
  },

  rowFlags: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
});
