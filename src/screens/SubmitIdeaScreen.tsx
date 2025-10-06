import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api';

export default function SubmitIdeaScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tags = ['SaaS', 'Crypto', 'AI', 'E-commerce', 'Fintech', 'Healthtech'];

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !tag) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (description.length > 140) {
      Alert.alert('Error', 'Description must be 140 characters or less');
      return;
    }

    setIsSubmitting(true);
    const idea = await ApiService.createIdea({
      title: title.trim(),
      description: description.trim(),
      tag,
    });

    setIsSubmitting(false);

    if (idea) {
      navigation.navigate('Success' as never, { idea } as never);
    } else {
      Alert.alert('Error', 'Failed to submit idea. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Drop Your Cooked Idea 🍳</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="The next big thing..."
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (140 chars)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="A quick pitch for your idea..."
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={140}
            />
            <Text style={styles.charCount}>{description.length}/140</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tag</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tag}
                onValueChange={setTag}
                style={styles.picker}
              >
                <Picker.Item label="Select a tag" value="" />
                {tags.map((tagOption) => (
                  <Picker.Item key={tagOption} label={tagOption} value={tagOption} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit 🔥'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221710',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'right',
  },
  pickerContainer: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
  },
  picker: {
    color: '#FFFFFF',
    height: 56,
  },
  submitContainer: {
    padding: 24,
    paddingTop: 32,
  },
  submitButton: {
    backgroundColor: '#f26c0d',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});