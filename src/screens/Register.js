import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Illustration from "assets/images/illustrations/Minders.png";
import Toast from "react-native-toast-message";
import { Registration } from "../api/API";
import { TextInput } from "react-native-paper";
import { ErrorToast, SuccessToast } from "../components/Toats";
const { width } = Dimensions.get("window");

export default function Register({ navigation }) {
  // States
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [PSYCode, setPSYCode] = React.useState("");

  // Envoie les informations d'inscription à l'API
  const sendForm = async () => {
    if (!firstname || !lastname || !mail || !password)
      return Toast.show({
        ...ErrorToast,
        text2: "Veuillez vérifier vos informations ☁️",
      });

    const data = {
      first_name: firstname,
      last_name: lastname,
      email: mail,
      password,
      PSYCode: PSYCode,
    };

    Registration(data)
      .then(() => {
        Toast.show({
          ...SuccessToast,
          text1: "Félicitations !",
          text2: "Bienvenue chez Minders ! 🤗",
        });
        navigation.navigate("Bienvenue");
      })
      .catch((error) => {
        console.log(error);
        return Toast.show({
          ...ErrorToast,
          text2:
            "Il y a un petit soucis de notre côté .. Veuillez réessayer 😟",
        });
      });
  };

  return (
    <ScrollView
      style={{
        width: width,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 45,
          paddingRight: 45,
          paddingTop: 60,
          paddingBottom: 60,
        }}
      >
        <Image style={styles.illustration} source={Illustration} />
        <Text style={styles.welcome}>Bienvenue,</Text>
        <Text style={styles.tinyText}>Inscrivez-vous pour continuer</Text>

        <TextInput
          label="Prénom"
          style={{ backgroundColor: "white", height: 42 }}
          value={firstname}
          onChangeText={(firstname) => setFirstname(firstname)}
          mode="outlined"
        />
        <TextInput
          label="Nom"
          style={{ backgroundColor: "white", marginTop: 15, height: 42 }}
          value={lastname}
          onChangeText={(lastname) => setLastname(lastname)}
          mode="outlined"
        />

        <TextInput
          label="Email"
          style={{ backgroundColor: "white", marginTop: 40, height: 42 }}
          value={mail}
          onChangeText={(mail) => setMail(mail)}
          mode="outlined"
        />

        <TextInput
          label="Mot de passe"
          secureTextEntry={true}
          style={{ backgroundColor: "white", marginTop: 15, height: 42 }}
          value={password}
          onChangeText={(password) => setPassword(password)}
          mode="outlined"
        />

        <TextInput
          label="Code PSY (optionnel)"
          style={{ backgroundColor: "white", marginTop: 40, height: 42 }}
          value={PSYCode}
          onChangeText={(PSYCode) => setPSYCode(PSYCode)}
          mode="outlined"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={sendForm}
          underlayColor="red"
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Avenir-demi",
              color: "white",
            }}
          >
            Inscription
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: 290,
    height: 50,
    position: "absolute",
    top: 48,
    left: 45,
  },
  welcome: {
    fontFamily: "Avenir-demi",
    color: "#011234",
    fontSize: 36,
  },
  tinyText: {
    fontSize: 16,
    color: "#CBCEFD",
    fontFamily: "Avenir-demi",
    paddingBottom: 50,
  },
  button: {
    backgroundColor: "#7E85F9",
    width: "100%",
    marginTop: 50,
    height: 47,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7E85F9",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
});
