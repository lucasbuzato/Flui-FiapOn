import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('window');
const wp = (pct: number) => (pct / 100) * W;
const hp = (pct: number) => (pct / 100) * H;

// Assets
const carImage = require('../../assets/images/car.png');
const lightningBolt = require('../../assets/images/lightning-bolt.png');
const navigationIcon = require('../../assets/images/navigation.png');
const carpoolIcon = require('../../assets/images/carpool.png');
const timeMachineIcon = require('../../assets/images/time-machine.png');
const errorIcon = require('../../assets/images/error.png');
const personIcon = require('../../assets/images/person.png');
const postoImage = require('../../assets/images/posto.png');
const forwardIcon = require('../../assets/images/forward.png');
const lightningBoltSmall = require('../../assets/images/lightning-bolt-small.png');
const roadIcon = require('../../assets/images/road.png');
const homeIcon = require('../../assets/images/home.png');
const bookmarkIcon = require('../../assets/images/bookmark.png');
const usersIcon = require('../../assets/images/users.png');
const favoriteIcon = require('../../assets/images/favorite.png');

// Cross-platform shadow
function shadow(elev: number, color = '#000000', opacity = 0.25): any {
  if (Platform.OS === 'web') {
    // Parse hex color to rgb for web boxShadow (supports both #RGB and #RRGGBB)
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { boxShadow: `0px ${elev}px ${elev * 3}px rgba(${r},${g},${b},${opacity})` };
  }
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: elev },
    shadowOpacity: opacity,
    shadowRadius: elev * 2,
    elevation: elev,
  };
}

const NAV_BAR_HEIGHT = hp(8);
const NAV_BUTTON_SIZE = wp(14);

// Battery status (single source of truth so the numeric values and the
// segmented bar visualization never drift apart)
const BATTERY_LEVEL = 76; // %
const RANGE_KM = 563;
const TOTAL_BARS = 24;
const FILLED_BARS = Math.round((BATTERY_LEVEL / 100) * TOTAL_BARS);
const DARK_BARS = Math.round(FILLED_BARS * 0.6);
const MID_BARS = FILLED_BARS - DARK_BARS;
const LIGHT_BARS = TOTAL_BARS - FILLED_BARS;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 
        GRADIENT BACKGROUND
        The original Figma SVG is an organic purple shape that:
        - Starts from top-left, extends beyond the left edge
        - Covers roughly the top 65% of the screen
        - Has a curved bottom edge (concave from right side)
        We simulate this with a rotated gradient + large borderRadius
      */}
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={['#FFFFFF', '#7E6295', '#1C0A2B']}
          locations={[0.2655, 0.386, 0.5562]}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 0.6, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.carTitle}>BYD Seal</Text>
            <Text style={styles.carSubtitle}>2024 • 12.790km</Text>
          </View>
          <TouchableOpacity style={[styles.avatarBtn, shadow(2)]} accessibilityLabel="Perfil">
            <Image source={personIcon} style={styles.avatarIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Car Image */}
        <View style={styles.carContainer}>
          <Image source={carImage} style={styles.carImg} resizeMode="contain" />
        </View>

        {/* Battery Card */}
        <View style={[styles.batteryCard, shadow(4)]}>
          <View style={styles.batteryRowLabels}>
            <Text style={styles.batteryLabel}>Nível da Bateria</Text>
            <Text style={styles.batteryLabelLight}>Quilômetros Restantes</Text>
          </View>

          <View style={styles.batteryRowValues}>
            <Text style={styles.batteryValue}>
              {BATTERY_LEVEL}
              <Text style={styles.batteryUnit}>%</Text>
            </Text>
            <Text style={styles.batteryValue}>
              {RANGE_KM}
              <Text style={styles.batteryUnit}>km</Text>
            </Text>
          </View>

          {/* Battery bars — filled count now matches BATTERY_LEVEL */}
          <View style={styles.barsRow}>
            {Array.from({ length: DARK_BARS }).map((_, i) => (
              <View key={`f${i}`} style={[styles.bar, styles.barDark]} />
            ))}
            {Array.from({ length: MID_BARS }).map((_, i) => (
              <View key={`m${i}`} style={[styles.bar, styles.barMid]} />
            ))}
            {Array.from({ length: LIGHT_BARS }).map((_, i) => (
              <View key={`e${i}`} style={[styles.bar, styles.barLight]} />
            ))}
          </View>

          <View style={styles.chargingRow}>
            <Image
              source={lightningBolt}
              style={styles.chargingIcon}
              resizeMode="contain"
              tintColor="#FFFFFF"
            />
            <Text style={styles.chargingText}>Carregamento não conectado</Text>
          </View>
        </View>

        {/* Postos Favoritos */}
        <View style={[styles.favCard, shadow(6, '#000', 0.3)]}>
          <View style={styles.favCardHeader}>
            <Text style={styles.favTitle}>Postos Favoritos</Text>
            <TouchableOpacity style={styles.favSeeAllBtn} accessibilityLabel="Ver todos">
              <Text style={styles.favSeeAll}>Ver Todos</Text>
              <Image source={forwardIcon} style={styles.favForward} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          <View style={styles.stationRow}>
            <Image source={postoImage} style={styles.stationImg} resizeMode="cover" />
            <View style={styles.stationInfo}>
              <Text style={styles.stationName}>IPIRANGA</Text>
              <Text style={styles.stationAddr}>
                Av. Silva Jardim, 2258 - Água Verde,{'\n'}Curitiba  PR, 80240-020
              </Text>
              <View style={styles.stationStatusRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Livre Agora</Text>
                </View>
                <Image source={lightningBoltSmall} style={styles.stationBolt} resizeMode="contain" />
                <Text style={styles.stationTime}>40 min</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heartBtn} accessibilityLabel="Favoritar">
              <Image source={favoriteIcon} style={styles.heartIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>Ações Rápidas</Text>
          <View style={styles.actionsRow}>
            <ActionBtn icon={navigationIcon} label={'Encontrar\nPostos'} />
            <ActionBtn icon={carpoolIcon} label={'Iniciar\nViagem'} />
            <ActionBtn icon={timeMachineIcon} label={'Histórico'} />
            <ActionBtn icon={errorIcon} label={'Relatar\nProblema'} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar with SVG notch */}
      <View style={styles.navContainer}>
        {/* Gray bar background */}
        <View style={styles.navBarBg} />

        {/* SVG curve + button from Figma - positioned behind/at center */}
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

        {/* Center floating button */}
        <TouchableOpacity
          style={[styles.navCenterBtn, shadow(3, '#440769', 0.7)]}
          accessibilityLabel="Carregar"
        >
          <Image
            source={lightningBolt}
            style={styles.navCenterIcon}
            resizeMode="contain"
            tintColor="#FFFFFF"
          />
        </TouchableOpacity>

        {/* Tab icons row */}
        <View style={styles.navTabsRow}>
          <TouchableOpacity style={styles.navTab} accessibilityLabel="Início">
            <Image source={homeIcon} style={styles.navTabIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} accessibilityLabel="Viagens">
            <Image source={roadIcon} style={styles.navTabIcon} resizeMode="contain" />
          </TouchableOpacity>
          <View style={styles.navSpacer} />
          <TouchableOpacity style={styles.navTab} accessibilityLabel="Salvos">
            <Image source={bookmarkIcon} style={styles.navTabIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} accessibilityLabel="Comunidade">
            <Image source={usersIcon} style={styles.navTabIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ActionBtn({ icon, label }: { icon: any; label: string }) {
  return (
    <TouchableOpacity
      style={[styles.actionBox, shadow(6, '#000', 0.2)]}
      accessibilityLabel={label.replace('\n', ' ')}
    >
      <Image source={icon} style={styles.actionIcon} resizeMode="contain" />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // ==================== GRADIENT ====================
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp(58),
    borderBottomRightRadius: hp(7.5),
    overflow: 'hidden',
  },

  // ==================== SCROLL ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: NAV_BAR_HEIGHT + hp(5),
  },

  // ==================== HEADER ====================
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: wp(6),
    paddingTop: hp(7),
  },
  carTitle: {
    fontFamily: 'Karla_700Bold',
    fontSize: wp(6),
    color: '#210C33',
  },
  carSubtitle: {
    fontFamily: 'Karla_400Regular',
    fontSize: wp(3.5),
    color: '#210C33',
    marginTop: hp(0.3),
  },
  avatarBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },

  // ==================== CAR ====================
  carContainer: {
    alignItems: 'center',
    marginTop: hp(1),
  },
  carImg: {
    width: wp(95),
    height: hp(24),
  },

  // ==================== BATTERY CARD ====================
  batteryCard: {
    marginHorizontal: wp(7),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    marginTop: hp(0.5),
  },
  batteryRowLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  batteryLabel: {
    fontFamily: 'Karla_500Medium',
    fontSize: wp(3),
    color: '#F6F6F6',
  },
  batteryLabelLight: {
    fontFamily: 'Karla_300Light',
    fontSize: wp(3),
    color: '#F6F6F6',
  },
  batteryRowValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.6),
    paddingHorizontal: wp(2),
  },
  batteryValue: {
    fontFamily: 'Karla_800ExtraBold',
    fontSize: wp(5.5),
    color: '#FFFFFF',
  },
  batteryUnit: {
    fontFamily: 'Karla_800ExtraBold',
    fontSize: wp(4),
    color: '#FFFFFF',
  },
  barsRow: {
    flexDirection: 'row',
    marginTop: hp(1),
    marginBottom: hp(0.8),
    paddingHorizontal: wp(1),
  },
  bar: {
    flex: 1,
    height: wp(4),
    borderRadius: 2,
    marginHorizontal: 4.5,
  },
  barDark: {
    backgroundColor: '#210C33',
  },
  barMid: {
    backgroundColor: '#584867',
  },
  barLight: {
    backgroundColor: '#DDDDDD',
  },
  chargingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  chargingIcon: {
    width: wp(3.5),
    height: wp(3.5),
  },
  chargingText: {
    fontFamily: 'Karla_200ExtraLight',
    fontSize: wp(3),
    color: '#FFFFFF',
    marginLeft: wp(1.5),
  },

  // ==================== POSTOS FAVORITOS ====================
  favCard: {
    marginHorizontal: wp(5),
    marginTop: hp(3.5),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    padding: wp(4),
  },
  favCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  favTitle: {
    fontFamily: 'Karla_600SemiBold',
    fontSize: wp(3.8),
    color: '#210C33',
  },
  favSeeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favSeeAll: {
    fontFamily: 'Karla_600SemiBold',
    fontSize: wp(3),
    color: '#210C33',
  },
  favForward: {
    width: wp(4),
    height: wp(4.5),
    marginLeft: wp(1),
  },
  stationRow: {
    flexDirection: 'row',
  },
  stationImg: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(5),
  },
  stationInfo: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: 'center',
  },
  stationName: {
    fontFamily: 'Karla_600SemiBold',
    fontSize: wp(4.2),
    color: '#210C33',
    marginBottom: hp(0.3),
  },
  stationAddr: {
    fontFamily: 'Karla_300Light',
    fontSize: wp(3),
    color: '#210C33',
    lineHeight: wp(4.2),
  },
  stationStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.8),
  },
  badge: {
    backgroundColor: '#D2FEC2',
    borderRadius: wp(2.5),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.3),
  },
  badgeText: {
    fontFamily: 'Karla_700Bold',
    fontSize: wp(2.6),
    color: '#315C2C',
  },
  stationBolt: {
    width: wp(3),
    height: wp(3),
    marginLeft: wp(2.5),
  },
  stationTime: {
    fontFamily: 'Karla_700Bold',
    fontSize: wp(2.6),
    color: '#210C33',
    marginLeft: wp(1),
  },
  heartBtn: {
    justifyContent: 'flex-start',
    paddingTop: hp(0.5),
  },
  heartIcon: {
    width: wp(4),
    height: wp(4),
  },

  // ==================== QUICK ACTIONS ====================
  actionsSection: {
    marginTop: hp(3),
    paddingHorizontal: wp(5),
  },
  actionsTitle: {
    fontFamily: 'Karla_600SemiBold',
    fontSize: wp(3.8),
    color: '#210C33',
    marginBottom: hp(1.5),
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBox: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2.5),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
  },
  actionIcon: {
    width: wp(5.5),
    height: wp(5.5),
    marginBottom: hp(0.6),
  },
  actionLabel: {
    fontFamily: 'Karla_600SemiBold',
    fontSize: wp(2.5),
    color: '#210C33',
    textAlign: 'center',
  },

  // ==================== NAVBAR ====================
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
