import { useState } from "react";
import { Modal, Platform, View } from "react-native";
import { styles } from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import React = require("react");

const CustomDateTimePicker = ({ type, onDateChange, show, setShow }) => {
  const [date, setDate] = useState(new Date());

  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  return (
    <Modal
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.container,
            Platform.OS === "android" && { backgroundColor: "transparent" },
          ]}
        >
          <DateTimePicker
            value={date}
            mode={type}
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={onChange}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomDateTimePicker;
