import React from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const scale = Math.min(width / 393, 1.15);
const s = (value: number) => Math.round(value * scale);

function Shadow({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.shadow, style]}>{children}</View>;
}

function RecentTrip({
  title,
  subtitle,
  time,
  type,
}: {
  title: string;
  subtitle: string;
  time: string;
  type: 'home' | 'car';
}) {
  return (
    <Shadow style={styles.tripCard}>
      <View style={styles.tripIcon}>
        <Text style={styles.tripIconText}>{type === 'home' ? '⌂' : '▣'}</Text>
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

          {/* Placeholder: replace with the travel/map illustration asset later. */}
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapShape}>
              <View style={[styles.pin, styles.pinTop]} />
              <View style={[styles.pin, styles.pinBottom]} />
              <View style={styles.routeLine} />
            </View>
          </View>
        </View>

        <Shadow style={styles.routeCard}>
          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Text style={styles.locationIcon}>▶</Text>
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>De onde você está saindo?</Text>
              <Text style={styles.locationValue}>Curitiba, PR</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationRow}>
            <View style={styles.locationIconWrap}>
              <Text style={styles.locationIcon}>⌖</Text>
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
          type="home"
        />
        <RecentTrip
          title="Beto Carreiro"
          subtitle="Santa Catarina"
          time="2:30 h"
          type="car"
        />

        <Pressable style={styles.planButton} accessibilityRole="button">
          <Text style={styles.planButtonText}>Planejar minha viagem</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} accessibilityLabel="Início">
          <Text style={styles.navIcon}>⌂</Text>
        </Pressable>
        <Pressable style={styles.navItem} accessibilityLabel="Viagens">
          <Text style={[styles.navIcon, styles.activeNavIcon]}>▰</Text>
        </Pressable>
        <View style={styles.centerNavSpace} />
        <Pressable style={styles.navItem} accessibilityLabel="Salvos">
          <Text style={styles.navIcon}>▾</Text>
        </Pressable>
        <Pressable style={styles.navItem} accessibilityLabel="Comunidade">
          <Text style={styles.navIcon}>♟</Text>
        </Pressable>

        <Pressable style={styles.centerButton} accessibilityLabel="Carregamento">
          <Text style={styles.centerButtonIcon}>ϟ</Text>
        </Pressable>
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
    transform: [{ rotate: '-7deg' }],
  },
  mapShape: {
    width: s(145),
    height: s(94),
    borderRadius: s(8),
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: s(3),
    borderColor: '#EDE5F5',
    transform: [{ skewX: '-10deg' }],
    position: 'relative',
  },
  pin: {
    position: 'absolute',
    width: s(17),
    height: s(17),
    borderRadius: s(9),
    backgroundColor: '#7D38E8',
    borderWidth: s(3),
    borderColor: '#FFFFFF',
    zIndex: 3,
  },
  pinTop: {
    top: s(-12),
    right: s(30),
  },
  pinBottom: {
    bottom: s(-8),
    left: s(43),
  },
  routeLine: {
    position: 'absolute',
    width: s(72),
    height: s(4),
    backgroundColor: '#7430DD',
    borderRadius: s(2),
    right: s(20),
    top: s(31),
    transform: [{ rotate: '35deg' }],
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
  locationIcon: {
    color: '#251039',
    fontSize: s(20),
    fontFamily: 'Karla_700Bold',
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
  tripIconText: {
    color: '#271039',
    fontSize: s(20),
    fontFamily: 'Karla_700Bold',
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: s(89),
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(26),
    borderTopLeftRadius: s(22),
    borderTopRightRadius: s(22),
    ...(Platform.OS === 'web' ? { boxShadow: '0px -2px 8px rgba(0,0,0,0.08)' } : {}),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    color: '#777777',
    fontSize: s(27),
    fontFamily: 'Karla_700Bold',
  },
  activeNavIcon: {
    color: '#210C33',
  },
  centerNavSpace: {
    width: s(82),
  },
  centerButton: {
    position: 'absolute',
    left: '50%',
    top: s(-19),
    marginLeft: s(-30),
    width: s(60),
    height: s(60),
    borderRadius: s(30),
    backgroundColor: '#210C33',
    borderWidth: s(7),
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: s(3) },
    shadowOpacity: 0.2,
    shadowRadius: s(4),
    elevation: 6,
  },
  centerButtonIcon: {
    color: '#FFFFFF',
    fontSize: s(30),
    lineHeight: s(32),
    fontFamily: 'Karla_800ExtraBold',
  },
});
