import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import Logo from "@/assets/logo.png";
import { useState } from "react";
import { Input } from "@/components/input";
import { FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Button } from "@/components/button";

import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !password) {
        return Alert.alert("Atenção", "Ppreencha todos os campos!");
      }

      setTimeout(() => {
        if (email == "rafaelpereira0599@gmail.com" && password == "123456") {
          navigation.reset({ routes: [{ name: "BottonRoutes" }] });
        } else {
          Alert.alert("Usuário não encontrado!");
        }
        setLoading(false);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Bem vindo de volta!</Text>
      </View>

      <View style={styles.boxMid}>
        <Input
          value={email}
          onChangeText={setEmail}
          title="Endereço de email"
          IconRigth={MaterialIcons}
          IconRigthName="email"
        />

        <Input
          value={password}
          onChangeText={setPassword}
          title="Senha"
          IconRigth={Octicons}
          IconRigthName={showPassword ? "eye-closed" : "eye"}
          secureTextEntry={showPassword}
          onIconRigthPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={styles.boxBotton}>
        <Button text="Entrar" loading={loading} onPress={() => getLogin()} />
      </View>

      <Text style={styles.textBottom}>
        Não tem conta? <Text style={styles.textBottomCreate}> Crie agora!</Text>
      </Text>
    </View>
  );
}
