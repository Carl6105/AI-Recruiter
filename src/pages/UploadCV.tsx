import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

const UploadCV = () => {
  const { jobDescriptions } = useStore();
  const addCandidate = useStore((state) => state.addCandidate);
  const [files, setFiles] = React.useState<File[]>([]);
  const [selectedJob, setSelectedJob] = React.useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length || !selectedJob) return;

    // Simulate processing each CV
    files.forEach((file) => {
      // In a real application, we would process the CV here
      addCandidate({
        name: file.name.split('.')[0], // Simple simulation
        email: `${file.name.split('.')[0]}@example.com`,
        resumeUrl: URL.createObjectURL(file),
        matchScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        status: 'pending',
        appliedFor: selectedJob,
      });
    });

    // Reset form
    setFiles([]);
    setSelectedJob('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Upload CVs</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Select Job Position</label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a position...</option>
            {jobDescriptions.map((jd) => (
              <option key={jd.id} value={jd.id}>
                {jd.title} at {jd.company}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Upload CVs</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-2">
              <Upload className="h-8 w-8 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600">
                Drag & drop files here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                Supports PDF, DOC, DOCX, and TXT files
              </p>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Selected Files</label>
            <div className="space-y-2">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={!files.length || !selectedJob}
        >
          Upload and Process CVs
        </Button>
      </form>
    </div>
  );
};

export default UploadCV;