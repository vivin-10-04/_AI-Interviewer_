const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface InterviewMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface InterviewResponse {
  transcript: string;
  reply: string;
  question_type?: string;
  topic?: string;
}

class InterviewService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async sendInterviewAnswer(
    audioBlob: Blob,
    history: InterviewMessage[],
    resume: File | null,
    candidateId?: string
  ): Promise<InterviewResponse> {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'answer.webm');
      formData.append('history', JSON.stringify(history));
      
      if (resume) {
        formData.append('resume', resume);
      }

      if (candidateId) {
        formData.append('candidate_id', candidateId);
      }

      const response = await fetch(`${this.baseURL}/interview`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          detail: 'Request failed' 
        }));
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async getCandidateTopics(candidateId: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/candidate/${candidateId}/topics`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch topics');
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch topics');
    }
  }

  async getPreviousQuestions(candidateId: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/candidate/${candidateId}/questions`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch previous questions');
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch previous questions');
    }
  }
}

export const interviewService = new InterviewService(API_BASE_URL);