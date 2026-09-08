'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AceternityInput, LabelInputContainer, BottomGradient } from '@/components/ui/signup-form';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { useAuth } from '@/lib/auth-context';

const loadingStates = [
  { text: 'Validating cryptographic credentials...' },
  { text: 'Connecting to Qdrant HNSW vector collection...' },
  { text: 'Synchronizing canonical skill ontology graph...' },
  { text: 'Executing LightGBM LambdaMART ranking engine...' },
  { text: 'Session established! Opening candidate discovery console...' },
];

export default function LoginPage() {
  const router = useRouter();
  const { loginWithPassword, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithPassword(email, password);
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 2800);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Invalid email or password credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 2800);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Google sign-in failed.');
    }
  };

  return (
    <>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isLoading}
        duration={600}
      />

      <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex justify-center mb-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">ANVESH</span>
            </Link>
          </div>

          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
            Sign In to Your Account
          </h2>
          <p className="mt-1 text-center text-sm text-slate-500">
            Access your personalized multi-stage recommendations and simulations
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl sm:rounded-3xl sm:px-10 border border-slate-200/90 space-y-6 relative overflow-hidden">
            
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500" />

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Google Auth Button */}
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
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                  Or with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <LabelInputContainer>
                <label className="text-xs font-bold text-slate-700">Email address</label>
                <AceternityInput
                  type="email"
                  placeholder="demo@anvesh.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset email sent.')}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Forgot password?
                  </button>
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

              <div className="relative group/btn pt-1">
                <Button
                  type="submit"
                  variant="noise"
                  disabled={isLoading}
                  className="w-full justify-center font-bold text-sm py-3 mt-2 shadow-lg shadow-brand-500/25"
                >
                  Sign In
                </Button>
                <BottomGradient />
              </div>
            </form>

            {/* Switch to Signup */}
            <div className="text-center pt-2 text-xs text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-bold text-brand-600 hover:text-brand-700">
                Create free account
              </Link>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-[11px] text-slate-500">
                Demo account: <strong className="text-slate-800">demo@anvesh.ai</strong> &bull; Password: <strong className="text-slate-800">CandidatePass123!</strong>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
