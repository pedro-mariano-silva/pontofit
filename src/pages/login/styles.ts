import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },

  // TOPO - Logo + título
  boxTop: {
    height: Dimensions.get("window").height / 5.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 285,
    height: 100,
    top: -35,
    resizeMode: "contain",
  },

  text: {
    top:-25,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },

  // ÁREA DOS INPUTS
  boxMid: {
    width: "90%",
    marginTop: 40,
  },

  titleInput: {

    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6,
    marginLeft: 5,
    top: -45
  },

boxInput: {
  top: -48,
  width: "100%",
  height: 48,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 25,
  paddingHorizontal: 15,
  borderColor: "#68E58B",
  marginBottom: 20,
  backgroundColor: "#FFFFFF",
},

  // BOTÃO
  boxButton: {
    width: "100%",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    top: -60,
    width: 220,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    backgroundColor: "#68E58B",

    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 8,
  },

  buttonLogar: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  rememberContainer: {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",
  marginTop: 14,
  top: -65,
  left: 170,
},

checkbox: {
  width: 22,
  height: 22,
  borderWidth: 2,
  borderColor: "#4DA953",
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
},

checkboxChecked: {
  backgroundColor: "#4DA953",
  borderColor: "#4DA953",
},

rememberText: {
  marginLeft: 9,
  fontSize: 14,
  color: "#555",
  fontWeight: "500",
},

textRodape:{
    top: 20,
    fontWeight: "bold",
},
});
