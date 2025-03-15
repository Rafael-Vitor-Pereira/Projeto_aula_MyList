import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  text: string;
  loading?: boolean;
};

export function Button({ ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.button} {...rest} activeOpacity={0.6}>
      {rest.loading ? (
        <ActivityIndicator color="#FFF" size="small" />
      ) : (
        <Text style={styles.textButton}>{rest.text}</Text>
      )}
    </TouchableOpacity>
  );
}
