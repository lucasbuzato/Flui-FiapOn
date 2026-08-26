import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('window');
const wp = (pct: number) => (pct / 100) * W;
const hp = (pct: number) => (pct / 100) * H;

const NAV_BAR_HEIGHT = hp(8);
const NAV_BUTTON_SIZE = wp(14);

const lightningBolt = require('../../assets/images/lightning-bolt.png');
const roadIcon = require('../../assets/images/road.png');
const homeIcon = require('../../assets/images/home.png');
const bookmarkIcon = require('../../assets/images/bookmark.png');
const usersIcon = require('../../assets/images/users.png');

export type NavTab = 'home' | 'travel' | 'saved' | 'community';

type Props = {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
};

export default function BottomNav({ activeTab, onNavigate }: Props) {
  const renderTab = (tab: NavTab, icon: any, label: string) => (
    <Pressable
      style={({ pressed }) => [styles.navTab, pressed && styles.navTabPressed]}
      onPress={() => onNavigate(tab)}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Image
        source={icon}
        style={[styles.navTabIcon, { tintColor: activeTab === tab ? '#210C33' : '#666666' }]}
        resizeMode="contain"
      />
    </Pressable>
  );

  return (
    <View style={styles.navContainer}>
      <View style={styles.navBarBg} />
      <View style={styles.navCurveWrapper}>
        <Svg width={wp(44)} height={wp(19)} viewBox="0 0 167.589 72.7941" preserveAspectRatio="xMidYMid meet">
          <Path
            d="M131.802 21.8891C110.161 29.1486 140.012 72.7941 84.5957 72.7941C29.1792 72.7941 62.4196 29.1839 39.4415 21.8891C-63.1819 -10.69 64.5698 21.8891 84.5957 21.8891C104.622 21.8891 226.9 -10.0113 131.802 21.8891Z"
            fill="#F5F5F5"
          />
        </Svg>
      </View>

      <Pressable
        style={({ pressed }) => [styles.navCenterBtn, pressed && styles.navCenterPressed]}
        onPress={() => onNavigate(activeTab)}
        accessibilityRole="button"
        accessibilityLabel="Carregar"
      >
        <Image source={lightningBolt} style={styles.navCenterIcon} resizeMode="contain" tintColor="#FFFFFF" />
      </Pressable>

      <View style={styles.navTabsRow}>
        {renderTab('home', homeIcon, 'Início')}
        {renderTab('travel', roadIcon, 'Viagens')}
        <View style={styles.navSpacer} />
        {renderTab('saved', bookmarkIcon, 'Salvos')}
        {renderTab('community', usersIcon, 'Comunidade')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: NAV_BAR_HEIGHT + wp(8), alignItems: 'center' },
  navBarBg: { position: 'absolute', bottom: 0, left: 0, right: 0, height: NAV_BAR_HEIGHT, backgroundColor: '#E8E8E8' },
  navCurveWrapper: { position: 'absolute', top: 0, alignSelf: 'center', zIndex: 5 },
  navCenterBtn: {
    position: 'absolute', top: wp(2), alignSelf: 'center', width: NAV_BUTTON_SIZE, height: NAV_BUTTON_SIZE,
    borderRadius: NAV_BUTTON_SIZE / 2, backgroundColor: '#210C33', alignItems: 'center', justifyContent: 'center', zIndex: 10,
    shadowColor: '#440769', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.7, shadowRadius: 6, elevation: 4,
  },
  navCenterPressed: { transform: [{ scale: 0.95 }] },
  navCenterIcon: { width: NAV_BUTTON_SIZE * 0.45, height: NAV_BUTTON_SIZE * 0.45 },
  navTabsRow: {
    position: 'absolute', bottom: hp(2), left: 0, right: 0, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-around', paddingHorizontal: wp(4),
  },
  navTab: { alignItems: 'center', justifyContent: 'center', width: wp(10), height: wp(10), borderRadius: wp(5) },
  navTabPressed: { opacity: 0.65, transform: [{ scale: 0.94 }] },
  navTabIcon: { width: wp(8.5), height: wp(8.5) },
  navSpacer: { width: NAV_BUTTON_SIZE + wp(6) },
});
