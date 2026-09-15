import {
  StyleSheet,
} from "react-native";

export const style =
  StyleSheet.create({
    // ========================================
    // TELA
    // ========================================

    container: {
      flex: 1,
      backgroundColor:
        "#FFFFFF",
    },

    // ========================================
    // TOPO
    // ========================================

    topo: {
         top: -150,
      width: 455,
      height: 385,
    },

    text: {
      padding: 20,
      fontSize: 40,
      top: -299,
      color: "#FFFFFF",
      fontFamily:
        "Baloo-Bhaina",
      fontWeight: "bold",
      left: 60,
    },

    // ========================================
    // TÍTULOS
    // ========================================

    containerTitle: {
      flexDirection: "row",
      justifyContent:
        "center",
      alignItems: "center",

      top: -120,

      paddingHorizontal: 20,

      marginBottom: 16,
    },

    title: {
      fontSize: 25,
      fontWeight: "600",

      textAlign: "center",

      color: "#222222",
    },

    // ========================================
    // TIPOS DE TREINO
    // ========================================

    containerTreinos: {
      width: "100%",

      paddingHorizontal: 20,

      flexDirection: "row",

      justifyContent:
        "space-between",

      alignItems: "center",

      top: -120,

      marginBottom: 25,
    },

    botaoTreino: {
      width: "48%",

      minHeight: 52,

      paddingHorizontal: 8,

      borderWidth: 2,
      borderColor: "#4DA953",

      borderRadius: 12,

      justifyContent:
        "center",

      alignItems: "center",

      backgroundColor:
        "#FFFFFF",
    },

    botaoTreinoSelecionado: {
      backgroundColor:
        "#4DA953",
    },

    textoTreino: {
      fontSize: 15,

      fontWeight: "700",

      color: "#4DA953",

      textAlign: "center",
    },

    textoTreinoSelecionado: {
      color: "#FFFFFF",
    },

    // ========================================
    // BOTÕES CHECK-IN
    // ========================================

    containerButton: {
      width: "100%",

      paddingHorizontal: 20,

      top: -100,

      alignItems: "center",
    },

    containerButtonWithPersonal: {
      width: "100%",

      height: 52,

      backgroundColor:
        "#4DA953",

      borderRadius: 12,

      justifyContent:
        "center",

      alignItems: "center",

      marginBottom: 14,
    },

    textButtonWithPersonal: {
      color: "#FFFFFF",

      fontSize: 16,

      fontWeight: "700",

      textAlign: "center",
    },

    textButtonWithoutPersonal: {
      color: "#FFFFFF",

      fontSize: 16,

      fontWeight: "700",

      textAlign: "center",
    },

    // ========================================
    // MODAL - FUNDO
    // ========================================

    modalOverlay: {
      flex: 1,

      backgroundColor:
        "rgba(0, 0, 0, 0.55)",

      justifyContent:
        "center",

      alignItems: "center",

      paddingHorizontal: 25,
    },

    // ========================================
    // MODAL - CONTAINER
    // ========================================

    modalContainer: {
      width: "100%",

      maxWidth: 360,

      backgroundColor:
        "#FFFFFF",

      borderRadius: 18,

      paddingHorizontal: 24,

      paddingVertical: 28,

      alignItems: "center",

      elevation: 8,

      shadowColor: "#000",

      shadowOffset: {
        width: 0,
        height: 4,
      },

      shadowOpacity: 0.2,

      shadowRadius: 8,
    },

    // ========================================
    // NOME DO TREINO NO MODAL
    // ========================================

    modalTreino: {
      fontSize: 22,

      fontWeight: "700",

      color: "#4DA953",

      textAlign: "center",

      marginBottom: 10,
    },

    // ========================================
    // PERGUNTA DO MODAL
    // ========================================

    modalTitle: {
      fontSize: 18,

      fontWeight: "700",

      color: "#222222",

      textAlign: "center",

      marginBottom: 25,
    },

    // ========================================
    // BOTÕES DO MODAL
    // ========================================

    modalButton: {
      width: "100%",

      height: 50,

      backgroundColor:
        "#4DA953",

      borderRadius: 12,

      justifyContent:
        "center",

      alignItems: "center",

      marginBottom: 12,
    },

    modalButtonText: {
      color: "#FFFFFF",

      fontSize: 16,

      fontWeight: "700",

      textAlign: "center",
    },

    // ========================================
    // CANCELAR
    // ========================================

    modalCancelButton: {
      width: "100%",

      height: 45,

      justifyContent:
        "center",

      alignItems: "center",

      marginTop: 3,

      borderWidth: 2,

      borderColor: "#4DA953",

      borderRadius: 12,

      backgroundColor:
        "#FFFFFF",
    },

    modalCancelText: {
      color: "#000000",

      fontSize: 14,

      fontWeight: "700",
    },

    titleTextCheckin:{
      fontSize: 25,
      
    }
  });