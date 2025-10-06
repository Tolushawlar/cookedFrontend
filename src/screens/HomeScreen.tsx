import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Idea } from '../types';
import ApiService from '../services/api';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    const fetchedIdeas = await ApiService.getIdeas();
    setIdeas(fetchedIdeas);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadIdeas();
    setRefreshing(false);
  };

  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    const success = await ApiService.voteOnIdea({ ideaId, voteType });
    if (success) {
      await loadIdeas();
    }
  };

  const renderIdeaCard = (idea: Idea) => (
    <View key={idea._id} style={styles.ideaCard}>
      <View style={styles.ideaContent}>
        <Text style={styles.ideaTitle}>{idea.title}</Text>
        <Text style={styles.ideaVotes}>{idea.votes} votes · {idea.comments} comments</Text>
      </View>
      <View style={styles.voteButtons}>
        <TouchableOpacity
          style={[styles.voteButton, styles.upvoteButton]}
          onPress={() => handleVote(idea._id, 'up')}
        >
          <Ionicons name="arrow-up" size={16} color="#f26c0d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.voteButton, styles.downvoteButton]}
          onPress={() => handleVote(idea._id, 'down')}
        >
          <Ionicons name="arrow-down" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>cooked.business</Text>
      </View>
      
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('SubmitIdea' as never)}
        >
          <Text style={styles.submitButtonText}>Drop Your Cooked Idea 🍳</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.ideasContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {ideas.map(renderIdeaCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221710',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  submitButton: {
    backgroundColor: '#f26c0d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ideasContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  ideaCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ideaContent: {
    flex: 1,
  },
  ideaTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ideaVotes: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  voteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upvoteButton: {
    backgroundColor: 'rgba(242, 108, 13, 0.2)',
  },
  downvoteButton: {
    backgroundColor: '#374151',
  },
});