import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// High-DPI URL Favicon Dimensions
export const size = {
  width: 64,
  height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="18 20 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aLeftGrad" x1="30%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4338CA" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="aRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="orbitFrontGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#A5B4FC" />
            </linearGradient>
            <linearGradient id="orbitBackGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          
          {/* Back Orbit Arc */}
          <path
            d="M 66 52 C 78 40, 92 32, 97 28 C 98.5 27, 98.8 28.5, 96.5 32 C 90 41, 78 54, 69 63"
            stroke="url(#orbitBackGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Right Leg of 'A' */}
          <path
            d="M 64.5 24 L 64.5 34 L 88.5 98 L 100 98 L 74 24 Z"
            fill="url(#aRightGrad)"
          />

          {/* Left Leg of 'A' (Upper Segment) */}
          <path
            d="M 64.5 24 L 74 24 L 54.5 72 L 44 68 Z"
            fill="url(#aLeftGrad)"
          />

          {/* Left Leg of 'A' (Lower Segment) */}
          <path
            d="M 40 82 L 48 85 L 34 100 L 22 100 Z"
            fill="url(#aLeftGrad)"
          />

          {/* Front Orbit Ribbon */}
          <path
            d="M 23 100 C 20 101, 21 97, 24 94 C 31 85, 43 73, 58 60 C 73 47, 86 37, 96 28 C 98 26, 97 28, 94 31 C 83 41, 68 54, 52 68 C 38 80, 27 92, 23 100 Z"
            fill="url(#orbitFrontGrad)"
          />

          <circle cx="96" cy="28" r="3" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
