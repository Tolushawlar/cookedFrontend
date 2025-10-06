import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { idea } = route.params as any;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#221710', '#1a1308']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark-circle" size={96} color="#f26c0d" />
            </View>
          </View>

          <Text style={styles.title}>Your cooked idea is live!</Text>
          <Text style={styles.ideaTitle}>{idea?.title}</Text>
          <Text style={styles.subtitle}>Let the roasting begin!</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('MainTabs' as never)}
            >
              <Text style={styles.primaryButtonText}>See in Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('SubmitIdea' as never)}
            >
              <Text style={styles.secondaryButtonText}>Add Another Idea</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Background decorations */}
        <View style={styles.decoration1} />
        <View style={styles.decoration2} />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  checkCircle: {
    backgroundColor: 'rgba(242, 108, 13, 0.2)',
    borderRadius: 60,
    padding: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  ideaTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#f26c0d',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  decoration1: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(242, 108, 13, 0.1)',
    borderRadius: 100,
  },
  decoration2: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(242, 108, 13, 0.1)',
    borderRadius: 100,
  },
});