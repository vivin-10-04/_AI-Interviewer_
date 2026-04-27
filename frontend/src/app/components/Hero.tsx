import { Upload } from 'lucide-react';

interface HeroProps {
  onStartInterview: () => void;
  uploadedResume: File | null;
  onShowUpload: () => void;
}

export default function Hero({ onStartInterview, uploadedResume, onShowUpload }: HeroProps) {
  return (
    <section className="border-b border-[#d1d1d1] px-6 py-32" style={{borderWidth: '1px'}}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1
            className="mb-8"
            style={{
              fontSize: '64px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#2b2d31'
            }}
          >
            Master Your<br />Technical Interviews
          </h1>

          <p
            className="mb-12 text-[#6b6b6b] max-w-lg"
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              letterSpacing: '-0.01em'
            }}
          >
            AI-Interviewer helps CSE students prepare for technical interviews with personalized,
            AI-powered mock interviews tailored to your resume and target companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStartInterview}
              className="bg-[#FF5733] text-white px-8 py-5 transition-all hover:bg-[#e64d2b]"
              style={{
                fontWeight: 700,
                fontSize: '16px',
                letterSpacing: '-0.01em'
              }}
            >
              {uploadedResume ? 'Start Interview' : 'Upload Resume & Begin'}
            </button>

            {!uploadedResume && (
              <button
                onClick={onShowUpload}
                className="border border-[#d1d1d1] bg-white text-[#2b2d31] px-8 py-5 transition-colors hover:bg-[#f5f5f5] flex items-center justify-center gap-2"
                style={{
                  fontWeight: 700,
                  fontSize: '16px',
                  letterSpacing: '-0.01em',
                  borderWidth: '1px'
                }}
              >
                <Upload className="w-5 h-5" />
                Upload Resume
              </button>
            )}

            {uploadedResume && (
              <div
                className="border border-[#d1d1d1] bg-[#f5f5f5] px-8 py-5 flex items-center gap-2"
                style={{borderWidth: '1px'}}
              >
                <Upload className="w-5 h-5 text-[#FF5733]" />
                <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '14px'}}>
                  {uploadedResume.name}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <div
            className="bg-white border border-[#2b2d31] relative"
            style={{
              boxShadow: '12px 12px 0px 0px #2b2d31',
              borderWidth: '2px'
            }}
          >
            <div className="border-b border-[#2b2d31] px-6 py-4 flex items-center gap-2" style={{borderWidth: '1px'}}>
              <div className="w-3 h-3 bg-[#FF5733]" style={{borderRadius: '0px'}}></div>
              <div className="w-3 h-3 bg-[#2b2d31]" style={{borderRadius: '0px'}}></div>
              <div className="w-3 h-3 bg-[#d1d1d1]" style={{borderRadius: '0px'}}></div>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <div className="h-3 bg-[#2b2d31] w-1/3 mb-4"></div>
                <div className="h-2 bg-[#d1d1d1] w-full mb-2"></div>
                <div className="h-2 bg-[#d1d1d1] w-5/6 mb-2"></div>
                <div className="h-2 bg-[#d1d1d1] w-4/6"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-[#d1d1d1] p-4" style={{borderWidth: '1px'}}>
                  <div className="h-2 bg-[#d1d1d1] w-2/3 mb-3"></div>
                  <div className="h-8 bg-[#FF5733] w-full"></div>
                </div>
                <div className="border border-[#d1d1d1] p-4" style={{borderWidth: '1px'}}>
                  <div className="h-2 bg-[#d1d1d1] w-2/3 mb-3"></div>
                  <div className="h-8 bg-[#2b2d31] w-full"></div>
                </div>
              </div>

              <div className="border border-[#d1d1d1] p-4" style={{borderWidth: '1px'}}>
                <div className="h-2 bg-[#d1d1d1] w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-[#d1d1d1] w-full"></div>
                  <div className="h-2 bg-[#d1d1d1] w-11/12"></div>
                  <div className="h-2 bg-[#d1d1d1] w-10/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
