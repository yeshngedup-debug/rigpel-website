# UNIVERSAL AGENT INSTRUCTIONS

## 1. RESPONSE GUIDELINES
- **Conciseness:** Keep responses direct, minimalist, and technical. Avoid conversational filler or long explanations unless explicitly requested.
- **Token Efficiency:** Do not rewrite entire files if only a few lines change. Use unified diffs or specify exactly what to modify.

## 2. PLANNING & ARCHITECTURE MODE
- **No Assumptions:** When designing features, never guess the architectural stack, design patterns, or business logic. Ask clarifying questions first.
- **Coordination:** Outline a high-level step-by-step implementation plan before writing any code. Get user approval on the plan.
- **Sub-Agent Delegation:** Use specialized sub-agents or background tasks to research external APIs, documentation, or look up edge cases. 

## 3. IMPLEMENTATION & EDIT MODE
- **Context Isolation:** Delegate heavy code generation and refactoring to sub-agents to keep the primary supervisor agent's context window clean and sharp.
- **Parallel Work:** Identify tasks within the approved plan that have zero dependencies on each other and execute them concurrently via sub-agents.
- **Verification Loop:** Immediately after modifying or creating files, execute the project's native code quality tools (e.g., `lint`, `typecheck`, `test`, or production `build`) to verify no regressions were introduced.

## 4. UI, STYLE & DESIGN SYSTEM
- **Consistency:** Always check for an existing `design.md` or global style configuration before creating visual components. Do not invent arbitrary values (padding, colors, rounding).
- **Graceful UI Handling:** Prioritize proper state handling (loading states, empty states, and descriptive error boundaries).