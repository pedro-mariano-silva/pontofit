import React, {
  useEffect,
  useState,
} from "react";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
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

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  style,
} from "./styles";

import Logo from "../../img/logo.png";

import {
  supabase,
} from "../../lib/supabase";

import {
  RootStackParamList,
} from "../../../App";

type NavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    "Login"
  >;

const CHAVE_EMAIL =
  "@pontofitt_email_lembrado";

export default function Login() {
  const navigation =
    useNavigation<NavigationProp>();

  const [
    user,
    setUser,
  ] =
    useState("");

  const [
    password,
    setPassword,
  ] =
    useState("");

  // true = senha visível
  // false = senha oculta
  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false);

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    lembrarAcesso,
    setLembrarAcesso,
  ] =
    useState(false);

  // ==========================================
  // CARREGAR E-MAIL LEMBRADO
  // ==========================================

  useEffect(() => {
    async function carregarEmailLembrado() {
      try {
        const emailSalvo =
          await AsyncStorage.getItem(
            CHAVE_EMAIL
          );

        if (emailSalvo) {
          setUser(
            emailSalvo
          );

          setLembrarAcesso(
            true
          );
        }
      } catch (error) {
        console.log(
          "Erro ao carregar e-mail salvo:",
          error
        );
      }
    }

    carregarEmailLembrado();
  }, []);

  // ==========================================
  // LOGIN
  // ==========================================

  async function getLogin() {
    const emailLimpo =
      user
        .trim()
        .toLowerCase();

    if (
      !emailLimpo ||
      !password
    ) {
      Alert.alert(
        "Atenção",
        "Informe seu e-mail e senha."
      );

      return;
    }

    try {
      setLoading(
        true
      );

      // ======================================
      // 1. AUTENTICAÇÃO
      // ======================================

      const {
        error,
      } =
        await supabase.auth.signInWithPassword({
          email:
            emailLimpo,

          password,
        });

      if (error) {
        console.log(
          "Erro de login:",
          error
        );

        Alert.alert(
          "Não foi possível entrar",
          "E-mail ou senha inválidos."
        );

        return;
      }

      // ======================================
      // 2. IDENTIFICA USUÁRIO LOGADO
      // ======================================

      const {
        data: {
          user:
            usuarioLogado,
        },
        error:
          usuarioError,
      } =
        await supabase.auth.getUser();

      if (
        usuarioError ||
        !usuarioLogado
      ) {
        console.log(
          "Erro ao identificar usuário:",
          usuarioError
        );

        Alert.alert(
          "Erro",
          "Não foi possível identificar o usuário."
        );

        return;
      }

      console.log(
        "USUÁRIO LOGADO:",
        usuarioLogado.id
      );

      // ======================================
      // 3. BUSCA O PROFILE
      // ======================================

      const {
        data: profile,
        error:
          profileError,
      } =
        await supabase
          .from("profiles")
          .select(
            "tipo, precisa_trocar_senha"
          )
          .eq(
            "id",
            usuarioLogado.id
          )
          .single();

      console.log(
        "PROFILE:",
        profile
      );

      console.log(
        "ERRO PROFILE:",
        profileError
      );

      if (
        profileError ||
        !profile
      ) {
        Alert.alert(
          "Erro",
          "Não foi possível carregar seu perfil."
        );

        return;
      }

      // ======================================
      // 4. PRIMEIRO ACESSO DO PROFISSIONAL
      // ======================================

      if (
        profile.tipo ===
          "profissional" &&
        profile.precisa_trocar_senha ===
          true
      ) {
        console.log(
          "PRIMEIRO ACESSO DO PROFISSIONAL"
        );

        if (
          lembrarAcesso
        ) {
          await AsyncStorage.setItem(
            CHAVE_EMAIL,
            emailLimpo
          );
        } else {
          await AsyncStorage.removeItem(
            CHAVE_EMAIL
          );
        }

        // O App.tsx detectará automaticamente
        // que o profissional precisa trocar
        // a senha e exibirá a tela PrimeiroAcesso.

        return;
      }

      // ======================================
      // 5. LEMBRAR ACESSO
      // ======================================

      if (
        lembrarAcesso
      ) {
        await AsyncStorage.setItem(
          CHAVE_EMAIL,
          emailLimpo
        );
      } else {
        await AsyncStorage.removeItem(
          CHAVE_EMAIL
        );
      }

      console.log(
        "LOGIN REALIZADO COM SUCESSO"
      );

    } catch (error) {
      console.log(
        "Erro inesperado:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível realizar o login. Tente novamente."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  // ==========================================
  // TELA
  // ==========================================

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
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={
            style.container
          }
        >

          {/* ==================================
              TOPO
          ================================== */}

          <View
            style={
              style.boxTop
            }
          >
            <Image
              source={
                Logo
              }
              style={
                style.logo
              }
            />

            <Text
              style={
                style.text
              }
            >
              Login
            </Text>
          </View>

          {/* ==================================
              CAMPOS
          ================================== */}

          <View
            style={
              style.boxMid
            }
          >

            {/* E-MAIL */}

            <Text
              style={
                style.titleInput
              }
            >
              E-MAIL
            </Text>

            <View
              style={
                style.boxInput
              }
            >
              <TextInput
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999999"
                value={
                  user
                }
                onChangeText={
                  setUser
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={
                  false
                }
                editable={
                  !loading
                }
                selectionColor="#222222"
                cursorColor="#222222"
                underlineColorAndroid="transparent"
                style={{
                  flex: 1,

                  textAlignVertical:
                    "center",

                  fontSize:
                    16,

                  color:
                    "#222222",

                  backgroundColor:
                    "transparent",
                }}
              />
            </View>

            {/* SENHA */}

            <Text
              style={
                style.titleInput
              }
            >
              SENHA
            </Text>

            <View
              style={[
                style.boxInput,
                {
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  backgroundColor:
                    "#FFFFFF",
                },
              ]}
            >

              <TextInput
                placeholder="Digite sua senha"
                placeholderTextColor="#999999"
                value={
                  password
                }
                onChangeText={
                  setPassword
                }

                // false = oculta
                // true = visível
                secureTextEntry={
                  !showPassword
                }

                autoCapitalize="none"

                autoCorrect={
                  false
                }

                editable={
                  !loading
                }

                textContentType="password"

                autoComplete="password"

                selectionColor="#222222"

                cursorColor="#222222"

                underlineColorAndroid="transparent"

                style={{
                  flex: 1,

                  textAlignVertical:
                    "center",

                  fontSize:
                    16,

                  paddingLeft:
                    10,

                  paddingRight:
                    5,

                  color:
                    "#222222",

                  backgroundColor:
                    "transparent",

                  includeFontPadding:
                    true,
                }}
              />

              {/* MOSTRAR / OCULTAR SENHA */}

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    valorAtual =>
                      !valorAtual
                  )
                }
                style={{
                  paddingHorizontal:
                    10,

                  paddingVertical:
                    8,
                }}
                disabled={
                  loading
                }
                activeOpacity={
                  0.7
                }
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-outline"
                      : "eye-off-outline"
                  }
                  size={
                    22
                  }
                  color="#555555"
                />
              </TouchableOpacity>

            </View>

            {/* =================================
                LEMBRAR ACESSO
            ================================= */}

            <TouchableOpacity
              style={
                style.rememberContainer
              }
              activeOpacity={
                0.7
              }
              disabled={
                loading
              }
              onPress={() =>
                setLembrarAcesso(
                  valorAtual =>
                    !valorAtual
                )
              }
            >
              <View
                style={[
                  style.checkbox,

                  lembrarAcesso &&
                    style.checkboxChecked,
                ]}
              >
                {lembrarAcesso && (
                  <Ionicons
                    name="checkmark"
                    size={
                      17
                    }
                    color="#FFFFFF"
                  />
                )}
              </View>

              <Text
                style={
                  style.rememberText
                }
              >
                Lembrar meu acesso
              </Text>
            </TouchableOpacity>

          </View>

          {/* ==================================
              BOTÃO ENTRAR
          ================================== */}

          <View
            style={
              style.boxButton
            }
          >
            <TouchableOpacity
              style={
                style.button
              }
              onPress={
                getLogin
              }
              disabled={
                loading
              }
              activeOpacity={
                0.7
              }
            >
              {loading ? (
                <ActivityIndicator
                  color="#FFFFFF"
                />
              ) : (
                <Text
                  style={
                    style.buttonLogar
                  }
                >
                  Entrar
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ==================================
              RODAPÉ
          ================================== */}

          <Text
            style={
              style.textRodape
            }
          >
            PontoFit • DESENVOLVIDO POR PEDRO MARIANOsss
          </Text>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}