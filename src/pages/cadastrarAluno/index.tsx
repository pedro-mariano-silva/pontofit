import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../../../App";

import {
  supabase,
} from "../../lib/supabase";

import {
  style,
} from "./styles";

type NavProps =
  NativeStackNavigationProp<
    RootStackParamList,
    "CadastrarAluno"
  >;

export default function CadastrarAluno() {
  const navigation =
    useNavigation<NavProps>();

  const [
    nome,
    setNome,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    telefone,
    setTelefone,
  ] = useState("");

  const [
    senha,
    setSenha,
  ] = useState("");

  const [
    mostrarSenha,
    setMostrarSenha,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function cadastrarAluno() {
    const nomeLimpo =
      nome.trim();

    const emailLimpo =
      email
        .trim()
        .toLowerCase();

    const telefoneLimpo =
      telefone.trim();

    if (
      !nomeLimpo ||
      !emailLimpo ||
      !senha
    ) {
      Alert.alert(
        "Atenção",
        "Preencha nome, e-mail e senha."
      );

      return;
    }

    if (
      senha.length < 6
    ) {
      Alert.alert(
        "Atenção",
        "A senha deve possuir pelo menos 6 caracteres."
      );

      return;
    }

    try {
      setLoading(
        true
      );

      console.log(
        "Chamando Edge Function criar-aluno..."
      );

      const {
        data,
        error,
      } =
        await supabase.functions.invoke(
          "criar-aluno",
          {
            body: {
              nome:
                nomeLimpo,

              email:
                emailLimpo,

              telefone:
                telefoneLimpo,

              senha,
            },
          }
        );

      console.log(
        "RETORNO FUNCTION DATA:",
        data
      );

      console.log(
        "RETORNO FUNCTION ERROR:",
        error
      );

      if (error) {
        let mensagemErro =
          error.message ||
          "Não foi possível cadastrar o aluno.";

        try {
          const context =
            (error as any)
              .context;

          console.log(
            "EDGE FUNCTION ERROR CONTEXT:",
            context
          );

          if (context) {
            const resposta =
              await context.json();

            console.log(
              "RESPOSTA DA EDGE FUNCTION:",
              resposta
            );

            if (
              resposta?.error
            ) {
              mensagemErro =
                resposta.error;
            }
          }
        } catch (
          erroContexto
        ) {
          console.log(
            "Não foi possível ler o corpo do erro:",
            erroContexto
          );
        }

        Alert.alert(
          "Erro ao cadastrar aluno",
          mensagemErro
        );

        return;
      }

      if (
        !data?.success
      ) {
        console.log(
          "FUNCTION RETORNOU SEM SUCCESS:",
          data
        );

        Alert.alert(
          "Erro ao cadastrar aluno",
          data?.error ??
            "Não foi possível cadastrar o aluno."
        );

        return;
      }

      Alert.alert(
        "Aluno cadastrado",
        `${nomeLimpo} foi cadastrado com sucesso.`,
        [
          {
            text:
              "OK",

            onPress:
              () =>
                navigation.goBack(),
          },
        ]
      );

      setNome("");
      setEmail("");
      setTelefone("");
      setSenha("");
    } catch (
      error
    ) {
      console.log(
        "ERRO INESPERADO NO CADASTRO:",
        error
      );

      Alert.alert(
        "Erro",
        "Ocorreu um erro inesperado ao cadastrar o aluno."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? 20
          : 0
      }
    >
      <ScrollView
        style={
          style.container
        }
        contentContainerStyle={[
          style.contentContainer,
          {
            paddingBottom: 140,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* VOLTAR */}

        <TouchableOpacity
          style={
            style.backButton
          }
          onPress={
            () =>
              navigation.goBack()
          }
          activeOpacity={
            0.7
          }
        >
          <Text
            style={
              style.backButtonText
            }
          >
            ‹ Voltar
          </Text>
        </TouchableOpacity>

        {/* TÍTULO */}

        <Text
          style={
            style.title
          }
        >
          Cadastrar aluno
        </Text>

        <Text
          style={
            style.subtitle
          }
        >
          Crie o acesso de um novo aluno.
        </Text>

        {/* NOME */}

        <Text
          style={
            style.label
          }
        >
          NOME
        </Text>

        <TextInput
          style={
            style.input
          }
          placeholder="Nome completo"
          value={
            nome
          }
          onChangeText={
            setNome
          }
          autoCapitalize="words"
          editable={
            !loading
          }
        />

        {/* E-MAIL */}

        <Text
          style={
            style.label
          }
        >
          E-MAIL
        </Text>

        <TextInput
          style={
            style.input
          }
          placeholder="E-mail do aluno"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={
            false
          }
          value={
            email
          }
          onChangeText={
            setEmail
          }
          editable={
            !loading
          }
        />

        {/* TELEFONE */}

        <Text
          style={
            style.label
          }
        >
          TELEFONE
        </Text>

        <TextInput
          style={
            style.input
          }
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={
            telefone
          }
          onChangeText={
            setTelefone
          }
          editable={
            !loading
          }
        />

        {/* SENHA */}

        <Text
          style={
            style.label
          }
        >
          SENHA INICIAL
        </Text>

        <View
          style={[
            style.input,
            {
              flexDirection:
                "row",

              alignItems:
                "center",

              paddingRight: 4,
            },
          ]}
        >
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
            }}
            placeholder="Senha inicial"
            placeholderTextColor="#999"
            secureTextEntry={
              !mostrarSenha
            }
            value={
              senha
            }
            onChangeText={
              setSenha
            }
            autoCapitalize="none"
            autoCorrect={
              false
            }
            editable={
              !loading
            }
            returnKeyType="done"
          />

          <TouchableOpacity
            onPress={
              () =>
                setMostrarSenha(
                  (
                    valorAtual
                  ) =>
                    !valorAtual
                )
            }
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
            disabled={
              loading
            }
          >
            <Ionicons
              name={
                mostrarSenha
                  ? "eye-outline"
                  : "eye-off-outline"
              }
              size={
                22
              }
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* BOTÃO */}

        <TouchableOpacity
          style={
            style.button
          }
          onPress={
            cadastrarAluno
          }
          disabled={
            loading
          }
          activeOpacity={
            0.7
          }
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={
                style.buttonText
              }
            >
              CADASTRAR ALUNO
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}