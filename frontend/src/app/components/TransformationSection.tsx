import { FileText, CheckCircle2 } from 'lucide-react';

export default function TransformationSection() {
  return (
    <section className="border-b border-[#d1d1d1] px-6 py-32 bg-[#f5f5f5]" style={{borderWidth: '1px', marginTop: '80px'}}>
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
            THE TRANSFORMATION
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
            From Uncertainty to Confidence
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-[#d1d1d1] bg-white p-8" style={{borderWidth: '1px'}}>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2b2d31] flex items-center justify-center">
                <span className="text-white" style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '14px'}}>?</span>
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: '#2b2d31'
                }}
              >
                Before: Raw Preparation
              </h3>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <div className="border border-[#d1d1d1] p-6 bg-white transform rotate-[-2deg]" style={{borderWidth: '1px'}}>
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-5 h-5 text-[#6b6b6b] flex-shrink-0 mt-1" />
                    <div>
                      <div className="h-2 bg-[#d1d1d1] w-32 mb-2"></div>
                      <div className="h-2 bg-[#d1d1d1] w-full mb-1"></div>
                      <div className="h-2 bg-[#d1d1d1] w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative -mt-4">
                <div className="border border-[#d1d1d1] p-6 bg-white transform rotate-[1deg]" style={{borderWidth: '1px'}}>
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-5 h-5 text-[#6b6b6b] flex-shrink-0 mt-1" />
                    <div>
                      <div className="h-2 bg-[#d1d1d1] w-24 mb-2"></div>
                      <div className="h-2 bg-[#d1d1d1] w-full mb-1"></div>
                      <div className="h-2 bg-[#d1d1d1] w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative -mt-4">
                <div className="border border-[#d1d1d1] p-6 bg-white transform rotate-[-1deg]" style={{borderWidth: '1px'}}>
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-5 h-5 text-[#6b6b6b] flex-shrink-0 mt-1" />
                    <div>
                      <div className="h-2 bg-[#d1d1d1] w-28 mb-2"></div>
                      <div className="h-2 bg-[#d1d1d1] w-full mb-1"></div>
                      <div className="h-2 bg-[#d1d1d1] w-3/6"></div>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 pt-4">
                {['No structured feedback', 'Generic practice questions', 'Uncertain weak points'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#6b6b6b]" style={{fontSize: '14px'}}>
                    <div className="w-1.5 h-1.5 bg-[#6b6b6b]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-[#2b2d31] bg-white p-8" style={{borderWidth: '2px'}}>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF5733] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: '#2b2d31'
                }}
              >
                After: Structured Report
              </h3>
            </div>

            <div className="border border-[#d1d1d1] p-6 mb-6" style={{borderWidth: '1px'}}>
              <div className="mb-4 pb-3 border-b border-[#d1d1d1]" style={{borderWidth: '1px'}}>
                <h4 style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6b6b6b', marginBottom: '8px'}}>
                  PERFORMANCE SCORE
                </h4>
                <div className="flex items-end gap-2">
                  <span style={{fontSize: '48px', fontWeight: 800, color: '#FF5733', lineHeight: 1}}>87</span>
                  <span style={{fontSize: '24px', color: '#6b6b6b', marginBottom: '4px'}}>/100</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '12px'}}>Data Structures</span>
                    <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#FF5733'}}>92%</span>
                  </div>
                  <div className="h-2 bg-[#f5f5f5] w-full">
                    <div className="h-2 bg-[#FF5733]" style={{width: '92%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '12px'}}>Algorithms</span>
                    <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#2b2d31'}}>85%</span>
                  </div>
                  <div className="h-2 bg-[#f5f5f5] w-full">
                    <div className="h-2 bg-[#2b2d31]" style={{width: '85%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '12px'}}>System Design</span>
                    <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6b6b6b'}}>78%</span>
                  </div>
                  <div className="h-2 bg-[#f5f5f5] w-full">
                    <div className="h-2 bg-[#6b6b6b]" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                'Detailed performance metrics',
                'Personalized improvement plan',
                'Question-by-question breakdown'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#2b2d31]" style={{fontSize: '14px', fontWeight: 500}}>
                  <CheckCircle2 className="w-5 h-5 text-[#FF5733] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
