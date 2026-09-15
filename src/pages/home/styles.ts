import {
  StyleSheet,
} from "react-native";

export const style =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },

    // ==========================================
    // TOPO
    // ==========================================

    topo: {
      top: -150,
      width: 455,
      height: 385,
    },

    text: {
      padding: 20,
      fontSize: 40,
      top: -320,
      color: "white",
      fontFamily: "Baloo-Bhaina",
      fontWeight: "bold",
    },

    exercise: {
      top: -265,
      width: 170,
      height: 120,
      right: -238,
    },

    // ==========================================
    // OPÇÕES
    // ==========================================

    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",

      marginTop: -195,

      paddingHorizontal: 20,
    },

    option: {
      width: 150,
      alignItems: "center",
    },

    optionText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#222",

      marginBottom: 10,

      textAlign: "center",
    },

    // ==========================================
    // RETÂNGULO + ÍCONE
    // ==========================================

    rectangleContainer: {
      width: 142,
      height: 105,

      justifyContent: "center",
      alignItems: "center",

      position: "relative",
    },

    rectangle: {
      width: 90,
      height: 120,

      resizeMode: "contain",

      position: "absolute",
    },

    iconCheck: {
      width: 48,
      height: 48,

      resizeMode: "contain",

      zIndex: 2,
    },

    iconMoney: {
      width: 65,
      height: 48,

      resizeMode: "contain",

      zIndex: 2,
    },

    // ==========================================
    // SAIR
    // ==========================================

    logoutArea: {
      flex: 1,

      justifyContent: "flex-end",
      alignItems: "center",

      paddingBottom: 35,
    },

    containerButtonInicio: {
      backgroundColor: "#4DA953",

      borderRadius: 15,

      height: 34,
      width: 150,

      justifyContent: "center",
      alignItems: "center",
      top: -150,
    },

    textButtonSair: {
      color: "white",

      fontSize: 18,

      textAlign: "center",

      fontWeight: "bold",
    },
  });