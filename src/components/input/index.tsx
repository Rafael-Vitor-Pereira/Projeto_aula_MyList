import { themas } from "@/global/themes";
import React, { forwardRef, LegacyRef } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import { styles } from "./styles";

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRigth?: IconComponent;
  IconLeftName?: string;
  IconRigthName?: string;
  title?: string;
  onIconLeftPress?: () => void;
  onIconRigthPress?: () => void;
  heigth?: number;
  labelStyle?: StyleProp<TextStyle>;
};

export const Input = forwardRef(
  (props: Props, ref: LegacyRef<TextInput> | null) => {
    const {
      IconLeft,
      IconRigth,
      IconLeftName,
      IconRigthName,
      title,
      onIconLeftPress,
      onIconRigthPress,
      heigth,
      labelStyle,
      ...rest
    } = props;

    const calculateSizeWidth = () => {
      if (IconLeft && IconRigth) {
        return "80%";
      } else if (IconLeft || IconRigth) {
        return "90%";
      } else {
        return "100%";
      }
    };

    const calculateSizePaddindLeft = () => {
      if (IconLeft && IconRigth) {
        return 0;
      } else if (IconLeft || IconRigth) {
        return 10;
      } else {
        return 20;
      }
    };

    return (
      <>
        {title && <Text style={[styles.inputTitle, labelStyle]}>{title}</Text>}
        <View
          style={[
            styles.boxInput,
            { paddingLeft: calculateSizePaddindLeft(), height: heigth || 40 },
          ]}
        >
          {IconLeft && IconLeftName && (
            <TouchableOpacity onPress={onIconLeftPress} style={styles.button}>
              <IconLeft
                name={IconLeftName as any}
                size={20}
                color={themas.Colors.gray}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}

          <TextInput
            style={[
              styles.input,
              { width: calculateSizeWidth(), height: "100%" },
            ]}
            {...rest}
          />

          {IconRigth && IconRigthName && (
            <TouchableOpacity onPress={onIconRigthPress} style={styles.button}>
              <IconRigth
                name={IconRigthName as any}
                size={20}
                color={themas.Colors.gray}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
);
