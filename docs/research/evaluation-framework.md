# 📊 ANVESH: Research Benchmark & Evaluation Framework

## 1. Overview & Research Objectives

To establish empirical rigor for academic reports and peer-reviewed publication, ANVESH incorporates a standardized offline evaluation harness to benchmark ranking models, retrieval strategies, and multi-objective diversification trade-offs.

---

## 2. Quantitative Evaluation Metrics

### 2.1. Relevance & Ranking Metrics

1. **Normalized Discounted Cumulative Gain (NDCG@K)**:
   $$\text{DCG}@K = \sum_{i=1}^K \frac{2^{y_i} - 1}{\log_2(i + 1)}, \quad \text{NDCG}@K = \frac{\text{DCG}@K}{\text{IDCG}@K}$$
   Evaluates how effectively high-relevance jobs ($y_i \in \{0, \dots, 4\}$) are ranked near the top.

2. **Mean Reciprocal Rank (MRR@K)**:
   $$\text{MRR} = \frac{1}{|\mathcal{U}|} \sum_{u=1}^{|\mathcal{U}|} \frac{1}{\text{rank}_u^*}$$
   where $\text{rank}_u^*$ is the position of the first converted (saved/applied) job posting.

3. **Recall@K & Precision@K**:
   $$\text{Recall}@K = \frac{|\mathcal{R}_K(u) \cap \mathcal{A}_u|}{|\mathcal{A}_u|}, \quad \text{Precision}@K = \frac{|\mathcal{R}_K(u) \cap \mathcal{A}_u|}{K}$$
   where $\mathcal{A}_u$ is the ground-truth set of jobs candidate $u$ applied for.

### 2.2. Diversity & Serendipity Metrics

1. **Intra-List Diversity (ILD)**:
   $$\text{ILD}(\mathcal{R}_K) = \frac{2}{K(K - 1)} \sum_{i=1}^K \sum_{j=i+1}^K \left(1 - \cos(\mathbf{v}_i, \mathbf{v}_j)\right)$$
   Measures semantic spread across recommended vacancies to ensure non-redundancy.

2. **Catalog Coverage**:
   $$\text{Coverage}@K = \frac{|\bigcup_{u \in \mathcal{U}_{\text{test}}} \mathcal{R}_K(u)|}{|\mathcal{J}|}$$
   Ensures the system does not over-concentrate recommendations on top 1% famous postings.

---

## 3. Ablation Study & Baseline Benchmark Matrix

| Model / Pipeline Variant | Retrieval Strategy | Ranking Model | Re-Ranking | Target NDCG@10 | Target Recall@20 | Target ILD | p95 Latency |
|---|---|---|---|---|---|---|---|
| **Baseline 1: Lexical** | BM25 Keyword Search | None | None | 0.412 | 0.310 | 0.380 | 8 ms |
| **Baseline 2: Vector Only** | Qdrant Dense Cosine | None | None | 0.615 | 0.540 | 0.420 | 14 ms |
| **Baseline 3: Two-Tower** | Dual Encoders (User/Job) | Dot Product | None | 0.680 | 0.612 | 0.445 | 18 ms |
| **Ablation A: Hybrid** | Vector + Skill Graph | Heuristic Sum | None | 0.724 | 0.685 | 0.470 | 22 ms |
| **Ablation B: Hybrid + LTR** | Vector + Skill Graph | LightGBM LambdaMART | None | 0.812 | 0.790 | 0.485 | 32 ms |
| **ANVESH Full System** | **Hybrid (Vec + Skill + Graph)** | **LightGBM LambdaMART** | **Multi-Objective MMR** | **0.846** | **0.825** | **0.680** | **38 ms** |

---

## 4. Evaluation Data Protocol

1. **Temporal Train/Test Split**:
   - Train Window: $T_0$ to $T - 14\text{ days}$
   - Test Window: Last 14 days of interactions (simulating true production streaming).
2. **Cold-Start Protocol**:
   - Evaluated separately on $u \in \mathcal{U}_{\text{new}}$ with $< 2$ prior interactions to prove dense semantic robustness.
