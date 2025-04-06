import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FileText, Mail, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

const Shortlisted = () => {
  const { candidates, jobDescriptions, updateCandidateStatus } = useStore();

  const shortlistedCandidates = candidates.filter(
    (candidate) => candidate.status === 'shortlisted'
  );

  const getJobTitle = (jobId: string) => {
    const job = jobDescriptions.find((jd) => jd.id === jobId);
    return job ? `${job.title} at ${job.company}` : 'Unknown Position';
  };

  const scheduleInterview = (candidateId: string) => {
    // In a real application, this would open a modal or navigate to a scheduling page
    alert('Interview scheduling functionality will be implemented soon!');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Shortlisted Candidates</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {shortlistedCandidates.length} candidates
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {shortlistedCandidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {candidate.name}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{candidate.email}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{getJobTitle(candidate.appliedFor)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(candidate.createdAt, 'MMM d, yyyy')}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">{candidate.matchScore}% Match</span>
                </div>
                <Button
                  onClick={() => scheduleInterview(candidate.id)}
                  className="whitespace-nowrap"
                >
                  Schedule Interview
                </Button>
              </div>
            </div>
          </motion.div>
        ))}

        {shortlistedCandidates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No shortlisted candidates yet
            </h3>
            <p className="text-gray-500">
              Candidates with high match scores will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortlisted;