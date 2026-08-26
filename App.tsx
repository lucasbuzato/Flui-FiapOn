import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import {
  Karla_200ExtraLight,
  Karla_300Light,
  Karla_400Regular,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold,
  Karla_800ExtraBold,
} from '@expo-google-fonts/karla';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import ViagemScreen from './src/screens/ViagemScreen';
import BottomNav, { NavTab } from './src/components/BottomNav';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Karla_200ExtraLight,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_800ExtraBold,
  });

  const [screen, setScreen] = useState<'home' | 'travel'>('home');
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);

    if (tab === 'home') {
      setScreen('home');
    } else if (tab === 'travel') {
      setScreen('travel');
    }
    // Salvos e Comunidade ainda não possuem telas.
    // Mesmo assim, o ícone fica ativo quando selecionado.
  };

  return (
    <>
      {screen === 'home' ? <HomeScreen /> : <ViagemScreen />}
      <BottomNav activeTab={activeTab} onNavigate={handleNavigate} />
    </>
  );
}
