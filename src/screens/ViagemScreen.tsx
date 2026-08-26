import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
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
const scale = Math.min(W / 393, 1.15);
const s = (value: number) => Math.round(value * scale);
const wp = (pct: number) => (pct / 100) * W;
const hp = (pct: number) => (pct / 100) * H;

// ============================================================
// ASSETS DA TELA
// ============================================================
// Navbar: reutiliza exatamente os mesmos assets da HomeScreen.
const homeIcon = require('../../assets/images/home.png');
const roadIcon = require('../../assets/images/road.png');
const bookmarkIcon = require('../../assets/images/bookmark.png');
const usersIcon = require('../../assets/images/users.png');
const lightningBolt = require('../../assets/images/lightning-bolt.png');

// Imagens específicas desta tela.
// Você pode trocar os links abaixo por assets locais quando tiver as imagens.
// Ex.: const TRAVEL_ILLUSTRATION = require('../../assets/images/viagem.png');
const TRAVEL_ILLUSTRATION_URI = 'COLOQUE_AQUI_O_LINK_DA_ILUSTRACAO_DA_VIAGEM';
const ORIGIN_ICON_URI = 'COLOQUE_AQUI_O_LINK_DO_ICONE_DE_ORIGEM';
const DESTINATION_ICON_URI = 'COLOQUE_AQUI_O_LINK_DO_ICONE_DE_DESTINO';
const HOME_TRIP_ICON_URI = 'COLOQUE_AQUI_O_LINK_DO_ICONE_DA_VIAGEM_1';
const CAR_TRIP_ICON_URI = 'COLOQUE_AQUI_O_LINK_DO_ICONE_DA_VIAGEM_2';

const NAV_BAR_HEIGHT = hp(8);
const NAV_BUTTON_SIZE = wp(14);

function Shadow({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.shadow, style]}>{children}</View>;
}

function RecentTrip({
  title,
  subtitle,
  time,
  iconUri,
}: {
  title: string;
  subtitle: string;
  time: string;
  iconUri: string;
}) {
  return (
    <Shadow style={styles.tripCard}>
      <View style={styles.tripIcon}>
        <Image
          source={{ uri: iconUri }}
          style={styles.tripIconImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.tripInfo}>
        <Text style={styles.tripTitle}>{title}</Text>
        <Text style={styles.tripSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.tripTime}>
        <Text style={styles.bolt}>ϟ</Text>
        <Text style={styles.tripTimeText}>{time}</Text>
      </View>
    </Shadow>
  );
}

export default function ViagemScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#210C33', '#321246', '#78568A', '#FFFFFF']}
        locations={[0, 0.34, 0.67, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.hero}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.heroContent}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Para onde</Text>
            <Text style={styles.heroTitle}>você vai?</Text>
            <Text style={styles.heroSubtitle}>
              Planeje sua viagem e os melhores{`\n`}pontos de recarga
            </Text>
          </View>

          {/* Imagem principal da viagem: troque TRAVEL_ILLUSTRATION_URI pelo link/asset final. */}
          <View style={styles.mapPlaceholder}>
            <Image
              source={{ uri: TRAVEL_ILLUSTRATION_URI }}
              style={styles.travelIllustration}
              resizeMode="contain"
            />
          </View>
        </View>

        <Shadow style={styles.routeCard}>
          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Image
                source={{ uri: ORIGIN_ICON_URI }}
                style={styles.locationIconImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>De onde você está saindo?</Text>
              <Text style={styles.locationValue}>Curitiba, PR</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Image
                source={{ uri: DESTINATION_ICON_URI }}
                style={styles.locationIconImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>Para onde você vai?</Text>
              <Text style={styles.locationValue}>Guarulhos, SP</Text>
            </View>
          </View>

          <Pressable style={styles.swapButton} accessibilityLabel="Inverter origem e destino">
            <Text style={styles.swapText}>↕</Text>
          </Pressable>
        </Shadow>

        <Text style={styles.sectionTitle}>Viagens Recentes</Text>

        <RecentTrip
          title="Casa na Praia"
          subtitle="Ponta Grossa"
          time="40 min"
          iconUri={HOME_TRIP_ICON_URI}
        />
        <RecentTrip
          title="Beto Carreiro"
          subtitle="Santa Catarina"
          time="2:30 h"
          iconUri={CAR_TRIP_ICON_URI}
        />

        <Pressable style={styles.planButton} accessibilityRole="button">
          <Text style={styles.planButtonText}>Planejar minha viagem</Text>
        </Pressable>
      </ScrollView>

      {/* Bottom Navigation Bar — reutilizada da HomeScreen */}
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

        <Pressable
          style={styles.navCenterBtn}
          accessibilityLabel="Carregar"
        >
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
  content: {
    paddingTop: s(64),
    paddingBottom: s(115),
  },
  heroContent: {
    minHeight: s(145),
    paddingHorizontal: s(33),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroCopy: {
    paddingTop: s(8),
    zIndex: 2,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: s(20),
    lineHeight: s(29),
    fontFamily: 'Karla_700Bold',
    letterSpacing: 0.2,
  },
  heroSubtitle: {
    color: '#E6DDEB',
    fontSize: s(13),
    lineHeight: s(20),
    fontFamily: 'Karla_400Regular',
    marginTop: s(11),
  },
  mapPlaceholder: {
    width: s(190),
    height: s(135),
    marginTop: s(-5),
    marginRight: s(-23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  travelIllustration: {
    width: '100%',
    height: '100%',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: s(3) },
    shadowOpacity: 0.18,
    shadowRadius: s(4),
    elevation: 4,
  },
  routeCard: {
    marginHorizontal: s(33),
    marginTop: s(8),
    minHeight: s(191),
    backgroundColor: '#FFFFFF',
    borderRadius: s(16),
    paddingHorizontal: s(26),
    paddingVertical: s(17),
    position: 'relative',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: s(67),
  },
  locationIconWrap: {
    width: s(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(8),
  },
  locationIconImage: {
    width: s(20),
    height: s(20),
  },
  locationText: {
    flex: 1,
  },
  locationLabel: {
    color: '#665B6D',
    fontSize: s(11),
    fontFamily: 'Karla_400Regular',
    marginBottom: s(7),
  },
  locationValue: {
    color: '#261038',
    fontSize: s(14),
    fontFamily: 'Karla_700Bold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#D8D3D9',
    marginLeft: s(1),
  },
  swapButton: {
    position: 'absolute',
    right: s(18),
    top: s(76),
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    backgroundColor: '#210C33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapText: {
    color: '#FFFFFF',
    fontSize: s(22),
    lineHeight: s(24),
    fontFamily: 'Karla_700Bold',
  },
  sectionTitle: {
    marginHorizontal: s(34),
    marginTop: s(30),
    marginBottom: s(17),
    color: '#251039',
    fontSize: s(14),
    fontFamily: 'Karla_700Bold',
  },
  tripCard: {
    marginHorizontal: s(32),
    height: s(48),
    backgroundColor: '#FFFFFF',
    borderRadius: s(13),
    marginBottom: s(31),
    paddingHorizontal: s(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripIcon: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    backgroundColor: '#D9C7E6',
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
    fontSize: s(12),
    fontFamily: 'Karla_700Bold',
    marginBottom: s(2),
  },
  tripSubtitle: {
    color: '#756A7B',
    fontSize: s(9),
    fontFamily: 'Karla_400Regular',
  },
  tripTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(4),
    marginRight: s(4),
  },
  bolt: {
    color: '#210C33',
    fontSize: s(14),
    fontFamily: 'Karla_800ExtraBold',
  },
  tripTimeText: {
    color: '#251039',
    fontSize: s(9),
    fontFamily: 'Karla_700Bold',
  },
  planButton: {
    marginHorizontal: s(56),
    marginTop: s(20),
    height: s(59),
    borderRadius: s(14),
    backgroundColor: '#210C33',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.22,
    shadowRadius: s(4),
    elevation: 5,
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: s(14),
    fontFamily: 'Karla_500Medium',
  },
  // ==================== NAVBAR ====================
  // Esta é a mesma estrutura visual usada na HomeScreen.
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
