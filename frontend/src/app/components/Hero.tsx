import { Upload } from 'lucide-react';

interface HeroProps {
  onStartInterview: () => void;
  uploadedResume: File | null;
  onShowUpload: () => void;
}

export default function Hero({ onStartInterview, uploadedResume, onShowUpload }: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#f0eef8',
        borderBottom: '1px solid #d1cde8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background mesh grid */}
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

      {/* Warm blob top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,140,80,0.22) 0%, rgba(240,100,120,0.12) 50%, transparent 72%)',
          pointerEvents: 'none',
          filter: 'blur(2px)',
        }}
      />

      {/* Soft purple blob center-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-60px',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(160,120,240,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative lines top-right */}
      <svg
        style={{ position: 'absolute', top: 0, right: 0, width: '340px', height: '260px', opacity: 0.18, pointerEvents: 'none' }}
        viewBox="0 0 340 260"
        fill="none"
      >
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1={340 - i * 44} y1="0" x2="340" y2={i * 44} stroke="#7c5cbf" strokeWidth="0.8"/>
        ))}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={`h${i}`} x1="0" y1={i * 38} x2={340} y2={i * 38} stroke="#7c5cbf" strokeWidth="0.4"/>
        ))}
      </svg>

      <div style={{ position: 'relative', width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

          {/* LEFT — Copy */}
          <div>
            {/* Label pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,87,51,0.1)',
                border: '1px solid rgba(255,87,51,0.25)',
                borderRadius: '999px',
                padding: '6px 16px',
                marginBottom: '36px',
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5733', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF5733', fontFamily: 'JetBrains Mono, monospace' }}>
                AI-Powered Interview Prep
              </span>
            </div>

            {/* Headline — huge editorial type */}
            <h1
              style={{
                margin: '0 0 28px',
                fontSize: 'clamp(52px, 6vw, 80px)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: '#1a1820',
                fontFamily: '"Cabinet Grotesk", "Syne", Georgia, serif',
              }}
            >
              MASTER<br />
              <span style={{ color: '#FF5733' }}>TECHNICAL</span><br />
              INTERVIEWS
            </h1>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.75,
                color: '#5a5570',
                maxWidth: '420px',
                marginBottom: '44px',
                letterSpacing: '-0.005em',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              AI-Interviewer helps CSE students prepare with personalized, AI-powered mock sessions
              tailored to your resume and target companies.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={onStartInterview}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#FF5733',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  boxShadow: '4px 4px 0px #1a1820',
                  fontFamily: 'system-ui, sans-serif',
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-2px,-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '6px 6px 0px #1a1820';
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = '';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '4px 4px 0px #1a1820';
                }}
              >
                {uploadedResume ? 'Start Interview →' : 'Upload Resume & Begin →'}
              </button>

              {!uploadedResume && (
                <button
                  onClick={onShowUpload}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    color: '#1a1820',
                    border: '1.5px solid #c8c2dc',
                    padding: '15px 28px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background 0.15s',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                  onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f4f0fb'; }}
                  onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
                >
                  <Upload size={16} />
                  Upload Resume
                </button>
              )}

              {uploadedResume && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,87,51,0.07)',
                    border: '1px solid rgba(255,87,51,0.2)',
                    borderRadius: '4px',
                    padding: '15px 20px',
                  }}
                >
                  <Upload size={16} color="#FF5733" />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#1a1820' }}>
                    {uploadedResume.name}
                  </span>
                </div>
              )}
            </div>

            {/* Key stats */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '52px', paddingTop: '36px', borderTop: '1px solid rgba(140,120,200,0.2)' }}>
              {[
                { val: '10K+', label: 'Students Prepared' },
                { val: '95%', label: 'Placement Rate' },
                { val: '50+', label: 'Companies Covered' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#1a1820', letterSpacing: '-0.03em', fontFamily: 'system-ui, sans-serif' }}>
                    {stat.val}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8a85a0', marginTop: '2px', letterSpacing: '0.02em', fontFamily: 'system-ui, sans-serif' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Full atmospheric silhouette scene */}
          <div style={{ position: 'relative', height: '540px', overflow: 'hidden', borderRadius: '4px' }}>

            {/* Background — light lavender to warm peach gradient, matching image 2 */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #ddd8f0 0%, #e8dff0 30%, #f0e0da 65%, #f5e4dc 100%)',
            }} />

            {/* Mesh grid overlay */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="heroGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                  <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#7c5cbf" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>

            {/* Primary warm orange aura — chest/torso level */}
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-55%)',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,110,50,0.55) 0%, rgba(255,150,70,0.35) 30%, rgba(250,180,100,0.15) 58%, transparent 75%)',
              pointerEvents: 'none',
              filter: 'blur(1px)',
            }} />

            {/* Secondary pink bloom — right of figure */}
            <div style={{
              position: 'absolute',
              bottom: '100px',
              left: '58%',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,80,110,0.3) 0%, rgba(240,120,100,0.15) 45%, transparent 68%)',
              pointerEvents: 'none',
            }} />

            {/* Tertiary soft amber glow — lower left */}
            <div style={{
              position: 'absolute',
              bottom: '0px',
              left: '10%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,170,80,0.2) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />

            {/* SVG — full figure silhouette, tall and centered */}
            <svg
              viewBox="0 0 300 520"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-52%)', height: '88%', width: 'auto' }}
            >
              <defs>
                <linearGradient id="figFull" x1="0.3" y1="0" x2="0.7" y2="1">
                  <stop offset="0%" stopColor="#32293d" />
                  <stop offset="40%" stopColor="#1e1a28" />
                  <stop offset="100%" stopColor="#100e16" />
                </linearGradient>
                <radialGradient id="rimGlow" cx="25%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="rgba(255,120,55,0.18)" />
                  <stop offset="100%" stopColor="rgba(255,120,55,0)" />
                </radialGradient>
                <filter id="figBlur">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b"/>
                  <feComposite in="SourceGraphic" in2="b" operator="over"/>
                </filter>
              </defs>

              {/* Legs */}
              <path d="M118 370 Q112 430 108 520 L140 520 Q142 440 148 370Z" fill="url(#figFull)" />
              <path d="M182 370 Q188 430 192 520 L160 520 Q158 440 152 370Z" fill="url(#figFull)" />

              {/* Main torso / jacket body */}
              <path
                d="M90 200 Q72 230 65 290 Q60 340 62 380 L238 380 Q240 340 235 290 Q228 230 210 200 Q192 185 150 180 Q108 185 90 200Z"
                fill="url(#figFull)"
                filter="url(#figBlur)"
              />

              {/* Jacket lapels */}
              <path d="M138 195 Q150 215 162 195 L158 250 Q150 238 142 250Z" fill="#2a2335" />

              {/* Collar */}
              <path d="M138 178 Q150 188 162 178 Q158 196 150 190 Q142 196 138 178Z" fill="#32293d" />

              {/* Left arm — relaxed at side */}
              <path
                d="M90 205 Q68 240 60 300 Q58 330 62 355 Q72 360 82 355 Q84 330 88 295 Q96 260 108 230Z"
                fill="#1a1622"
              />

              {/* Right arm */}
              <path
                d="M210 205 Q232 240 240 300 Q242 330 238 355 Q228 360 218 355 Q216 330 212 295 Q204 260 192 230Z"
                fill="#1a1622"
              />

              {/* Left hand hint */}
              <ellipse cx="66" cy="362" rx="10" ry="7" fill="#1a1622" />
              {/* Right hand hint */}
              <ellipse cx="234" cy="362" rx="10" ry="7" fill="#1a1622" />

              {/* Neck */}
              <rect x="138" y="148" width="24" height="38" rx="10" fill="#2a2335" />

              {/* Head */}
              <ellipse cx="150" cy="118" rx="42" ry="46" fill="#1a1622" filter="url(#figBlur)" />

              {/* Warm rim light — left side of head */}
              <path d="M112 100 Q108 122 116 148" stroke="rgba(255,130,55,0.22)" strokeWidth="5" fill="none" strokeLinecap="round"/>

              {/* Warm rim light — left shoulder/arm */}
              <path d="M72 215 Q60 255 62 300" stroke="rgba(255,120,50,0.2)" strokeWidth="6" fill="none" strokeLinecap="round"/>

              {/* Subtle rim on right shoulder */}
              <path d="M226 215 Q240 255 238 300" stroke="rgba(240,90,100,0.12)" strokeWidth="5" fill="none" strokeLinecap="round"/>

              {/* Warm glow overlay on torso */}
              <ellipse cx="150" cy="290" rx="85" ry="95" fill="url(#rimGlow)" />
            </svg>

            {/* Flower — right side, like in image 2 */}
            <svg
              viewBox="0 0 120 280"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', right: '4%', bottom: '12%', height: '52%', width: 'auto', opacity: 0.82 }}
            >
              {/* Stem */}
              <path d="M60 280 Q58 220 62 160 Q64 120 60 80" stroke="#c4a882" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Leaf left */}
              <path d="M60 190 Q30 175 22 155 Q44 162 60 180Z" fill="#d4b896" opacity="0.7"/>
              {/* Petal cluster — large pink petals */}
              <ellipse cx="60" cy="68" rx="18" ry="38" fill="#f0a898" opacity="0.85" transform="rotate(-18 60 68)"/>
              <ellipse cx="60" cy="68" rx="18" ry="38" fill="#eea090" opacity="0.75" transform="rotate(12 60 68)"/>
              <ellipse cx="60" cy="68" rx="16" ry="34" fill="#f5b8a8" opacity="0.8" transform="rotate(38 60 68)"/>
              <ellipse cx="60" cy="68" rx="14" ry="30" fill="#f8c4b4" opacity="0.7" transform="rotate(-42 60 68)"/>
              {/* Center */}
              <circle cx="60" cy="70" r="10" fill="#e8907a" opacity="0.9"/>
              <circle cx="60" cy="70" r="5" fill="#d4785e" opacity="0.95"/>
            </svg>

            {/* "Custom AI Interviewer" pill — top area like reference */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(12px)',
              borderRadius: '999px',
              padding: '8px 18px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#1a1820',
              border: '1px solid rgba(255,255,255,0.5)',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.01em',
              boxShadow: '0 2px 16px rgba(140,100,180,0.1)',
            }}>
              Custom AI Interviewer
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}
