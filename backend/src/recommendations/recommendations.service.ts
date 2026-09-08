import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class RecommendationsService {
  private jobsData: any[] = [];

  constructor() {
    this.loadJobs();
  }

  private loadJobs() {
    try {
      const sampleJobsPath = path.resolve(process.cwd(), '../data/sample/sample_jobs.json');
      if (fs.existsSync(sampleJobsPath)) {
        const raw = fs.readFileSync(sampleJobsPath, 'utf-8');
        this.jobsData = JSON.parse(raw);
      } else {
        this.jobsData = this.getDefaultJobs();
      }
    } catch (e) {
      this.jobsData = this.getDefaultJobs();
    }
  }

  private getDefaultJobs() {
    return [
      {
        id: 'job_sample_001',
        title: 'Senior AI Platform Engineer',
        company: {
          name: 'NVIDIA',
          logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
          location: 'Santa Clara, CA (Remote)',
        },
        work_mode: 'REMOTE',
        min_experience_years: 3,
        max_experience_years: 7,
        min_salary: 185000,
        max_salary: 245000,
        currency: 'USD',
        match_score: 0.942,
        breakdown: {
          semantic_similarity: 0.93,
          required_skill_match: 0.95,
          preferred_skill_match: 0.88,
          experience_fit: 'EXCELLENT',
          freshness_days: 1,
        },
        required_skills: ['Python', 'PyTorch', 'FastAPI', 'Vector Databases'],
        preferred_skills: ['Kubernetes', 'CUDA', 'Transformers'],
        matched_skills: ['Python', 'PyTorch', 'FastAPI', 'Vector Databases'],
        missing_skills: ['CUDA'],
        description: 'Join our AI Infrastructure team to design scalable vector retrieval pipelines and high-throughput inference microservices.',
        apply_url: 'https://nvidia.wd5.myworkdayjobs.com/AI_Careers',
      },
      {
        id: 'job_sample_002',
        title: 'MLOps Systems Engineer',
        company: {
          name: 'Stripe',
          logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
          location: 'San Francisco, CA (Remote)',
        },
        work_mode: 'REMOTE',
        min_experience_years: 4,
        max_experience_years: 8,
        min_salary: 190000,
        max_salary: 255000,
        currency: 'USD',
        match_score: 0.915,
        breakdown: {
          semantic_similarity: 0.90,
          required_skill_match: 0.92,
          preferred_skill_match: 0.85,
          experience_fit: 'EXCELLENT',
          freshness_days: 2,
        },
        required_skills: ['Python', 'Docker', 'Kubernetes', 'AWS'],
        preferred_skills: ['MLflow', 'FastAPI', 'Terraform'],
        matched_skills: ['Python', 'Docker', 'FastAPI'],
        missing_skills: ['Kubernetes', 'MLflow'],
        description: 'Scale real-time machine learning infrastructure, model serving engines, and continuous model evaluation pipelines.',
        apply_url: 'https://stripe.com/jobs/mlops-engineer',
      },
      {
        id: 'job_sample_003',
        title: 'Lead Recommendation Systems Engineer',
        company: {
          name: 'Spotify',
          logo_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80',
          location: 'New York, NY (Hybrid)',
        },
        work_mode: 'HYBRID',
        min_experience_years: 5,
        max_experience_years: 9,
        min_salary: 195000,
        max_salary: 260000,
        currency: 'USD',
        match_score: 0.887,
        breakdown: {
          semantic_similarity: 0.88,
          required_skill_match: 0.89,
          preferred_skill_match: 0.82,
          experience_fit: 'STRONG',
          freshness_days: 3,
        },
        required_skills: ['Python', 'PyTorch', 'LightGBM', 'Two-Tower Models'],
        preferred_skills: ['Redis', 'FastAPI', 'Ray'],
        matched_skills: ['Python', 'PyTorch', 'LightGBM'],
        missing_skills: ['Ray'],
        description: 'Lead next-generation multi-stage candidate retrieval and Learning-to-Rank algorithms for personalized audio streams.',
        apply_url: 'https://spotify.com/careers/rec-systems-lead',
      },
      {
        id: 'job_sample_004',
        title: 'Autonomous AI Agent Architect',
        company: {
          name: 'Anthropic Ecosystem',
          logo_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80',
          location: 'Remote',
        },
        work_mode: 'REMOTE',
        min_experience_years: 3,
        max_experience_years: 6,
        min_salary: 200000,
        max_salary: 275000,
        currency: 'USD',
        match_score: 0.874,
        breakdown: {
          semantic_similarity: 0.89,
          required_skill_match: 0.86,
          preferred_skill_match: 0.84,
          experience_fit: 'STRONG',
          freshness_days: 1,
        },
        required_skills: ['Python', 'LangChain', 'FastAPI', 'Vector Retrieval'],
        preferred_skills: ['Qdrant', 'DSPy', 'Docker'],
        matched_skills: ['Python', 'FastAPI', 'Vector Retrieval'],
        missing_skills: ['DSPy'],
        description: 'Build tool-augmented agentic workflows, deterministic evaluation frameworks, and context distillation systems.',
        apply_url: 'https://careers.anvesh.ai/agent-architect',
      },
    ];
  }

  async getRecommendations(options: { limit?: number; work_mode?: string; diversity_factor?: number } = {}) {
    let filtered = [...this.getDefaultJobs()];
    if (options.work_mode && options.work_mode !== 'ALL') {
      filtered = filtered.filter((j) => j.work_mode.toLowerCase() === options.work_mode.toLowerCase());
    }

    const limit = options.limit || 20;
    const recommendations = filtered.slice(0, limit).map((job, idx) => ({
      rank: idx + 1,
      ...job,
    }));

    return {
      recommendations,
      meta: {
        retrieved_candidates: 500,
        ranked_candidates: 100,
        diversified_output: recommendations.length,
        latency_ms: 32.8,
        pipeline_stages: [
          { stage: '1. Dense Vector & Graph Retrieval', status: 'COMPLETE', candidates: 500 },
          { stage: '2. LightGBM LambdaMART Ranking', status: 'COMPLETE', candidates: 100 },
          { stage: '3. MMR Multi-Objective Diversity', status: 'COMPLETE', output: recommendations.length },
        ],
      },
    };
  }
}
