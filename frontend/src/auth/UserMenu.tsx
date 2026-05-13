import { LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';
import { GoogleSignInButton } from './GoogleSignInButton';

export function UserMenu() {
  const { user, signOut, initialized } = useAuth();

  if (!initialized) return null;

  if (!user) return <GoogleSignInButton />;

  return (
    <div className="flex items-center space-x-3 bg-white/5 border border-white/5 px-3 py-1.5 rounded-2xl">
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt=""
          className="w-7 h-7 rounded-full"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
          {(user.name ?? user.email)[0]?.toUpperCase()}
        </div>
      )}
      <div className="hidden md:block">
        <p className="text-xs font-medium text-app-text leading-tight">
          {user.name ?? user.email}
        </p>
        <p className="text-[9px] text-slate-500 uppercase tracking-widest">
          Signed in
        </p>
      </div>
      <button
        onClick={signOut}
        className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 transition-colors"
        title="Sign out"
      >
        <LogOut size={14} />
      </button>
    </div>
  );
}
