'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle, Compass } from 'lucide-react';
import { Button } from './ui/button';
import { AceternityInput, LabelInputContainer, BottomGradient } from './ui/signup-form';
import { MultiStepLoader } from './ui/multi-step-loader';
import { useAuth } from '@/lib/auth-context';
import { AnveshLogo } from './ui/anvesh-logo';

const loadingStates = [
  { text: 'Validating cryptographic credentials...' },
  { text: 'Connecting to Qdrant HNSW vector collection...' },
  { text: 'Synchronizing canonical skill ontology graph...' },
  { text: 'Executing LightGBM LambdaMART ranking engine...' },
  { text: 'Session established! Opening candidate discovery console...' },
];

export function AuthModal() {
  const router = useRouter();
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    loginWithPassword,
    registerWithPassword,
    loginWithGoogle,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const isSignup = authModalMode === 'signup';

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleTabChange = (mode: 'login' | 'signup') => {
    resetForm();
    openAuthModal(mode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (isSignup) {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (isSignup) {
        await registerWithPassword(name, email, password);
      } else {
        await loginWithPassword(email, password);
      }
      setTimeout(() => {
        setIsLoading(false);
        closeAuthModal();
        router.push('/dashboard');
      }, 3000);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
      setTimeout(() => {
        setIsLoading(false);
        closeAuthModal();
        router.push('/dashboard');
      }, 3000);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Google sign-in was cancelled or failed.');
    }
  };

  return (
    <>
      {/* Aceternity MultiStepLoader overlay */}
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isLoading}
        duration={600}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 animate-slideUp overflow-hidden">
          
          {/* Subtle Aceternity Top Edge Highlight */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Branding Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center mb-1">
              <AnveshLogo size="lg" variant="brand" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isSignup ? 'Create Your Free Account' : 'Welcome Back to ANVESH'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isSignup
                ? 'Join the deterministic AI career discovery platform.'
                : 'Sign in to access your recommendations and simulations.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-6">
            <button
              type="button"
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                !isSignup ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('signup')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                isSignup ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error / Success Feedback Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 mb-4 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2 mb-4 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Firebase Google Auth Button with Aceternity Hover Bottom Gradient */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="relative group/btn w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-subtle hover:border-slate-300 transition-all disabled:opacity-50 overflow-hidden"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
            <BottomGradient />
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                Or with email
              </span>
            </div>
          </div>

          {/* Manual Form with Aceternity Inputs & Radial Glows */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <LabelInputContainer>
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <AceternityInput
                  type="text"
                  placeholder="e.g. Goutam Anvesh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </LabelInputContainer>
            )}

            <LabelInputContainer>
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <AceternityInput
                type="email"
                placeholder="candidate@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {!isSignup && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent for demo account.')}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <AceternityInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 z-10"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </LabelInputContainer>

            {isSignup && (
              <LabelInputContainer>
                <label className="text-xs font-bold text-slate-700">Confirm Password</label>
                <AceternityInput
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </LabelInputContainer>
            )}

            <div className="relative group/btn pt-1">
              <Button
                type="submit"
                variant="noise"
                disabled={isLoading}
                className="w-full justify-center font-bold text-sm py-3 mt-1 shadow-lg shadow-brand-500/25"
              >
                {isSignup ? 'Create Free Account' : 'Sign In to ANVESH'}
              </Button>
              <BottomGradient />
            </div>
          </form>

          {/* Demo Credentials Tip */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <p className="text-[11px] text-slate-500">
              Demo account: <strong className="text-slate-800">demo@anvesh.ai</strong> &bull; Password: <strong className="text-slate-800">CandidatePass123!</strong>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
