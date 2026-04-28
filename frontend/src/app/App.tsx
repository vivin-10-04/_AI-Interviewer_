import { useState } from 'react';
import { Upload } from 'lucide-react';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import TransformationSection from './components/TransformationSection';
import InterviewModal from './components/interviewmodal';

export default function App() {
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showInterview, setShowInterview] = useState(false);   // ← new

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedResume(e.target.files[0]);
    }
  };

  const handleStartInterview = () => {
    if (uploadedResume) {
      setShowInterview(true);   // ← open interview modal directly
    } else {
      setShowUploadModal(true);
    }
  };

  return (
    <div className="size-full bg-white">
      <Hero
        onStartInterview={handleStartInterview}
        uploadedResume={uploadedResume}
        onShowUpload={() => setShowUploadModal(true)}
      />
      <ProcessSection />
      <TransformationSection />

      {/* Interview Modal */}
      <InterviewModal
        isOpen={showInterview}
        onClose={() => setShowInterview(false)}
        resume={uploadedResume}
      />

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-[#d1d1d1] p-12 max-w-md w-full mx-4" style={{borderWidth: '1px'}}>
            <h3 className="mb-6" style={{fontWeight: 700, fontSize: '24px', letterSpacing: '-0.02em'}}>Upload Your Resume</h3>
            <p className="mb-8 text-[#6b6b6b]" style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '14px'}}>
              Upload your resume to personalize your interview experience
            </p>

            <label className="border border-dashed border-[#d1d1d1] p-8 flex flex-col items-center cursor-pointer transition-colors hover:border-[#FF5733] hover:bg-[#f5f5f5]" style={{borderWidth: '2px'}}>
              <Upload className="w-12 h-12 mb-4 text-[#6b6b6b]" />
              <span className="text-center" style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '14px'}}>
                {uploadedResume ? uploadedResume.name : 'Click to upload PDF'}
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 border border-[#d1d1d1] bg-white text-[#2b2d31] px-6 py-4 transition-colors hover:bg-[#f5f5f5]"
                style={{fontWeight: 700, letterSpacing: '-0.01em', borderWidth: '1px'}}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  if (uploadedResume) setShowInterview(true);  // ← open interview after upload
                }}
                disabled={!uploadedResume}
                className="flex-1 bg-[#FF5733] text-white px-6 py-4 transition-all hover:bg-[#e64d2b] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{fontWeight: 700, letterSpacing: '-0.01em'}}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}