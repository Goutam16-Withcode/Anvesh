'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ChevronRight,
  User,
  LogOut,
  LayoutDashboard,
  Menu as MenuIcon,
  X,
  FileText,
  GitGraph,
  Search,
  Cpu,
  TrendingUp,
  Bot,
  Route,
  ShieldCheck,
  Activity,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Menu, MenuItem, ProductItem, HoveredLink } from './ui/navbar-menu';
import { ResizableFloatingNavbar } from './ui/floating-navbar';
import { useAuth } from '@/lib/auth-context';

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, openAuthModal, logout } = useAuth();

  return (
    <>
      <ResizableFloatingNavbar>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 animate-pulse-subtle" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                ANVESH
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-brand-50 text-brand-700 border border-brand-200/60">
                अन्वेष
              </span>
            </div>
          </div>
        </Link>

        {/* Aceternity UI Floating Navbar Menu (Desktop) */}
        <div className="hidden lg:flex items-center justify-center">
          <Menu setActive={setActive}>
            {/* Menu Item 1: Platform */}
            <MenuItem setActive={setActive} active={active} item="Platform">
              <div className="grid grid-cols-2 gap-3 w-[460px]">
                <ProductItem
                  title="Deterministic Parser"
                  description="Extracts verified experience without LLM hallucinations"
                  href="#platform"
                  icon={<FileText className="w-4 h-4" />}
                  badge="Stage 1"
                />
                <ProductItem
                  title="Canonical Skill Graph"
                  description="Standardized taxonomy normalization across variants"
                  href="#features"
                  icon={<GitGraph className="w-4 h-4" />}
                  badge="Graph DB"
                />
                <ProductItem
                  title="Qdrant Vector Retrieval"
                  description="Dense 384-d cosine similarity search across 100k+ catalog"
                  href="#features"
                  icon={<Search className="w-4 h-4" />}
                  badge="HNSW"
                />
                <ProductItem
                  title="LightGBM LambdaMART"
                  description="Pairwise Learning-to-Rank optimizing NDCG@10"
                  href="#features"
                  icon={<Cpu className="w-4 h-4" />}
                  badge="Ranker"
                />
              </div>
            </MenuItem>

            {/* Menu Item 2: Capabilities */}
            <MenuItem setActive={setActive} active={active} item="Capabilities">
              <div className="grid grid-cols-2 gap-3 w-[480px]">
                <ProductItem
                  title="What-If Simulation"
                  description="Simulate prospective skill acquisition & salary lift"
                  href="#advanced"
                  icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
                  badge="+52.8%"
                />
                <ProductItem
                  title="Autonomous Career Agent"
                  description="Tool-orchestrated LangChain assistant with verified traces"
                  href="#advanced"
                  icon={<Bot className="w-4 h-4 text-brand-600" />}
                  badge="Tools"
                />
                <ProductItem
                  title="Role Transition Pathways"
                  description="Shortest mathematical graph transitions to target roles"
                  href="#advanced"
                  icon={<Route className="w-4 h-4 text-indigo-600" />}
                />
                <ProductItem
                  title="MMR Diversity Engine"
                  description="Maximal Marginal Relevance with freshness decay scoring"
                  href="#features"
                  icon={<Layers className="w-4 h-4 text-cyan-600" />}
                />
              </div>
            </MenuItem>

            {/* Menu Item 3: Showcase & Security */}
            <MenuItem setActive={setActive} active={active} item="Showcase & Security">
              <div className="flex flex-col space-y-2 w-[240px] p-1">
                <HoveredLink href="#showcase" className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Live Interactive Sandbox</span>
                </HoveredLink>
                <HoveredLink href="#how-it-works" className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-brand-600" />
                  <span>4-Step Workflow Timeline</span>
                </HoveredLink>
                <HoveredLink href="#security" className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Enterprise Security & RBAC</span>
                </HoveredLink>
                <HoveredLink href="#faq" className="flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Frequently Asked Questions</span>
                </HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Auth & CTA Actions with Aceternity Noise Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4 text-brand-600" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center overflow-hidden border border-brand-200">
                  {user.photo_url ? (
                    <img src={user.photo_url} alt={user.full_name} className="w-full h-full object-cover" />
                  ) : (
                    user.full_name?.charAt(0) || 'U'
                  )}
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openAuthModal('login')}
                className="font-bold text-slate-700 border-slate-300 shadow-sm"
              >
                Sign In
              </Button>
              <Button
                variant="noise"
                size="sm"
                onClick={() => openAuthModal('signup')}
                className="gap-1.5 font-bold"
              >
                <span>Get Started</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </ResizableFloatingNavbar>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-20 inset-x-4 z-50 lg:hidden bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 py-1 transition-colors"
            >
              Platform Overview
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 py-1 transition-colors"
            >
              Core Hybrid Features
            </a>
            <a
              href="#advanced"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 py-1 transition-colors"
            >
              What-If & AI Agent
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 py-1 transition-colors"
            >
              Live Showcase Sandbox
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 py-1 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 py-1 transition-colors"
            >
              Security & Privacy
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 py-1 transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <div className="space-y-2">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="noise" className="w-full justify-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Dashboard</span>
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-center text-red-600" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-center font-bold"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="noise"
                  className="w-full justify-center font-bold gap-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signup');
                  }}
                >
                  <span>Get Started Free</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
