'use client';

import { useState, useEffect, useRef } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '@/lib/actions';

const CLIENT_ID =
  '914126565175-aqv4ikedeo5k1fllnfhsvse8msu37jca.apps.googleusercontent.com';

export default function GoogleLoginButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [btnWidth, setBtnWidth] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) {
          setBtnWidth(`${Math.min(width, 400)}`);
        }
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleSuccess = async (credentialResponse: any) => {
    try {
      if (credentialResponse.credential) {
        await loginWithGoogle(credentialResponse.credential);
      }
    } catch (err) {
      console.error('Autentisering feilet:', err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div ref={containerRef} className="w-full flex justify-center min-h-[40px]">
        {btnWidth && (
          <GoogleLogin
            theme="filled_black"
            shape="pill"
            text="continue_with"
            size="large"
            width={btnWidth}
            onSuccess={handleSuccess}
            onError={() => console.error('Google Login feilet i popup')}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}
