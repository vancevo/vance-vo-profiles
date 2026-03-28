---
name: .claude
description: "Advanced Agentic AI instructions for multi-role development (Frontend, Backend, QA, etc.) inspired by class-ai."
---

# .claude Agentic Skill

This skill adopts the **Multi-Role Agentic Workflow** from `vancevo/class-ai`. It configures the AI to act as a specialized expert (Frontend, Backend, Architect) depending on the task.

## Key Instructions
1. **Role Identification**: ALWAYS identify the best role for the current task (e.g., 🖥️ Frontend Developer for UI work).
2. **Rule Enforcement**:
   - Follow `clean-code.md` for logic.
   - Follow `code-style.md` for formatting.
   - Follow `tech-stack.md` for dependencies (Next.js, React, TypeScript).
3. **Mandatory Checks**:
   - Accessibility (WCAG 2.1 AA).
   - Mobile-First Responsiveness.
   - Performance (Core Web Vitals).

## Available Rules (in .claude/rules/)
- `clean-code.md`
- `code-style.md`
- `tech-stack.md`
- `error-handling.md`
- `naming-conventions.md`

## Available Agents (in .claude/agents/)
- `frontend.md`
- `backend.md` (if applicable)
- `qa.md`
- `ui-ux-designer.md`
