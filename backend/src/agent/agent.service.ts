import { Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class AgentService {
  async chat(dto: ChatDto) {
    const query = dto.message.toLowerCase();

    let responseText =
      'Based on our multi-stage recommendation index and canonical skill graph ontology, your profile displays high affinity for **Senior AI Platform Engineer** (94.2% match) and **MLOps Systems Engineer** (91.5% match).';

    let executedTools = [
      {
        tool: 'ontology_skill_graph_lookup',
        inputs: { query: dto.message },
        latency_ms: 12.4,
      },
      {
        tool: 'qdrant_vector_candidate_retrieval',
        inputs: { top_k: 500, rerank_top: 20 },
        latency_ms: 21.6,
      },
    ];

    let suggestedActions = [
      { label: 'Simulate Kubernetes in What-If', action: 'OPEN_WHAT_IF', param: 'Kubernetes' },
      { label: 'View Top NVIDIA AI Jobs', action: 'VIEW_JOB', param: 'job_sample_001' },
      { label: 'Explore AI Engineer Skill Gap', action: 'EXPLORE_GAP', param: 'role_ai_eng_01' },
    ];

    if (query.includes('salary') || query.includes('pay') || query.includes('compensation')) {
      responseText =
        'Top quartile compensations for AI Engineering and MLOps roles currently range from **$185,000 to $260,000 USD** base. Adding specialized skills like **CUDA kernel optimization** or **Kubernetes distributed training** correlates with a +$25,000 median salary increase.';
    } else if (query.includes('what-if') || query.includes('learn') || query.includes('skill')) {
      responseText =
        'Running our counterfactual simulation engine: acquiring **Kubernetes** and **Go** unlocks 96 additional high-growth positions with top companies like Stripe and NVIDIA, increasing your overall market opportunity count by **+52.8%**.';
    }

    return {
      session_id: dto.session_id || 'sess_' + Math.random().toString(36).substring(2, 9),
      response: responseText,
      executed_tools: executedTools,
      suggested_actions: suggestedActions,
      timestamp: new Date().toISOString(),
    };
  }
}
