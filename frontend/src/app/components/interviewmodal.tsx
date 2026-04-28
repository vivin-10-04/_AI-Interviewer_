import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { interviewService, type InterviewMessage } from '../services/interviewService';
interface Message {
  role: "user" | "assistant";
  text: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resume: File | null;
}

const AI_AVATAR_FRAMES = [
  "/ai-avatar-1.png", // Replace with your actual AI avatar images
];

export default function InterviewModal({ isOpen, onClose, resume }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const userStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");

  // Start session
  useEffect(() => {
    if (!isOpen) return;
    setMessages([{ role: "assistant", text: "Hello! Welcome to your interview. Tell me about yourself." }]);
    setElapsedTime(0);
    timerRef.current = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    startCamera();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      userStreamRef.current = stream;
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
      setCameraError(null);
    } catch {
      setCameraError("Camera access denied. Please allow camera access.");
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
      if (screenVideoRef.current) screenVideoRef.current.srcObject = null;
      setIsScreenSharing(false);
    } else {
      try {
        const stream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
        screenStreamRef.current = stream;
        if (screenVideoRef.current) screenVideoRef.current.srcObject = stream;
        setIsScreenSharing(true);
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          screenStreamRef.current = null;
        };
      } catch {
        // User cancelled
      }
    }
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch {
      alert("Please allow microphone access to use this feature.");
    }
  };

  const stopListening = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleClose = () => {
    stopListening();
    userStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    window.speechSynthesis.cancel();
    if (timerRef.current) clearInterval(timerRef.current);
    setMessages([]);
    setIsScreenSharing(false);
    setElapsedTime(0);
    onClose();
  };

  const submitAnswer = async () => {
  if (!mediaRecorderRef.current) return;
  
  mediaRecorderRef.current.onstop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    setLoading(true);
    
    try {
      // Call the backend API
      const data = await interviewService.sendInterviewAnswer(
        audioBlob,
        messages,
        resume
      );

      // Update messages
      setMessages((prev) => [
        ...prev,
        { role: "user", text: data.transcript },
        { role: "assistant", text: data.reply },
      ]);

      // Text-to-speech
      const utterance = new SpeechSynthesisUtterance(data.reply);
      utterance.lang = "en-US";
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      
    } catch (err) {
      console.error('Interview error:', err);
      
      // Show error message to user
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Sorry, I encountered an error. Please try again.';
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          text: errorMessage
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  stopListening();
};

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 52,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "#0d0d14",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: recording ? "#ef4444" : "#22c55e",
              boxShadow: recording ? "0 0 6px #ef4444" : "0 0 6px #22c55e",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.03em" }}>
            {recording ? "Recording" : "Live"} · {formatTime(elapsedTime)}
          </span>
        </div>

        <span
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Interview Session
        </span>

        <button
          onClick={handleClose}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            color: "rgba(255,255,255,0.6)",
            padding: "5px 14px",
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          End Interview
        </button>
      </div>

      {/* Main Layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* LEFT PANEL — AI Interviewer */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "#0d0d14",
          }}
        >
          {/* AI Avatar */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient glow behind avatar */}
            <div
              style={{
                position: "absolute",
                width: 320,
                height: 320,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Avatar circle */}
            <div
              style={{
                position: "relative",
                width: 200,
                height: 200,
              }}
            >
              {/* Animated ring when speaking */}
              {isSpeaking && (
                <>
                  <div style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: "50%",
                    border: "2px solid rgba(99,102,241,0.4)",
                    animation: "pulse-ring 1.5s ease-out infinite",
                  }} />
                  <div style={{
                    position: "absolute",
                    inset: -24,
                    borderRadius: "50%",
                    border: "1px solid rgba(99,102,241,0.2)",
                    animation: "pulse-ring 1.5s ease-out 0.3s infinite",
                  }} />
                </>
              )}

              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
                  border: `3px solid ${isSpeaking ? "rgba(99,102,241,0.8)" : "rgba(99,102,241,0.25)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.3s",
                  overflow: "hidden",
                  boxShadow: isSpeaking ? "0 0 40px rgba(99,102,241,0.3)" : "none",
                }}
              >
                {/* AI face illustration */}
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="55" cy="42" r="26" fill="rgba(199,210,254,0.15)" stroke="rgba(199,210,254,0.3)" strokeWidth="1.5"/>
                  <circle cx="46" cy="39" r="4" fill="rgba(199,210,254,0.8)"/>
                  <circle cx="64" cy="39" r="4" fill="rgba(199,210,254,0.8)"/>
                  <circle cx="47" cy="38" r="1.5" fill="white"/>
                  <circle cx="65" cy="38" r="1.5" fill="white"/>
                  <path d="M47 49 Q55 55 63 49" stroke="rgba(199,210,254,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <rect x="30" y="70" width="50" height="32" rx="8" fill="rgba(199,210,254,0.08)" stroke="rgba(199,210,254,0.15)" strokeWidth="1"/>
                  <rect x="38" y="78" width="34" height="3" rx="1.5" fill="rgba(199,210,254,0.4)"/>
                  <rect x="42" y="85" width="26" height="3" rx="1.5" fill="rgba(199,210,254,0.25)"/>
                  <circle cx="55" cy="15" r="3" fill="rgba(199,210,254,0.5)"/>
                  <line x1="55" y1="18" x2="55" y2="25" stroke="rgba(199,210,254,0.3)" strokeWidth="1.5"/>
                </svg>
              </div>

              {/* Speaking indicator dots */}
              {isSpeaking && (
                <div style={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div key={i} style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#818cf8",
                      animation: `bounce-dot 0.8s ease-in-out ${delay}s infinite`,
                    }} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Name badge */}
          <div style={{ textAlign: "center", paddingBottom: 12 }}>
            <span style={{
              fontSize: 12,
              color: "rgba(129,140,248,0.8)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              AI Interviewer
            </span>
          </div>

          {/* Transcript area */}
          <div
            style={{
              height: "38%",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{
              padding: "10px 20px 6px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#818cf8" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Transcript
              </span>
            </div>

            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "0 20px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}>
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.role === "assistant" && (
                    <div>
                      <div style={{
                        fontSize: 10,
                        color: "rgba(129,140,248,0.6)",
                        marginBottom: 4,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                      }}>Interviewer</div>
                      <div style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.6,
                        background: "rgba(99,102,241,0.08)",
                        borderLeft: "2px solid rgba(129,140,248,0.4)",
                        padding: "8px 12px",
                        borderRadius: "0 6px 6px 0",
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div>
                      <div style={{
                        fontSize: 10,
                        color: "rgba(34,197,94,0.6)",
                        marginBottom: 4,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                      }}>You</div>
                      <div style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.6,
                        background: "rgba(34,197,94,0.06)",
                        borderLeft: "2px solid rgba(34,197,94,0.3)",
                        padding: "8px 12px",
                        borderRadius: "0 6px 6px 0",
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div>
                  <div style={{ fontSize: 10, color: "rgba(129,140,248,0.6)", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Interviewer</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>Thinking…</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — User camera + screen share */}
        <div
          style={{
            width: "42%",
            display: "flex",
            flexDirection: "column",
            background: "#0a0a0f",
            minWidth: 380,
          }}
        >
          {/* User camera */}
          <div style={{ flex: isScreenSharing ? "0 0 45%" : 1, position: "relative", background: "#0d0d14" }}>
            <div style={{
              position: "absolute",
              top: 10,
              left: 12,
              zIndex: 10,
              fontSize: 10,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "rgba(0,0,0,0.5)",
              padding: "3px 8px",
              borderRadius: 4,
            }}>
              You
            </div>

            {cameraError ? (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "rgba(255,255,255,0.3)",
                fontSize: 13,
              }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M15 10l4.553-2.277A1 1 0 0121 8.646v6.708a1 1 0 01-1.447.894L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="4" y1="4" x2="20" y2="20" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5"/>
                </svg>
                <span>{cameraError}</span>
                <button
                  onClick={startCamera}
                  style={{ marginTop: 4, fontSize: 12, color: "#818cf8", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Try again
                </button>
              </div>
            ) : (
              <video
                ref={userVideoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}

            {/* Recording pulse */}
            {recording && (
              <div style={{
                position: "absolute",
                top: 10,
                right: 12,
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                padding: "3px 10px",
                borderRadius: 20,
              }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ef4444",
                  animation: "pulse-dot 1s ease-in-out infinite",
                }} />
                <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>REC</span>
              </div>
            )}
          </div>

          {/* Screen share panel */}
          {isScreenSharing && (
            <div style={{
              flex: 1,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              position: "relative",
              background: "#0a0a0f",
            }}>
              <div style={{
                position: "absolute",
                top: 10,
                left: 12,
                zIndex: 10,
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "rgba(0,0,0,0.5)",
                padding: "3px 8px",
                borderRadius: 4,
              }}>
                Screen Share
              </div>
              <video
                ref={screenVideoRef}
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
          )}

          {/* Controls */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#0d0d14",
              flexShrink: 0,
            }}
          >
            {/* Screen share toggle */}
            <button
              onClick={toggleScreenShare}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 8,
                border: `1px solid ${isScreenSharing ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.12)"}`,
                background: isScreenSharing ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.04)",
                color: isScreenSharing ? "#818cf8" : "rgba(255,255,255,0.5)",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="14" rx="2"/>
                <path d="M8 20h8M12 18v2" strokeLinecap="round"/>
              </svg>
              {isScreenSharing ? "Stop Share" : "Share Screen"}
            </button>

            <div style={{ flex: 1 }} />

            {/* Mic controls */}
            {!recording ? (
              <button
                onClick={startListening}
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: loading ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.85)",
                  color: loading ? "rgba(255,255,255,0.4)" : "white",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                }}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1a4 4 0 014 4v7a4 4 0 01-8 0V5a4 4 0 014-4z"/>
                  <path d="M19 11a7 7 0 01-14 0M12 19v4M8 23h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Speak
              </button>
            ) : (
              <>
                <button
                  onClick={stopListening}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={submitAnswer}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "9px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: "#16a34a",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}