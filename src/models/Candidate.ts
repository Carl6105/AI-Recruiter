import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  resumeText: String,
  jobPosition: String,
  matchScore: Number,
  uploadDate: { type: Date, default: Date.now }
});

export const Candidate = mongoose.model('Candidate', CandidateSchema);