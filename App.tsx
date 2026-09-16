
import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  StatusBar,
} from "expo-status-bar";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  Session,
} from "@supabase/supabase-js";

// ==========================================
// TELAS
// ==========================================

import Login from "./src/pages/login";
import Home from "./src/pages/home";

import HomeProfissional from "./src/pages/homeProfissional";
import DetalhesAluno from "./src/pages/detalhesAluno";
import CadastrarAluno from "./src/pages/cadastrarAluno";
import EditarAluno from "./src/pages/editarAluno";

import PrimeiroAcesso from "./src/pages/primeiroAcesso";

import Checkin from "./src/pages/checkin";
import checkinPersonal from "./src/pages/checkinPersonal";
import checkinsemPersonal from "./src/pages/checkinsemPersonal";

import Corpo from "./src/pages/corpo";
import Historico from "./src/pages/historicoPeso";
import Pagamento from "./src/pages/pagamento";

import Splash from "./src/pages/splash";

// ==========================================
// SUPABASE
// ==========================================

import {
  supabase,
} from "./src/lib/supabase";

// ==========================================
// ROTAS
// ==========================================

export type RootStackParamList = {
  Login: undefined;

  Home: undefined;

  HomeProfissional: undefined;

  PrimeiroAcesso: undefined;

  DetalhesAluno: {
    alunoId: string;
  };

  EditarAluno: {
    alunoId: string;
  };

  CadastrarAluno: undefined;

  Checkin: undefined;

  checkinPersonal: undefined;

  checkinsemPersonal: undefined;

  Corpo: undefined;

  Historico: undefined;

  Pagamento: undefined;
};

const Stack =
  createNativeStackNavigator<
    RootStackParamList
  >();

// ==========================================
// TIPO DE USUÁRIO
// ==========================================

type TipoUsuario =
  | "aluno"
  | "profissional"
  | null;

// ==========================================
// APP
// ==========================================

export default function App() {
  // ========================================
  // SESSÃO
  // ========================================

  const [
    session,
    setSession,
  ] =
    useState<Session | null>(
      null
    );

  // ========================================
  // TIPO DO USUÁRIO
  // ========================================

  const [
    tipoUsuario,
    setTipoUsuario,
  ] =
    useState<TipoUsuario>(
      null
    );

  // ========================================
  // PRIMEIRO ACESSO
  // ========================================

  const [
    precisaTrocarSenha,
    setPrecisaTrocarSenha,
  ] =
    useState(false);

  // ========================================
  // LOADING
  // ========================================

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  // ========================================
  // SPLASH
  // ========================================

  const [
    splashFinalizada,
    setSplashFinalizada,
  ] =
    useState(false);

  // ========================================
  // TEMPO DA SPLASH
  // ========================================

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setSplashFinalizada(
          true
        );
      }, 1800);

    return () =>
      clearTimeout(timer);
  }, []);

  // ==========================================
  // CARREGA O PERFIL DO USUÁRIO
  // ==========================================

  async function carregarPerfilUsuario(
    userId: string
  ) {
    try {
      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select(
            "tipo, precisa_trocar_senha"
          )
          .eq(
            "id",
            userId
          )
          .single();

      // ======================================
      // ERRO AO BUSCAR PERFIL
      // ======================================

      if (
        error
      ) {
        console.log(
          "Erro ao buscar perfil do usuário:",
          error
        );

        console.log(
          "ID do usuário que falhou:",
          userId
        );

        // IMPORTANTE:
        // Não fazemos signOut aqui.
        //
        // Se a consulta ao perfil falhar,
        // não devemos destruir a sessão
        // automaticamente.

        setTipoUsuario(
          null
        );

        setPrecisaTrocarSenha(
          false
        );

        return;
      }

      // ======================================
      // PERFIL ENCONTRADO
      // ======================================

      console.log(
        "Perfil carregado:",
        data
      );

      console.log(
        "TIPO DO USUÁRIO:",
        data.tipo
      );

      console.log(
        "PRECISA TROCAR SENHA:",
        data.precisa_trocar_senha
      );

      setTipoUsuario(
        data.tipo as TipoUsuario
      );

      setPrecisaTrocarSenha(
        data.precisa_trocar_senha ===
          true
      );
    } catch (
      error
    ) {
      console.log(
        "Erro inesperado ao carregar perfil:",
        error
      );

      console.log(
        "ID do usuário:",
        userId
      );

      // Não fazemos signOut aqui.
      //
      // Mantemos a sessão e deixamos o
      // aplicativo identificar o problema
      // através dos logs.

      setTipoUsuario(
        null
      );

      setPrecisaTrocarSenha(
        false
      );
    }
  }

  // ==========================================
  // CARREGA A SESSÃO INICIAL
  // ==========================================

  useEffect(() => {
    let ativo =
      true;

    async function carregarSessao() {
      try {
        setLoading(
          true
        );

        const {
          data: {
            session:
              sessaoAtual,
          },
          error,
        } =
          await supabase.auth.getSession();

        if (
          !ativo
        ) {
          return;
        }

        // ====================================
        // ERRO AO CARREGAR SESSÃO
        // ====================================

        if (
          error
        ) {
          console.log(
            "Erro ao carregar sessão:",
            error
          );

          setSession(
            null
          );

          setTipoUsuario(
            null
          );

          setPrecisaTrocarSenha(
            false
          );

          return;
        }

        // ====================================
        // SESSÃO ENCONTRADA
        // ====================================

        console.log(
          "Sessão inicial:",
          sessaoAtual
            ? "USUÁRIO AUTENTICADO"
            : "NENHUMA SESSÃO"
        );

        setSession(
          sessaoAtual
        );

        if (
          sessaoAtual?.user
        ) {
          await carregarPerfilUsuario(
            sessaoAtual.user.id
          );
        } else {
          setTipoUsuario(
            null
          );

          setPrecisaTrocarSenha(
            false
          );
        }
      } catch (
        error
      ) {
        console.log(
          "Erro inesperado ao carregar sessão:",
          error
        );

        if (
          ativo
        ) {
          setSession(
            null
          );

          setTipoUsuario(
            null
          );

          setPrecisaTrocarSenha(
            false
          );
        }
      } finally {
        if (
          ativo
        ) {
          setLoading(
            false
          );
        }
      }
    }

    // ========================================
    // CARREGA SESSÃO
    // ========================================

    carregarSessao();

    // ========================================
    // ESCUTA LOGIN / LOGOUT / REFRESH
    // ========================================

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (
          event,
          novaSession
        ) => {
          console.log(
            "Evento Auth:",
            event
          );

          if (
            !ativo
          ) {
            return;
          }

          // ==================================
          // USUÁRIO DESLOGADO
          // ==================================

          if (
            !novaSession
          ) {
            setSession(
              null
            );

            setTipoUsuario(
              null
            );

            setPrecisaTrocarSenha(
              false
            );

            setLoading(
              false
            );

            return;
          }

          // ==================================
          // USUÁRIO AUTENTICADO
          // ==================================

          setSession(
            novaSession
          );

          setLoading(
            true
          );

          // IMPORTANTE:
          // Não usamos "await" diretamente
          // dentro do callback do
          // onAuthStateChange.
          //
          // O carregamento do perfil acontece
          // depois que o callback termina.

          setTimeout(() => {
            if (
              !ativo
            ) {
              return;
            }

            carregarPerfilUsuario(
              novaSession.user.id
            )
              .finally(() => {
                if (
                  ativo
                ) {
                  setLoading(
                    false
                  );
                }
              });
          }, 0);
        }
      );

    // ========================================
    // LIMPEZA
    // ========================================

    return () => {
      ativo =
        false;

      subscription.unsubscribe();
    };
  }, []);

  // ==========================================
  // SPLASH SCREEN
  // ==========================================

  if (
    !splashFinalizada
  ) {
    return (
      <Splash />
    );
  }

  // ==========================================
  // LOADING GLOBAL
  // ==========================================

  if (
    loading
  ) {
    return (
      <View
        style={{
          flex: 1,

          justifyContent:
            "center",

          alignItems:
            "center",

          backgroundColor:
            "#6C63FF",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
        />
      </View>
    );
  }

  // ==========================================
  // PROTEÇÃO CONTRA NAVIGATOR SEM TELAS
  // ==========================================

  const perfilCarregado =
    !session ||
    tipoUsuario !==
      null;

  if (
    !perfilCarregado
  ) {
    return (
      <View
        style={{
          flex: 1,

          justifyContent:
            "center",

          alignItems:
            "center",

          backgroundColor:
            "#6C63FF",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
        />
      </View>
    );
  }

  // ==========================================
  // NAVEGAÇÃO
  // ==========================================

  return (
    <NavigationContainer>
      <StatusBar
        style="light"
      />

      <Stack.Navigator
        screenOptions={{
          headerShown:
            false,
        }}
      >

        {/* ================================= */}
        {/* NÃO AUTENTICADO */}
        {/* ================================= */}

        {!session && (
          <Stack.Screen
            name="Login"
            component={
              Login
            }
          />
        )}

        {/* ================================= */}
        {/* PRIMEIRO ACESSO */}
        {/* ================================= */}

        {session &&
          precisaTrocarSenha && (
            <Stack.Screen
              name="PrimeiroAcesso"
              component={
                PrimeiroAcesso
              }
            />
        )}

        
        {/* ALUNO - ACESSO NORMAL */}
        {/* ================================= */}

        {session &&
          tipoUsuario ===
            "aluno" &&
          !precisaTrocarSenha && (
            <>
              <Stack.Screen
                name="Home"
                component={
                  Home
                }
              />

              <Stack.Screen
                name="Checkin"
                component={
                  Checkin
                }
              />

              <Stack.Screen
                name="checkinPersonal"
                component={
                  checkinPersonal
                }
              />

              <Stack.Screen
                name="checkinsemPersonal"
                component={
                  checkinsemPersonal
                }
              />

              <Stack.Screen
                name="Corpo"
                component={
                  Corpo
                }
              />

              <Stack.Screen
                name="Historico"
                component={
                  Historico
                }
              />

              <Stack.Screen
                name="Pagamento"
                component={
                  Pagamento
                }
              />
            </>
          )}

       
        
       

        {session &&
          tipoUsuario ===
            "profissional" &&
          !precisaTrocarSenha && (
            <>
              <Stack.Screen
                name="HomeProfissional"
                component={
                  HomeProfissional
                }
              />

              <Stack.Screen
                name="CadastrarAluno"
                component={
                  CadastrarAluno
                }
              />

              <Stack.Screen
                name="DetalhesAluno"
                component={
                  DetalhesAluno
                }
              />

              <Stack.Screen
                name="EditarAluno"
                component={
                  EditarAluno
                }
              />
            </>
          )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

