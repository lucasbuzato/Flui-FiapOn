import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('window');
const wp = (value: number) => (value / 100) * W;
const hp = (value: number) => (value / 100) * H;
const scale = Math.min(W / 393, 1.15);
const s = (value: number) => Math.round(value * scale);

/*
 * ASSETS DA TELA DE VIAGEM
 *
 * Coloque os 4 arquivos fornecidos nesta conversa em:
 * assets/images/viagem/
 *
 * Nomes esperados:
 * - Data Transfer.png       -> botão de inverter origem/destino
 * - Paper Plane.png         -> origem
 * - location-pin.png        -> destino / viagens
 * - travel-map.png          -> ilustração principal
 *
 * O restante da tela reutiliza os assets da HomeScreen, principalmente a navbar.
 */
const travelMap = require('../../assets/images/viagem/travel-map.png');
const paperPlane = require('../../assets/images/viagem/Paper Plane.png');
const locationPin = require('../../assets/images/viagem/location-pin.png');
const dataTransfer = require('../../assets/images/viagem/Data Transfer.png');

// Navbar — exatamente os mesmos assets já usados na HomeScreen.
const homeIcon = require('../../assets/images/home.png');
const roadIcon = require('../../assets/images/road.png');
const bookmarkIcon = require('../../assets/images/bookmark.png');
const usersIcon = require('../../assets/images/users.png');
const lightningBolt = require('../../assets/images/lightning-bolt.png');

const NAV_BAR_HEIGHT = hp(8);
const NAV_BUTTON_SIZE = wp(14);

function Shadow({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.shadow, style]}>{children}</View>;
}

function RecentTrip({
  title,
  subtitle,
  time,
  icon,
}: {
  title: string;
  subtitle: string;
  time: string;
  icon: any;
}) {
  return (
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
  );
}

export default function ViagemScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Fundo/gradiente do topo */}
      <LinearGradient
        colors={['#210C33', '#321246', '#654477', '#BBAEC3', '#F5F5F5']}
        locations={[0, 0.28, 0.52, 0.72, 1]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.55, y: 1 }}
        style={styles.hero}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= HEADER ================= */}
        <View style={styles.heroContent}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Para onde</Text>
            <Text style={styles.heroTitle}>você vai?</Text>
            <Text style={styles.heroSubtitle}>
              Planeje sua viagem e os melhores{`\n`}pontos de recarga
            </Text>
          </View>

          <Image
            source={travelMap}
            style={styles.travelMap}
            resizeMode="contain"
          />
        </View>

        {/* ================= ORIGEM / DESTINO ================= */}
        <Shadow style={styles.routeCard}>
          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Image source={paperPlane} style={styles.paperPlaneIcon} resizeMode="contain" />
            </View>

            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>De onde você está saindo?</Text>
              <Text style={styles.locationValue}>Curitiba, PR</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Image source={locationPin} style={styles.locationPinIcon} resizeMode="contain" />
            </View>

            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>Para onde você vai?</Text>
              <Text style={styles.locationValue}>Guarulhos, SP</Text>
            </View>
          </View>

          <Pressable style={styles.swapButton} accessibilityLabel="Inverter origem e destino">
            <Image source={dataTransfer} style={styles.swapIcon} resizeMode="contain" />
          </Pressable>
        </Shadow>

        {/* ================= VIAGENS RECENTES ================= */}
        <Text style={styles.sectionTitle}>Viagens Recentes</Text>

        <RecentTrip
          title="Casa na Praia"
          subtitle="Ponta Grossa"
          time="40 min"
          icon={locationPin}
        />

        <RecentTrip
          title="Beto Carreiro"
          subtitle="Santa Catarina"
          time="2:30 h"
          icon={paperPlane}
        />

        <Pressable style={styles.planButton} accessibilityRole="button">
          <Text style={styles.planButtonText}>Planejar minha viagem</Text>
        </Pressable>
      </ScrollView>

      {/* ==========================================================
          NAVBAR — REUTILIZA A MESMA ESTRUTURA DA HOMESCREEN
         ========================================================== */}
      <View style={styles.navContainer}>
        <View style={styles.navBarBg} />

        <View style={styles.navCurveWrapper}>
          <Svg
            width={wp(44)}
            height={wp(19)}
            viewBox="0 0 167.589 72.7941"
            preserveAspectRatio="xMidYMid meet"
          >
            <Path
              d="M131.802 21.8891C110.161 29.1486 140.012 72.7941 84.5957 72.7941C29.1792 72.7941 62.4196 29.1839 39.4415 21.8891C-63.1819 -10.69 64.5698 21.8891 84.5957 21.8891C104.622 21.8891 226.9 -10.0113 131.802 21.8891Z"
              fill="#F5F5F5"
            />
          </Svg>
        </View>

        <Pressable style={styles.navCenterBtn} accessibilityLabel="Carregar">
          <Image
            source={lightningBolt}
            style={styles.navCenterIcon}
            resizeMode="contain"
            tintColor="#FFFFFF"
          />
        </Pressable>

        <View style={styles.navTabsRow}>
          <Pressable style={styles.navTab} accessibilityLabel="Início">
            <Image source={homeIcon} style={styles.navTabIcon} resizeMode="contain" />
          </Pressable>

          <Pressable style={styles.navTab} accessibilityLabel="Viagens">
            <Image source={roadIcon} style={styles.navTabIcon} resizeMode="contain" />
          </Pressable>

          <View style={styles.navSpacer} />

          <Pressable style={styles.navTab} accessibilityLabel="Salvos">
            <Image source={bookmarkIcon} style={styles.navTabIcon} resizeMode="contain" />
          </Pressable>

          <Pressable style={styles.navTab} accessibilityLabel="Comunidade">
            <Image source={usersIcon} style={styles.navTabIcon} resizeMode="contain" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: s(390),
    borderBottomLeftRadius: s(45),
    borderBottomRightRadius: s(45),
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: s(61),
    paddingBottom: NAV_BAR_HEIGHT + s(40),
  },

  heroContent: {
    minHeight: s(172),
    paddingHorizontal: s(33),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  heroCopy: {
    paddingTop: s(8),
    zIndex: 2,
    width: s(178),
  },

  heroTitle: {
    color: '#FFFFFF',
    fontFamily: 'Karla_700Bold',
    fontSize: s(20),
    lineHeight: s(28),
    letterSpacing: 0.1,
  },

  heroSubtitle: {
    color: '#E7DEEB',
    fontFamily: 'Karla_400Regular',
    fontSize: s(12),
    lineHeight: s(18),
    marginTop: s(11),
  },

  travelMap: {
    width: s(154),
    height: s(168),
    marginTop: s(-12),
    marginRight: s(-8),
  },

  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: s(3) },
    shadowOpacity: 0.17,
    shadowRadius: s(5),
    elevation: 5,
  },

  routeCard: {
    marginHorizontal: s(33),
    marginTop: s(1),
    minHeight: s(190),
    backgroundColor: '#FFFFFF',
    borderRadius: s(16),
    paddingHorizontal: s(25),
    paddingVertical: s(14),
    position: 'relative',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: s(73),
  },

  locationIconWrap: {
    width: s(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(8),
  },

  paperPlaneIcon: {
    width: s(20),
    height: s(20),
  },

  locationPinIcon: {
    width: s(23),
    height: s(23),
  },

  locationText: {
    flex: 1,
    paddingRight: s(40),
  },

  locationLabel: {
    color: '#6C6172',
    fontFamily: 'Karla_400Regular',
    fontSize: s(11),
    lineHeight: s(14),
    marginBottom: s(6),
  },

  locationValue: {
    color: '#261038',
    fontFamily: 'Karla_700Bold',
    fontSize: s(14),
    lineHeight: s(17),
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#D7D2D9',
    marginLeft: s(1),
  },

  swapButton: {
    position: 'absolute',
    right: s(17),
    top: s(75),
    width: s(39),
    height: s(39),
    borderRadius: s(20),
    backgroundColor: '#210C33',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: s(2) },
    shadowOpacity: 0.2,
    shadowRadius: s(3),
    elevation: 3,
  },

  swapIcon: {
    width: s(20),
    height: s(20),
  },

  sectionTitle: {
    marginHorizontal: s(34),
    marginTop: s(29),
    marginBottom: s(16),
    color: '#251039',
    fontFamily: 'Karla_700Bold',
    fontSize: s(14),
    lineHeight: s(18),
  },

  tripCard: {
    marginHorizontal: s(32),
    height: s(50),
    backgroundColor: '#FFFFFF',
    borderRadius: s(13),
    marginBottom: s(22),
    paddingHorizontal: s(14),
    flexDirection: 'row',
    alignItems: 'center',
  },

  tripIcon: {
    width: s(37),
    height: s(37),
    borderRadius: s(19),
    backgroundColor: '#DCCBE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(11),
  },

  tripIconImage: {
    width: s(22),
    height: s(22),
  },

  tripInfo: {
    flex: 1,
  },

  tripTitle: {
    color: '#251039',
    fontFamily: 'Karla_700Bold',
    fontSize: s(12),
    lineHeight: s(15),
    marginBottom: s(1),
  },

  tripSubtitle: {
    color: '#756A7B',
    fontFamily: 'Karla_400Regular',
    fontSize: s(9),
    lineHeight: s(12),
  },

  tripTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: s(4),
    gap: s(4),
  },

  tripBolt: {
    width: s(12),
    height: s(12),
    tintColor: '#210C33',
  },

  tripTimeText: {
    color: '#251039',
    fontFamily: 'Karla_700Bold',
    fontSize: s(9),
    lineHeight: s(12),
  },

  planButton: {
    marginHorizontal: s(56),
    marginTop: s(7),
    height: s(58),
    borderRadius: s(14),
    backgroundColor: '#210C33',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.22,
    shadowRadius: s(5),
    elevation: 5,
  },

  planButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Karla_500Medium',
    fontSize: s(14),
    lineHeight: s(18),
  },

  /* ==================== NAVBAR — HOME ==================== */
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: NAV_BAR_HEIGHT + wp(8),
    alignItems: 'center',
  },

  navBarBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: NAV_BAR_HEIGHT,
    backgroundColor: '#E8E8E8',
  },

  navCurveWrapper: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 5,
  },

  navCenterBtn: {
    position: 'absolute',
    top: wp(2),
    alignSelf: 'center',
    width: NAV_BUTTON_SIZE,
    height: NAV_BUTTON_SIZE,
    borderRadius: NAV_BUTTON_SIZE / 2,
    backgroundColor: '#210C33',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#440769',
    shadowOffset: { width: 0, height: s(3) },
    shadowOpacity: 0.7,
    shadowRadius: s(3),
    elevation: 6,
  },

  navCenterIcon: {
    width: NAV_BUTTON_SIZE * 0.45,
    height: NAV_BUTTON_SIZE * 0.45,
  },

  navTabsRow: {
    position: 'absolute',
    bottom: hp(2),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: wp(4),
  },

  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(10),
    height: wp(10),
  },

  navTabIcon: {
    width: wp(8.5),
    height: wp(8.5),
  },

  navSpacer: {
    width: NAV_BUTTON_SIZE + wp(6),
  },
});
