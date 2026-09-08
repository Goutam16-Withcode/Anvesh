import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class RolesService {
  private rolesData: any[] = [];

  constructor() {
    this.loadRoles();
  }

  private loadRoles() {
    try {
      const taxonomyPath = path.resolve(process.cwd(), '../data/taxonomy/roles.json');
      if (fs.existsSync(taxonomyPath)) {
        const raw = fs.readFileSync(taxonomyPath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.rolesData = parsed.roles || [];
      } else {
        this.rolesData = this.getDefaultRoles();
      }
    } catch (e) {
      this.rolesData = this.getDefaultRoles();
    }
  }

  private getDefaultRoles() {
    return [
      {
        id: 'role_ai_eng_01',
        title: 'AI Engineer',
        family: 'Artificial Intelligence',
        description: 'Designs, implements, and serves neural networks, LLM agents, and deep learning pipelines in production.',
        core_skills: ['Python', 'PyTorch', 'Transformers', 'Qdrant Vector DB', 'FastAPI'],
        adjacent_roles: ['Machine Learning Engineer', 'MLOps Engineer', 'NLP Engineer'],
        market_demand_level: 'VERY_HIGH',
        median_salary: 175000,
      },
      {
        id: 'role_ml_eng_01',
        title: 'Machine Learning Engineer',
        family: 'Artificial Intelligence',
        description: 'Develops tabular, recommendation, and deep learning models with scalable feature engineering and ranking pipelines.',
        core_skills: ['Python', 'PyTorch', 'LightGBM', 'Docker', 'SQL'],
        adjacent_roles: ['AI Engineer', 'MLOps Engineer', 'Data Scientist'],
        market_demand_level: 'HIGH',
        median_salary: 162000,
      },
      {
        id: 'role_mlops_01',
        title: 'MLOps Engineer',
        family: 'Infrastructure & ML',
        description: 'Automates the CI/CD, deployment, container orchestration, monitoring, and scaling of machine learning systems.',
        core_skills: ['Python', 'Docker', 'Kubernetes', 'AWS', 'FastAPI', 'MLflow'],
        adjacent_roles: ['Machine Learning Engineer', 'DevOps Engineer', 'Cloud Architect'],
        market_demand_level: 'VERY_HIGH',
        median_salary: 168000,
      },
      {
        id: 'role_backend_eng_01',
        title: 'Senior Backend Engineer',
        family: 'Software Engineering',
        description: 'Architects resilient, high-throughput microservices, API gateways, database schemas, and distributed caches.',
        core_skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
        adjacent_roles: ['MLOps Engineer', 'AI Engineer', 'Fullstack Engineer'],
        market_demand_level: 'HIGH',
        median_salary: 155000,
      },
    ];
  }

  async getAllRoles() {
    return this.rolesData;
  }

  async discoverRoles(userSkills: string[] = ['Python', 'PyTorch', 'FastAPI']) {
    const normalizedUserSkills = new Set(userSkills.map((s) => s.toLowerCase()));

    return this.rolesData.map((role) => {
      const coreSkills: string[] = role.core_skills || [];
      const matchingSkills = coreSkills.filter((skill) =>
        normalizedUserSkills.has(skill.toLowerCase()) ||
        Array.from(normalizedUserSkills).some((us) => skill.toLowerCase().includes(us) || us.includes(skill.toLowerCase())),
      );
      const gapSkills = coreSkills.filter((skill) => !matchingSkills.includes(skill));
      const affinityScore = coreSkills.length > 0 ? +(matchingSkills.length / coreSkills.length).toFixed(2) : 0.5;

      return {
        role_id: role.id,
        title: role.title,
        family: role.family,
        description: role.description,
        affinity_score: Math.min(1.0, affinityScore + 0.2), // base affinity boost
        matching_skills: matchingSkills,
        gap_skills: gapSkills,
        market_demand_index: role.market_demand_level || 'HIGH',
        median_salary: role.median_salary || 160000,
      };
    }).sort((a, b) => b.affinity_score - a.affinity_score);
  }
}
