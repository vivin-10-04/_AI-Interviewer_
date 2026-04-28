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
    <section 
      style={{
        position: 'relative',
        background: '#f0eef8',
        borderBottom: '1px solid #d1cde8',
        padding: '100px 48px',
        overflow: 'hidden'
      }}
    >
      {/* Background mesh grid to continue from Hero */}
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
              How It Works
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
            Three Steps to<br/>
            Interview Mastery
          </h2>
        </div>

        {/* Steps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                border: '1.5px solid #c8c2dc',
                borderRadius: '8px',
                padding: '40px 32px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translate(-4px, -4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '8px 8px 0px rgba(140,120,200,0.15)';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#a39ac4';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLDivElement).style.transform = '';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#c8c2dc';
              }}
            >
              {/* Icon Container */}
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '12px', 
                  background: 'rgba(255,87,51,0.08)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '32px'
                }}
              >
                <step.icon size={28} color="#FF5733" />
              </div>

              {/* Step Number */}
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#8a85a0',
                  marginBottom: '12px'
                }}
              >
                Step {String(index + 1).padStart(2, '0')}
              </div>

              {/* Step Title */}
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#1a1820',
                  marginBottom: '16px',
                  fontFamily: 'system-ui, sans-serif'
                }}
              >
                {step.title}
              </h3>

              {/* Step Description */}
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#5a5570',
                  fontFamily: 'system-ui, sans-serif',
                  margin: 0
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