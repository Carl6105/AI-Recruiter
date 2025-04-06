import React, { useState } from 'react';

const jobPositions = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'Marketing Specialist',
  'UX Designer',
  'Business Analyst'
];

const CVUploadForm: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedPosition) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobPosition', selectedPosition);

    try {
      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select 
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        required
      >
        <option value="">Select Job Position</option>
        {jobPositions.map((position) => (
          <option key={position} value={position}>{position}</option>
        ))}
      </select>

      <input
        type="file"
        accept=".txt,.docx,.pdf"
        onChange={handleFileUpload}
        required
      />
      
      <button type="submit">Upload CV</button>
    </form>
  );
};

export default CVUploadForm;