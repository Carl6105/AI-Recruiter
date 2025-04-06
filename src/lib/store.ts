import { create } from 'zustand';

interface JobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  qualifications: string[];
  responsibilities: string[];
  status: 'active' | 'closed';
  createdAt: Date;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  resumeUrl: string;
  education: string[];
  experience: string[];
  skills: string[];
  certifications: string[];
  matchScore: number;
  matchDetails: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    overallMatch: number;
  };
  status: 'pending' | 'shortlisted' | 'rejected' | 'interviewed';
  appliedFor: string;
  interviewSchedule?: {
    date: Date;
    time: string;
    format: 'virtual' | 'in-person';
    status: 'scheduled' | 'completed' | 'cancelled';
  };
  createdAt: Date;
}

interface AppState {
  jobDescriptions: JobDescription[];
  candidates: Candidate[];
  settings: {
    matchThreshold: number;
    autoShortlist: boolean;
    emailNotifications: boolean;
    interviewDuration: number;
  };
  addJobDescription: (jd: Omit<JobDescription, 'id' | 'createdAt'>) => void;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'createdAt'>) => void;
  updateCandidateStatus: (id: string, status: Candidate['status']) => void;
  scheduleInterview: (
    candidateId: string,
    schedule: Candidate['interviewSchedule']
  ) => void;
  updateSettings: (settings: Partial<AppState['settings']>) => void;
}

export const useStore = create<AppState>((set) => ({
  jobDescriptions: [],
  candidates: [],
  settings: {
    matchThreshold: 80,
    autoShortlist: true,
    emailNotifications: true,
    interviewDuration: 60,
  },
  addJobDescription: (jd) => 
    set((state) => ({
      jobDescriptions: [
        ...state.jobDescriptions,
        {
          ...jd,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date(),
        },
      ],
    })),
  addCandidate: (candidate) =>
    set((state) => {
      const newCandidate = {
        ...candidate,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
      };

      // Auto-shortlist if score is above threshold
      if (
        state.settings.autoShortlist &&
        newCandidate.matchScore >= state.settings.matchThreshold
      ) {
        newCandidate.status = 'shortlisted';
      }

      return {
        candidates: [...state.candidates, newCandidate],
      };
    }),
  updateCandidateStatus: (id, status) =>
    set((state) => ({
      candidates: state.candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status } : candidate
      ),
    })),
  scheduleInterview: (candidateId, schedule) =>
    set((state) => ({
      candidates: state.candidates.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, interviewSchedule: schedule }
          : candidate
      ),
    })),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));