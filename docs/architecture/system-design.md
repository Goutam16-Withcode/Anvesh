# 🏗️ ANVESH: System Design & Architecture Specification

## 1. Executive Summary

**ANVESH** is a high-throughput, AI-powered global career discovery and multi-stage recommendation ecosystem. The platform addresses fundamental shortcomings in modern talent discovery platforms:
1. **Semantic Blindness**: Keyword matching fails to understand transferable skills and adjacent domain knowledge.
2. **Black-box Hallucinations**: Pure LLM-based solutions hallucinate non-existent jobs or fabricate match percentages without reproducible empirical grounding.
3. **Passive Search Paradigms**: Current platforms expect users to already know what role title to search for, failing candidates exploring career transitions.

ANVESH solves this through a decoupled, multi-stage recommendation engine, an ontological skill knowledge graph, a counterfactual What-If simulation engine, and an autonomous AI agent constrained by deterministic tool calls.

---

## 2. End-to-End System Topology

```mermaid
flowchart TB
    subgraph ClientLayer ["1. Client Layer"]
        NextClient["Next.js 14 Web Application<br/>(React Server Components / Dynamic Dashboards)"]
    end

    subgraph APIGateway ["2. API Gateway & Security Layer"]
        Gateway["FastAPI Gateway<br/>(JWT Auth, Rate Limiter, Request Validator)"]
    end

    NextClient <-->|REST API / SSE / WebSockets| Gateway

    subgraph ServicesLayer ["3. Microservices Subsystems Layer"]
        direction TB
        PIS["Profile Intelligence Service<br/>(Resume Parser & Skill Extractor)"]
        RDS["Role Discovery Service<br/>(Ontology & Semantic Role Mapper)"]
        JIS["Global Job Intelligence Service<br/>(Ingestion, Normalizer, Dedup)"]
        REC["Multi-Stage Recommendation Engine<br/>(Retrieval, LTR Ranker, MMR Reranker)"]
        WIE["What-If Simulation Engine<br/>(Counterfactual Career Modeler)"]
        AGT["AI Career Agent Orchestrator<br/>(LangChain Agent + Tools)"]
    end

    Gateway --> PIS
    Gateway --> RDS
    Gateway --> JIS
    Gateway --> REC
    Gateway --> WIE
    Gateway --> AGT

    subgraph IntelligenceEngines ["4. Analytics & Knowledge Engines"]
        SkillGraph["Skill Knowledge Graph<br/>(NetworkX / Prerequisite DAG)"]
        LTRModel["LightGBM Ranker<br/>(LambdaMART NDCG@10)"]
        Embedder["Sentence Transformer<br/>(all-MiniLM-L6-v2)"]
    end

    PIS <--> Embedder
    RDS <--> SkillGraph
    REC <--> LTRModel
    REC <--> Embedder
    WIE <--> SkillGraph
    WIE <--> REC
    AGT <--> REC
    AGT <--> WIE

    subgraph StorageLayer ["5. Storage & Persistence Tier"]
        Postgres[("PostgreSQL 16<br/>Profiles, Jobs, Skills, Interactions")]
        QdrantDB[("Qdrant Vector DB<br/>Job, Profile & Role Embeddings")]
        RedisCache[("Redis 7<br/>Session Store & Rate Limit Cache")]
    end

    PIS --> Postgres & QdrantDB
    JIS --> Postgres & QdrantDB
    REC --> Postgres & QdrantDB & RedisCache
    WIE --> Postgres & QdrantDB
```

---

## 3. Subsystem Deep Dives

### 3.1. Profile Intelligence Service (PIS)

The Profile Intelligence Service ingests raw candidate resumes and converts unstructured textual narratives into structured candidate intelligence representations.

```mermaid
flowchart LR
    RawDoc["Raw Resume<br/>(PDF / DOCX / TXT)"] --> TextExtract["Text & Section Extractor<br/>(pdfminer / python-docx)"]
    TextExtract --> NER["Named Entity Recognizer<br/>(spaCy NER + Rule Regex)"]
    NER --> Norm["Skill Canonicalizer<br/>(Taxonomy Mapper)"]
    Norm --> ExpModel["Experience & Trajectory Extractor"]
    ExpModel --> ProfileObj["Structured Candidate Profile JSON"]
    ProfileObj --> VectorEncoder["Profile Dense Encoder<br/>(all-MiniLM-L6-v2)"]
    VectorEncoder --> DBStore[("PostgreSQL & Qdrant")]
```

#### Key Responsibilities:
1. **Section Segmentation**: Identifies and separates *Work Experience*, *Education*, *Projects*, *Skills*, and *Certifications*.
2. **Skill Normalization**: Employs an exact-match and phonetic/Levenshtein matching against canonical skill IDs in `skills.json`.
3. **Experience Calculation**: Accurately computes total years of professional experience, seniority level (Junior, Mid, Senior, Lead, Staff), and recency of each skill.
4. **Dense Vector Generation**: Produces a unified 384-dimensional profile vector encoding both explicit skills and implicit career context.

---

### 3.2. Global Job Intelligence Subsystem (JIS)

The Global Job Intelligence Subsystem continuously ingests, validates, normalizes, deduplicates, and indexes job postings from permitted feeds, ATS integrations, and partner APIs.

```mermaid
flowchart TD
    subgraph Sources ["Ingestion Sources"]
        S1["Partner Job APIs"]
        S2["Company ATS Webhooks"]
        S3["Permitted RSS/XML Feeds"]
    end

    Sources --> IngestionWorker["Async Ingestion Worker<br/>(Celery Distributed Task)"]
    IngestionWorker --> SchemaValidate["JSON Schema Validation<br/>(Pydantic Job Model)"]
    SchemaValidate --> Normalizer["Entity Normalizer<br/>(Title, Company, Skills, Location)"]
    Normalizer --> Dedup["Deduplication Engine<br/>(MinHash LSH & Domain Matching)"]
    Dedup --> Freshness["Freshness & Quality Scorer<br/>(Decay Half-Life Score)"]
    Freshness --> DualWrite["Transactional Sync"]
    DualWrite --> PG[("PostgreSQL 16")]
    DualWrite --> QDR[("Qdrant Vectors")]
```

#### Deduplication & Freshness Rules:
- **MinHash LSH Deduplication**: Hashes job title + company domain + normalized description n-grams. When Jaccard similarity $> 0.88$ with an existing listing within 14 days, the record is merged rather than duplicated.
- **Freshness Score**: Computed as:
  $$\text{Freshness}(t) = \exp\left(-\frac{\ln(2) \cdot (t_{\text{current}} - t_{\text{posted}})}{\tau_{1/2}}\right)$$
  where $\tau_{1/2} = 30\text{ days}$. Jobs older than 60 days are demoted or archived.

---

### 3.3. Multi-Stage Recommendation Subsystem (REC)

The recommendation engine executes a 4-stage retrieval, ranking, and diversification pipeline:

```mermaid
flowchart TD
    UserQuery["Candidate Profile Vector + Active Preferences"] --> RetUnion["1. Candidate Retrieval (Union Pool)"]

    subgraph CandidateRetrieval ["Candidate Retrieval Channels (1000s -> 500)"]
        RetVec["Vector Retrieval (Qdrant)<br/>Cosine Distance HNSW"]
        RetSkill["Skill Graph Match<br/>Hard Req + Preferred Overlap"]
        RetGraph["Graph Traversal<br/>Target Role Taxonomy Expansion"]
    end

    RetUnion --> RetVec
    RetUnion --> RetSkill
    RetUnion --> RetGraph

    RetVec & RetSkill & RetGraph --> MergePool["Deduplicated Candidate Pool (Top 500)"]

    subgraph RankingPhase ["2. Machine Learning Ranking Engine"]
        FeatGen["Feature Store & Generator<br/>(12 Explicit & Interaction Features)"]
        LightGBMRanker["LightGBM Ranker<br/>(LambdaMART Pointwise/Pairwise)"]
        MergePool --> FeatGen --> LightGBMRanker
    end

    LightGBMRanker --> RankedList["Top 100 Relevance-Ranked Jobs"]

    subgraph ReRankingPhase ["3. Multi-Objective Re-Ranking"]
        MMR["Maximal Marginal Relevance (MMR)<br/>Relevance + Company/Role Diversity + Freshness"]
        RankedList --> MMR
    end

    MMR --> FinalOutput["Top 20 Personalized Job Recommendations"]
```

---

### 3.4. Role Discovery Subsystem (RDS)

When a candidate does not have a predefined target role or is considering pivot opportunities, the Role Discovery Subsystem compares the candidate's skill graph against global role ontologies.

```mermaid
flowchart LR
    CandidateSkills["Candidate Skill Vector"] --> GraphTraverse["Skill Graph Traversal"]
    GraphTraverse --> RoleOntology["Role Ontology Taxonomy<br/>(roles.json)"]
    RoleOntology --> SemanticRoleMatch["Dense Role Vector Matching"]
    SemanticRoleMatch --> RoleRanking["Role Affinity Scorer"]
    RoleRanking --> DiscoveredRoles["Discovered Roles<br/>(e.g., AI Engineer: 92%, MLOps: 84%, CV Engineer: 78%)"]
```

---

### 3.5. What-If Counterfactual Simulation Engine (WIE)

The What-If engine answers real-world candidate queries: *"If I invest 3 months to learn Kubernetes and Apache Kafka, how many new jobs unlock, and what is the expected market compensation shift?"*

```mermaid
flowchart TD
    CurrentState["Current User Profile $P_0$"] --> BaselineEval["Baseline Retrieval & Ranking"]
    BaselineEval --> BaseMetrics["Baseline Metrics:<br/>$N_0 = 142$ Jobs<br/>Median Salary = $125k"]

    SimInput["Simulated Skills Addition:<br/>+ [Kubernetes, Kafka]"] --> MutatedState["Mutated Profile $P_{\text{sim}}$"]
    MutatedState --> SimEval["Simulated Retrieval & Ranking"]
    SimEval --> SimMetrics["Simulated Metrics:<br/>$N_{\text{sim}} = 238$ Jobs<br/>Median Salary = $155k"]

    BaseMetrics & SimMetrics --> DeltaEngine["Deterministic Delta Engine"]
    DeltaEngine --> Output["Output Delta Object:<br/>$\Delta$ Jobs: +96 (+67.6%)<br/>$\Delta$ Salary: +$30,000<br/>New Unlocked Roles: [ML Platform Engineer, Cloud Architect]"]
```

---

### 3.6. AI Career Agent Subsystem (AGT)

The AI Career Agent provides natural-language guidance without sacrificing factual truth. It follows a strict **Tool-Augmented Reasoning Loop**.

```mermaid
flowchart TD
    UserPrompt["Candidate Chat Query"] --> AgentCore["LangChain Agent Core (Planner)"]
    AgentCore --> ToolSelect{"Tool Selection"}
    
    ToolSelect -->|Search Needed| T1["search_jobs(query, filters)"]
    ToolSelect -->|Profile Details| T2["get_profile(user_id)"]
    ToolSelect -->|Explore Roles| T3["discover_roles(skills)"]
    ToolSelect -->|Gap Analysis| T4["calculate_skill_gap(user_id, target_job_id)"]
    ToolSelect -->|Simulation| T5["simulate_skill(user_id, added_skills)"]
    ToolSelect -->|Market Intel| T6["get_market_trends(role_name)"]

    T1 & T2 & T3 & T4 & T5 & T6 --> ExecServices["Deterministic Microservice Execution"]
    ExecServices --> StructuredData["Structured Verified Data Payload"]
    StructuredData --> AgentCore
    AgentCore --> ResponseSynthesis["Response Synthesis with Actionable Job Links"]
```

---

## 4. Cross-Cutting Architectural Concerns

### 4.1. Security & Authentication
- Stateless JWT-based Bearer authentication (RS256 signed).
- Role-based Access Control (RBAC): `Candidate`, `Recruiter`, `Admin`, `ServiceWorker`.
- Strict input sanitization and Pydantic validation on all endpoints.

### 4.2. Caching & Performance
- Redis caching for candidate profile embeddings and role taxonomy vectors.
- TTL-based caching for frequent recommendation queries ($TTL = 15\text{ mins}$).
- Asynchronous non-blocking database queries via `asyncpg` and `SQLAlchemy 2.0 AsyncSession`.

### 4.3. Observability & Telemetry
- Prometheus metrics endpoint (`/metrics`) exposing:
  - `recommendation_latency_seconds` (Histogram)
  - `retrieval_candidate_count` (Histogram)
  - `job_ingestion_total` (Counter)
  - `what_if_simulations_total` (Counter)
- Structured JSON logging with correlation IDs on all requests.
