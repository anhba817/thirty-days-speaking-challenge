import { useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

interface CredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (opts: {
            client_id: string;
            callback: (res: CredentialResponse) => void;
          }) => void;
          renderButton: (
            el: HTMLElement,
            opts: Record<string, unknown>,
          ) => void;
        };
      };
    };
  }
}

export function GoogleSignInButton() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { signIn } = useAuth();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !ref.current) return;

    let cancelled = false;

    const render = () => {
      if (cancelled || !ref.current) return;
      if (!window.google?.accounts?.id) {
        setTimeout(render, 100);
        return;
      }
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (res) => {
          signIn(res.credential).catch((err) => {
            console.error('Google sign-in failed', err);
          });
        },
      });
      window.google.accounts.id.renderButton(ref.current, {
        theme: 'filled_blue',
        size: 'medium',
        shape: 'pill',
        text: 'signin_with',
      });
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [clientId, signIn]);

  if (!clientId) {
    return (
      <span className="text-[10px] text-slate-500 uppercase tracking-widest">
        Sign-in unavailable
      </span>
    );
  }

  return <div ref={ref} />;
}
