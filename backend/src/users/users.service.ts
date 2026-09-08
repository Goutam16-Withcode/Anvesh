import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private userProfiles = new Map<string, any>();

  constructor() {
    this.userProfiles.set('demo@anvesh.ai', {
      user_id: 'usr_demo_001',
      email: 'demo@anvesh.ai',
      full_name: 'Goutam Anvesh',
      role_type: 'candidate',
      headline: 'Senior AI & Machine Learning Systems Engineer',
      years_of_experience: 4.5,
      location: 'San Francisco, CA (Remote)',
      preferred_work_mode: 'REMOTE',
      target_min_salary: 175000,
      extracted_skills: [
        { name: 'Python', canonical_id: 'skill_py_01', years: 4.5, verified: true, level: 'Expert' },
        { name: 'PyTorch', canonical_id: 'skill_pytorch_01', years: 3.5, verified: true, level: 'Advanced' },
        { name: 'FastAPI', canonical_id: 'skill_fastapi_01', years: 3.0, verified: true, level: 'Advanced' },
        { name: 'Vector Databases', canonical_id: 'skill_qdrant_01', years: 2.0, verified: true, level: 'Advanced' },
        { name: 'Docker', canonical_id: 'skill_docker_01', years: 3.0, verified: true, level: 'Intermediate' },
      ],
      education: [{ degree: 'B.Tech in Computer Science', institution: 'National Institute of Tech', year: 2022 }],
    });
  }

  async getProfile(email: string) {
    return (
      this.userProfiles.get(email) || {
        user_id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email,
        full_name: 'Candidate User',
        headline: 'Software Engineer & AI Enthusiast',
        years_of_experience: 3.0,
        preferred_work_mode: 'REMOTE',
        extracted_skills: [
          { name: 'Python', years: 3.0, verified: true, level: 'Advanced' },
          { name: 'FastAPI', years: 2.0, verified: true, level: 'Intermediate' },
          { name: 'SQL', years: 3.0, verified: true, level: 'Advanced' },
        ],
      }
    );
  }

  async updateProfile(email: string, updateData: any) {
    const existing = await this.getProfile(email);
    const updated = { ...existing, ...updateData, updated_at: new Date().toISOString() };
    this.userProfiles.set(email, updated);
    return updated;
  }
}
