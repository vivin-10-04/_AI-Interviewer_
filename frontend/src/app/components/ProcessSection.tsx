import { Upload, MessageSquare, BarChart3 } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Resume',
      description: 'Submit your resume in PDF or DOC format. Our AI analyzes your skills, projects, and experience.'
    },
    {
      icon: MessageSquare,
      title: 'AI Interview Session',
      description: 'Engage in a realistic technical interview with AI-powered questions tailored to your background.'
    },
    {
      icon: BarChart3,
      title: 'Performance Report',
      description: 'Receive detailed feedback, strengths analysis, and targeted improvement recommendations.'
    }
  ];

  return (
    <section className="border-b border-[#d1d1d1] px-6 py-32" style={{borderWidth: '1px', marginTop: '80px'}}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p
            className="mb-4 text-[#FF5733]"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-[#2b2d31]"
            style={{
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}
          >
            Three Steps to Interview Mastery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border border-[#d1d1d1] bg-white p-8 transition-all hover:border-[#2b2d31]"
              style={{borderWidth: '1px'}}
            >
              <div className="mb-6">
                <div className="border border-[#2b2d31] w-16 h-16 flex items-center justify-center" style={{borderWidth: '2px'}}>
                  <step.icon className="w-8 h-8 text-[#2b2d31]" />
                </div>
              </div>

              <div
                className="mb-3 text-[#2b2d31]"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#6b6b6b'
                }}
              >
                STEP {String(index + 1).padStart(2, '0')}
              </div>

              <h3
                className="mb-4 text-[#2b2d31]"
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em'
                }}
              >
                {step.title}
              </h3>

              <p
                className="text-[#6b6b6b]"
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
