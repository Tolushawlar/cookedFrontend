import { Idea, CreateIdeaRequest, VoteRequest } from '../types';

const API_BASE_URL = process.env.API_BASE_URL;

class ApiService {
  async getIdeas(): Promise<Idea[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas`);
      if (!response.ok) throw new Error('Failed to fetch ideas');
      return await response.json();
    } catch (error) {
      console.error('Error fetching ideas:', error);
      return [];
    }
  }

  async createIdea(idea: CreateIdeaRequest): Promise<Idea | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idea),
      });
      if (!response.ok) throw new Error('Failed to create idea');
      return await response.json();
    } catch (error) {
      console.error('Error creating idea:', error);
      return null;
    }
  }

  async voteOnIdea(vote: VoteRequest): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas/${vote.ideaId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType: vote.voteType }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error voting on idea:', error);
      return false;
    }
  }
}

export default new ApiService();