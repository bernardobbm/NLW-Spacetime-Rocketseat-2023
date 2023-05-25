import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'nativewind';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';
import blurBg from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';
import { api } from '../src/lib/api';

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/e6da489a792a7d52fc2f',
};

export default function App() {
  const router = useRouter();

  const [hasLoadedFonts] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'e6da489a792a7d52fc2f',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  );

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', { code });

    const { token } = response.data;

    await SecureStore.setItemAsync('token', token);

    router.push('/memories');
  }

  useEffect(() => {
    // console.log(response);

    if (response?.type === 'success') {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  if (!hasLoadedFonts) return null;

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StyledStripes className="absolute bottom-20 left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-3"
          activeOpacity={0.7}
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat por Bernamassa
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}