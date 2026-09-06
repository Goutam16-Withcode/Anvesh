# 🔌 ANVESH: OpenAPI & REST API Specification

**Base URL**: `http://localhost:8000/api/v1`  
**Authentication**: Bearer Token (`Authorization: Bearer <JWT>`)

---

## 1. Authentication Endpoints (`/auth`)

### `POST /auth/register`
Creates a new candidate or recruiter account.
- **Request Body**:
  ```json
  {
    "email": "goutam@example.com",
    "password": "SecurePassword123!",
    "full_name": "Goutam Anvesh",
    "role_type": "candidate"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "user_id": "4a72d3f9-74d1-4177-bc60-0d32f7ab6bc1",
    "email": "goutam@example.com",
    "full_name": "Goutam Anvesh",
    "created_at": "2026-09-06T12:00:00Z"
  }
  ```

### `POST /auth/login`
Authenticates credentials and returns JWT Bearer token.
- **Request Body**: `OAuth2PasswordRequestForm` (`username`, `password`)
- **Response `200 OK`**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "token_type": "bearer",
    "expires_in": 86400
  }
  ```

---

## 2. Resume & Profile Intelligence (`/resume`, `/profile`)

### `POST /resume/upload`
Uploads raw resume file for deterministic parsing and vector extraction.
- **Request**: `multipart/form-data` with `file: resume.pdf`
- **Response `200 OK`**:
  ```json
  {
    "profile_id": "59b4c0e6-992a-4f51-b0db-f076c8c32d48",
    "parsed_data": {
      "headline": "Senior Machine Learning Engineer",
      "years_of_experience": 4.5,
      "extracted_skills": [
        {"name": "Python", "canonical_id": "c1f7a4...", "years": 4.5, "verified": true},
        {"name": "PyTorch", "canonical_id": "d2e8b5...", "years": 3.0, "verified": true},
        {"name": "FastAPI", "canonical_id": "e3f9c6...", "years": 2.5, "verified": true}
      ],
      "education": [
        {"degree": "B.Tech in Computer Science", "institution": "Tech University", "year": 2022}
      ],
      "experience_summary": "4.5 years building distributed ML systems and real-time inference APIs."
    },
    "embedding_generated": true
  }
  ```

### `GET /profile/me`
Retrieves full structured profile and verified skill vector.

---

## 3. Role Discovery Engine (`/roles`)

### `GET /roles/discover`
Discovers matching career roles given the user's active skill graph.
- **Response `200 OK`**:
  ```json
  {
    "discovered_roles": [
      {
        "role_id": "r101",
        "title": "AI Engineer",
        "affinity_score": 0.94,
        "matching_skills": ["Python", "PyTorch", "FastAPI", "NLP"],
        "gap_skills": ["CUDA", "TensorRT", "LangChain"],
        "market_demand_index": "VERY_HIGH"
      },
      {
        "role_id": "r102",
        "title": "MLOps Engineer",
        "affinity_score": 0.86,
        "matching_skills": ["Python", "FastAPI", "Docker"],
        "gap_skills": ["Kubernetes", "MLflow", "Terraform"],
        "market_demand_index": "HIGH"
      }
    ]
  }
  ```

---

## 4. Multi-Stage Recommendation Engine (`/recommendations`)

### `GET /recommendations/feed`
Executes hybrid retrieval, LightGBM ranking, and MMR diversification.
- **Query Params**:
  - `limit`: `20` (default)
  - `work_mode`: `REMOTE` (optional filter)
  - `diversity_factor`: `0.35`
- **Response `200 OK`**:
  ```json
  {
    "recommendations": [
      {
        "rank": 1,
        "job_id": "7b8e1f02-...",
        "title": "Senior AI Systems Engineer",
        "company": {
          "name": "NVIDIA",
          "logo_url": "https://cdn.anvesh.ai/logos/nvidia.png",
          "location": "Santa Clara, CA (Remote)"
        },
        "match_score": 0.932,
        "breakdown": {
          "semantic_similarity": 0.91,
          "required_skill_match": 0.88,
          "preferred_skill_match": 0.80,
          "experience_fit": "EXCELLENT",
          "freshness_days": 2
        },
        "matched_skills": ["Python", "PyTorch", "Distributed Systems"],
        "missing_skills": ["Triton Inference Server"],
        "compensation": {
          "min": 180000,
          "max": 240000,
          "currency": "USD"
        },
        "apply_url": "https://nvidia.wd5.myworkdayjobs.com/..."
      }
    ],
    "meta": {
      "retrieved_candidates": 500,
      "ranked_candidates": 100,
      "diversified_output": 20,
      "latency_ms": 34.2
    }
  }
  ```

---

## 5. What-If Counterfactual Simulation (`/what-if`)

### `POST /what-if/simulate`
Simulates counterfactual career outcomes given skill acquisitions.
- **Request Body**:
  ```json
  {
    "add_skills": ["Kubernetes", "Go", "MLflow"],
    "target_location": "REMOTE"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "simulation": {
      "current_opportunity_count": 182,
      "simulated_opportunity_count": 278,
      "delta_opportunities": 96,
      "percentage_increase": 52.75,
      "current_median_salary": 140000,
      "simulated_median_salary": 168000,
      "salary_delta": 28000,
      "newly_unlocked_roles": [
        {"title": "ML Platform Engineer", "match_score": 0.89},
        {"title": "Cloud AI Architect", "match_score": 0.82}
      ],
      "top_unlocked_jobs": [
        {
          "job_id": "8f3b...",
          "title": "ML Platform Engineer",
          "company": "Stripe",
          "match_score_now": 0.91,
          "match_score_before": 0.58
        }
      ]
    }
  }
  ```

---

## 6. AI Career Agent (`/agent`)

### `POST /agent/chat`
Converses with the tool-augmented autonomous career agent.
- **Request Body**:
  ```json
  {
    "session_id": "sess-994",
    "message": "Which high-paying roles can I target if I already know Python and PyTorch?"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "response": "Based on your verified skills (Python, PyTorch, FastAPI), you match strongly with **AI Engineer** (94% match) and **Computer Vision Engineer** (82% match). If you add **Kubernetes**, you will unlock 96 additional high-paying MLOps opportunities with a median compensation of $168,000/yr.",
    "executed_tools": [
      {
        "tool": "discover_roles",
        "inputs": {"skills": ["Python", "PyTorch", "FastAPI"]}
      },
      {
        "tool": "simulate_skill",
        "inputs": {"added_skills": ["Kubernetes"]}
      }
    ],
    "suggested_actions": [
      {"label": "Simulate Kubernetes in What-If", "action": "OPEN_WHAT_IF", "param": "Kubernetes"},
      {"label": "View Top AI Engineer Jobs", "action": "FILTER_ROLE", "param": "AI Engineer"}
    ]
  }
  ```

---

## 7. User Telemetry & Feedback (`/feedback`)

### `POST /feedback/interaction`
Logs candidate interaction telemetry to update real-time behavior affinity models.
- **Request Body**:
  ```json
  {
    "job_id": "7b8e1f02-...",
    "interaction_type": "CLICK",
    "rank_position": 1,
    "dwell_time_seconds": 24
  }
  ```
- **Response `200 OK`**:
  ```json
  {"status": "recorded"}
  ```
