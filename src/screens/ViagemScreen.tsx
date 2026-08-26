import React, { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: W, height: H } = Dimensions.get('window');
const scale = Math.min(W / 393, 1.15);
const s = (value: number) => Math.round(value * scale);
const hp = (value: number) => (value / 100) * H;

// Todos os assets específicos desta tela ficam diretamente em assets/images.
const travelMap = require('../../assets/images/travel-map.png');
const paperPlane = require('../../assets/images/Paper Plane.png');
const locationPin = require('../../assets/images/location-pin.png');
const dataTransfer = require('../../assets/images/Data Transfer.png');

// Ícones reutilizados da Home para as viagens recentes.
const homeIcon = require('../../assets/images/home.png');
const carpoolIcon = require('../../assets/images/carpool.png');
const lightningBolt = require('../../assets/images/lightning-bolt.png');

function Shadow({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.shadow, style]}>{children}</View>;
}

function RecentTrip({ title, subtitle, time, icon }: { title: string; subtitle: string; time: string; icon: any }) {
  return (
    <Pressable style={({ pressed }) => [styles.tripPressable, pressed && styles.pressed]} accessibilityRole="button">
      <Shadow style={styles.tripCard}>
        <View style={styles.tripIcon}>
          <Image source={icon} style={styles.tripIconImage} resizeMode="contain" />
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripTitle}>{title}</Text>
          <Text style={styles.tripSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.tripTime}>
          <Image source={lightningBolt} style={styles.tripBolt} resizeMode="contain" />
          <Text style={styles.tripTimeText}>{time}</Text>
        </View>
      </Shadow>
    </Pressable>
  );
}

export default function ViagemScreen() {
  const [reverse, setReverse] = useState(false);
  const [planPressed, setPlanPressed] = useState(false);

  const origin = reverse ? 'Guarulhos, SP' : 'Curitiba, PR';
  const destination = reverse ? 'Curitiba, PR' : 'Guarulhos, SP';
  const originIcon = reverse ? locationPin : paperPlane;
  const destinationIcon = reverse ? paperPlane : locationPin;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#210C33', '#2E193F', '#593B6D', '#8B6A9B', '#D2C4DC', '#F5F5F5']}
        locations={[0, 0.18, 0.34, 0.50, 0.70, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.55, y: 1 }}
        style={styles.hero}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.heroContent}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Para onde</Text>
            <Text style={styles.heroTitle}>você vai?</Text>
            <Text style={styles.heroSubtitle}>Planeje sua viagem e os melhores{`\n`}pontos de recarga</Text>
          </View>

          <Image source={travelMap} style={styles.travelMap} resizeMode="contain" />
        </View>

        <Shadow style={styles.routeCard}>
          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Image source={originIcon} style={styles.originIcon} resizeMode="contain" />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>De onde você está saindo?</Text>
              <Text style={styles.locationValue}>{origin}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Image source={destinationIcon} style={styles.destinationIcon} resizeMode="contain" />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>Para onde você vai?</Text>
              <Text style={styles.locationValue}>{destination}</Text>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [styles.swapButton, pressed && styles.swapPressed]}
            onPress={() => setReverse((value) => !value)}
            accessibilityRole="button"
            accessibilityLabel="Inverter origem e destino"
          >
            <Image source={dataTransfer} style={styles.swapIcon} resizeMode="contain" />
          </Pressable>
        </Shadow>

        <Text style={styles.sectionTitle}>Viagens Recentes</Text>

        <RecentTrip title="Casa na Praia" subtitle="Ponta Grossa" time="40 min" icon={homeIcon} />
        <RecentTrip title="Beto Carreiro" subtitle="Santa Catarina" time="2:30 h" icon={carpoolIcon} />

        <Pressable
          style={({ pressed }) => [styles.planButton, planPressed && styles.planButtonActive, pressed && styles.planButtonPressed]}
          onPressIn={() => setPlanPressed(true)}
          onPressOut={() => setPlanPressed(false)}
          accessibilityRole="button"
          accessibilityLabel="Planejar minha viagem"
        >
          <Text style={styles.planButtonText}>Planejar minha viagem</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  hero: {
    position: 'absolute', top: 0, left: 0, right: 0, height: s(410),
    borderBottomLeftRadius: s(45), borderBottomRightRadius: s(45),
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingTop: s(61), paddingBottom: hp(15) },
  heroContent: {
    height: s(155), paddingHorizontal: s(33), flexDirection: 'row', alignItems: 'flex-start',
  },
  heroCopy: { width: s(193), paddingTop: s(8), zIndex: 2 },
  heroTitle: {
    color: '#FFFFFF', fontFamily: 'Karla_700Bold', fontSize: s(20), lineHeight: s(29), letterSpacing: 0.1,
  },
  heroSubtitle: {
    color: '#E7DEEB', fontFamily: 'Karla_400Regular', fontSize: s(12), lineHeight: s(19), marginTop: s(10),
  },
  travelMap: {
    position: 'absolute', right: s(-7), top: s(-37), width: s(224), height: s(160), zIndex: 1,
  },
  shadow: {
    shadowColor: '#000000', shadowOffset: { width: 0, height: s(3) }, shadowOpacity: 0.17,
    shadowRadius: s(5), elevation: 5,
  },
  routeCard: {
    marginHorizontal: s(33), height: s(191), backgroundColor: '#FFFFFF', borderRadius: s(16),
    paddingHorizontal: s(26), paddingVertical: s(8), position: 'relative',
  },
  locationRow: { height: s(87), flexDirection: 'row', alignItems: 'center' },
  locationIconWrap: {
    width: s(29), alignItems: 'center', justifyContent: 'center', marginRight: s(8),
  },
  originIcon: { width: s(22), height: s(22) },
  destinationIcon: { width: s(24), height: s(24) },
  locationText: { flex: 1, paddingRight: s(34) },
  locationLabel: {
    color: '#6C6172', fontFamily: 'Karla_400Regular', fontSize: s(11), lineHeight: s(14), marginBottom: s(10),
  },
  locationValue: {
    color: '#261038', fontFamily: 'Karla_700Bold', fontSize: s(14), lineHeight: s(18),
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#D7D2D9', marginLeft: s(1) },
  swapButton: {
    position: 'absolute', right: s(18), top: s(76), width: s(39), height: s(39), borderRadius: s(20),
    backgroundColor: '#210C33', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000000', shadowOffset: { width: 0, height: s(2) }, shadowOpacity: 0.2,
    shadowRadius: s(3), elevation: 3,
  },
  swapPressed: { transform: [{ scale: 0.94 }] },
  swapIcon: { width: s(20), height: s(20) },
  sectionTitle: {
    marginHorizontal: s(34), marginTop: s(29), marginBottom: s(16), color: '#251039',
    fontFamily: 'Karla_700Bold', fontSize: s(14), lineHeight: s(18),
  },
  tripPressable: { marginHorizontal: s(32), marginBottom: s(31) },
  tripCard: {
    height: s(50), backgroundColor: '#FFFFFF', borderRadius: s(13), paddingHorizontal: s(14),
    flexDirection: 'row', alignItems: 'center',
  },
  pressed: { transform: [{ scale: 0.985 }] },
  tripIcon: {
    width: s(37), height: s(37), borderRadius: s(19), backgroundColor: '#DCCBE8',
    alignItems: 'center', justifyContent: 'center', marginRight: s(11),
  },
  tripIconImage: { width: s(22), height: s(22), tintColor: '#210C33' },
  tripInfo: { flex: 1 },
  tripTitle: {
    color: '#251039', fontFamily: 'Karla_700Bold', fontSize: s(12), lineHeight: s(15), marginBottom: s(1),
  },
  tripSubtitle: {
    color: '#756A7B', fontFamily: 'Karla_400Regular', fontSize: s(9), lineHeight: s(12),
  },
  tripTime: { flexDirection: 'row', alignItems: 'center', marginRight: s(4), gap: s(4) },
  tripBolt: { width: s(11), height: s(11), tintColor: '#210C33' },
  tripTimeText: {
    color: '#251039', fontFamily: 'Karla_700Bold', fontSize: s(9), lineHeight: s(12),
  },
  planButton: {
    marginHorizontal: s(56), marginTop: s(18), height: s(59), borderRadius: s(14), backgroundColor: '#210C33',
    alignItems: 'center', justifyContent: 'center', shadowColor: '#000000',
    shadowOffset: { width: 0, height: s(4) }, shadowOpacity: 0.22, shadowRadius: s(5), elevation: 5,
  },
  planButtonActive: { backgroundColor: '#32144A' },
  planButtonPressed: { transform: [{ scale: 0.985 }] },
  planButtonText: { color: '#FFFFFF', fontFamily: 'Karla_500Medium', fontSize: s(14), lineHeight: s(18) },
});
