import { FileText, CheckCircle2 } from 'lucide-react';

export default function TransformationSection() {
  return (
    <section 
      style={{
        position: 'relative',
        background: '#f0eef8',
        borderBottom: '1px solid #d1cde8',
        padding: '100px 48px',
        overflow: 'hidden'
      }}
    >
      {/* Background mesh grid to continue the theme */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(140,120,200,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(140,120,200,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header Area */}
        <div style={{ marginBottom: '64px', maxWidth: '600px' }}>
          {/* Label pill matching Hero */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,87,51,0.1)',
              border: '1px solid rgba(255,87,51,0.25)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5733', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF5733', fontFamily: 'JetBrains Mono, monospace' }}>
              The Transformation
            </span>
          </div>

          {/* Editorial Heading */}
          <h2
            style={{
              fontSize: 'clamp(40px, 5vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#1a1820',
              fontFamily: '"Cabinet Grotesk", "Syne", Georgia, serif',
            }}
          >
            From Uncertainty<br/>
            to Confidence
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          
          {/* LEFT CARD — Before */}
          <div 
            style={{
              background: 'white',
              border: '1.5px solid #c8c2dc',
              borderRadius: '8px',
              padding: '48px 40px',
            }}
          >
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: '#e0dceb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', fontWeight: 700, color: '#5a5570' }}>?</span>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.01em', color: '#1a1820', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
                Before: Raw Preparation
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Stacked Papers Illustration */}
              <div style={{ position: 'relative', height: '140px' }}>
                
                {/* Back Paper */}
                <div style={{ position: 'absolute', top: 0, left: '10px', right: '10px', border: '1px solid #d1cde8', background: '#fcfbfe', padding: '20px', borderRadius: '4px', transform: 'rotate(-3deg)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <FileText size={20} color="#a39ac4" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ width: '100%' }}>
                      <div style={{ height: '6px', background: '#e0dceb', width: '40%', marginBottom: '10px', borderRadius: '2px' }}></div>
                      <div style={{ height: '6px', background: '#e0dceb', width: '100%', marginBottom: '8px', borderRadius: '2px' }}></div>
                      <div style={{ height: '6px', background: '#e0dceb', width: '85%', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>

                {/* Middle Paper */}
                <div style={{ position: 'absolute', top: '15px', left: '5px', right: '15px', border: '1px solid #d1cde8', background: '#fdfcfe', padding: '20px', borderRadius: '4px', transform: 'rotate(2deg)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <FileText size={20} color="#a39ac4" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ width: '100%' }}>
                      <div style={{ height: '6px', background: '#e0dceb', width: '30%', marginBottom: '10px', borderRadius: '2px' }}></div>
                      <div style={{ height: '6px', background: '#e0dceb', width: '100%', marginBottom: '8px', borderRadius: '2px' }}></div>
                      <div style={{ height: '6px', background: '#e0dceb', width: '65%', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>

                {/* Front Paper */}
                <div style={{ position: 'absolute', top: '30px', left: '0', right: '0', border: '1px solid #c8c2dc', background: 'white', padding: '20px', borderRadius: '4px', transform: 'rotate(-1deg)', boxShadow: '0 4px 12px rgba(140,120,200,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <FileText size={20} color="#7c5cbf" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ width: '100%' }}>
                      <div style={{ height: '6px', background: '#c8c2dc', width: '35%', marginBottom: '10px', borderRadius: '2px' }}></div>
                      <div style={{ height: '6px', background: '#e0dceb', width: '100%', marginBottom: '8px', borderRadius: '2px' }}></div>
                      <div style={{ height: '6px', background: '#e0dceb', width: '50%', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Negative Points */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['No structured feedback', 'Generic practice questions', 'Uncertain weak points'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#5a5570', fontSize: '15px', fontFamily: 'system-ui, sans-serif' }}>
                    <div style={{ width: '6px', height: '6px', background: '#a39ac4', borderRadius: '50%' }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT CARD — After */}
          <div 
            style={{
              background: 'white',
              border: '2px solid #FF5733', // Highlight border for the "After" state
              borderRadius: '8px',
              padding: '48px 40px',
              position: 'relative',
              boxShadow: '8px 8px 0px rgba(255,87,51,0.15)',
            }}
          >
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: '#FF5733', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} color="white" />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.01em', color: '#1a1820', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
                After: Structured Report
              </h3>
            </div>

            {/* Inner Dashboard Mockup */}
            <div style={{ border: '1.5px solid #e0dceb', borderRadius: '6px', padding: '24px', marginBottom: '32px', background: '#fcfbfe' }}>
              
              {/* Score Area */}
              <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1.5px solid #e0dceb' }}>
                <h4 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a85a0', margin: '0 0 8px 0' }}>
                  Performance Score
                </h4>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 900, color: '#FF5733', lineHeight: 1, fontFamily: 'system-ui, sans-serif' }}>87</span>
                  <span style={{ fontSize: '20px', fontWeight: 600, color: '#8a85a0', fontFamily: 'system-ui, sans-serif' }}>/100</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Data Structures', score: '92%', color: '#FF5733', width: '92%' },
                  { label: 'Algorithms', score: '85%', color: '#7c5cbf', width: '85%' },
                  { label: 'System Design', score: '78%', color: '#a39ac4', width: '78%' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 600, color: '#1a1820' }}>{stat.label}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 700, color: stat.color }}>{stat.score}</span>
                    </div>
                    <div style={{ height: '8px', background: '#e0dceb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: stat.color, width: stat.width, borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Positive Points */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Detailed performance metrics',
                'Personalized improvement plan',
                'Question-by-question breakdown'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1a1820', fontSize: '15px', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
                  <CheckCircle2 size={18} color="#FF5733" style={{ flexShrink: 0 }} />
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