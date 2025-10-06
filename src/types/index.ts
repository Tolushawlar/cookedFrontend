export interface Idea {
  _id: string;
  title: string;
  description: string;
  tag: string;
  votes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  userVote?: 'up' | 'down' | null;
}

export interface CreateIdeaRequest {
  title: string;
  description: string;
  tag: string;
}

export interface VoteRequest {
  ideaId: string;
  voteType: 'up' | 'down';
}