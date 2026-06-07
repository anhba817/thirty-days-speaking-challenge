/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { GoogleSignInButton } from '../auth/GoogleSignInButton';
import { PROVIDER_NAME, SUPPORT_EMAIL } from './legalContent';

interface Props {
  onBack: () => void;
}

export function AccountDeletionPage({ onBack }: Props) {
  const { user, deleteAccount } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [scheduledAt, setScheduledAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const done = scheduledAt !== null;

  const handleDelete = async () => {
    setError(null);
    setDeleting(true);
    try {
      const scheduled = await deleteAccount();
      setScheduledAt(scheduled);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not delete your account.',
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <motion.div
      key="delete-account"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-slate-500 hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-widest mb-8"
      >
        <ArrowLeft size={14} />
        <span>Back</span>
      </button>

      <div className="glass rounded-[2.5rem] p-10 md:p-14 border-white/5 shadow-2xl space-y-8">
        <header className="space-y-3 border-b border-white/5 pb-8">
          <span className="text-xs text-blue-400 font-bold uppercase tracking-[0.3em] block">
            Account
          </span>
          <h1 className="text-4xl font-light tracking-tight text-app-heading">
            Delete your account
          </h1>
        </header>

        <div className="space-y-4">
          <p className="text-app-muted font-light leading-relaxed">
            Deleting your {PROVIDER_NAME} account schedules the permanent removal
            of your profile and all associated data from our servers, including:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              'Your account details (name, email, profile picture).',
              'Your practice progress and completed days.',
              'All your saved attempts, transcripts, scores, and audio recordings.',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-app-muted font-light leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-app-muted font-light leading-relaxed">
            Your data is kept for a{' '}
            <strong className="text-app-heading">30-day grace period</strong> in
            case you change your mind. To cancel, simply sign in again before the
            scheduled date. After that, deletion is{' '}
            <strong className="text-app-heading">permanent</strong> and cannot be
            undone.
          </p>
        </div>

        {/* Success state */}
        {done && scheduledAt ? (
          <div className="flex items-start gap-4 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <CheckCircle size={22} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-app-heading font-medium">
                Your account is scheduled for deletion.
              </p>
              <p className="text-app-muted text-sm font-light">
                Your data will be permanently deleted on{' '}
                <strong className="text-app-heading">{formatDate(scheduledAt)}</strong>.
                You've been signed out. To cancel, just sign in again before that
                date — otherwise no further action is needed.
              </p>
            </div>
          </div>
        ) : !user ? (
          /* Not signed in — must authenticate to prove ownership */
          <div className="space-y-5 rounded-3xl border border-white/5 bg-white/5 p-6">
            <p className="text-app-muted text-sm font-light leading-relaxed">
              To delete your account, please sign in first so we can verify it
              belongs to you.
            </p>
            <GoogleSignInButton />
          </div>
        ) : (
          /* Signed in — confirm + delete */
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/5 bg-white/5 px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Signed in as
              </p>
              <p className="text-app-heading font-medium mt-1">
                {user.name ?? user.email}
              </p>
              {user.name && (
                <p className="text-app-muted text-sm">{user.email}</p>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
                <AlertTriangle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-rose-300 text-sm">{error}</p>
              </div>
            )}

            {!confirming ? (
              <button
                onClick={() => setConfirming(true)}
                className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-2xl bg-rose-600/90 text-white font-bold hover:bg-rose-600 transition-all"
              >
                <Trash2 size={18} />
                <span>Delete my account</span>
              </button>
            ) : (
              <div className="space-y-4 rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6">
                <p className="text-app-heading font-medium">
                  Schedule account deletion?
                </p>
                <p className="text-app-muted text-sm font-light">
                  Your account and all data will be permanently deleted after 30
                  days. You can cancel any time before then by signing in again.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50 transition-all"
                  >
                    <Trash2 size={18} />
                    <span>{deleting ? 'Scheduling…' : 'Yes, delete my account'}</span>
                  </button>
                  <button
                    onClick={() => setConfirming(false)}
                    disabled={deleting}
                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-app-text font-bold hover:bg-white/10 disabled:opacity-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-app-muted text-xs font-light leading-relaxed border-t border-white/5 pt-6">
          Having trouble? You can also request deletion by emailing us at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">
            {SUPPORT_EMAIL}
          </a>{' '}
          from the email address associated with your account.
        </p>
      </div>
    </motion.div>
  );
}
