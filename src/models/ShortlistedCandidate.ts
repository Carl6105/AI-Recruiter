import mongoose from 'mongoose';

const ShortlistedCandidateSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  matchScore: Number,
  shortlistedDate: { type: Date, default: Date.now }
});

export const ShortlistedCandidate = mongoose.model('ShortlistedCandidate', ShortlistedCandidateSchema);