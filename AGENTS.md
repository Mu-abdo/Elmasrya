# Website design and development guidelines

These instructions apply to website work in this repository. They are deliberately independent of any framework, brand, service, or AI tool. Follow the user's explicit requirements first. Adapt the recommendations to the task rather than applying them mechanically.

## Understand the work

- Read the existing code, project documentation, and relevant assets before changing a website.
- Identify the audience, main visitor task, requested scope, brand, and technical constraints from the available context.
- Ask focused questions only when missing information materially changes the result. Do not repeat questions already answered or block routine changes with a questionnaire.
- Keep changes proportional to the request. Do not redesign unrelated pages or add features without a reason.
- Use relevant available design and development skills when requested or helpful. Never claim to have used a skill that is unavailable.

## Design direction

- Before a substantial redesign, state a short direction covering layout, palette, typography, imagery, and the main user action.
- Ground the design in the actual industry, audience, and content. Avoid generic filler, invented metrics, unsupported claims, and decorative interface elements without a purpose.
- Preserve established brand assets and visual conventions unless the user requests a change.
- Choose a coherent palette and type scale. Reuse existing design tokens; introduce new ones deliberately.
- Use readable line lengths, clear hierarchy, consistent spacing, and restrained decoration. Apply cards, shadows, gradients, and animation only when they help the design.
- Keep requested fonts consistent across headings, body text, buttons, and form controls. Provide appropriate fallback fonts.
- Use supplied or approved imagery where possible. Do not distort images or misrepresent stock imagery as the client's actual facilities or products.
- For exploratory work, offer a small number of meaningful alternatives when useful or requested. Do not build several complete versions by default.

## User experience and accessibility

- Give each page a clear purpose and make its main action easy to find.
- Use consistent navigation and clear labels that describe the action or destination.
- Use semantic HTML, a logical heading hierarchy, useful image descriptions, and explicit form labels.
- Support keyboard navigation and visible focus states. Interactive elements must work without hover alone.
- Maintain readable text contrast and comfortable touch targets. Respect reduced-motion preferences.
- Check menus, overlays, dialogs, and sticky headers for stacking, scrolling, and clickability problems.
- For dialogs and drawers, provide an obvious close action, Escape support where appropriate, and suitable focus behavior. Avoid allowing keyboard focus into hidden controls.
- Design loading, empty, error, and success states when the requested feature needs them. Explain what users can do next.

## Responsive design and language

- Make layouts usable on narrow phones, tablets, and desktop screens. Avoid accidental horizontal scrolling, clipped content, and overlapping controls.
- Let content determine breakpoints. Check long labels, large text, and real content rather than only ideal placeholder text.
- For Arabic pages, use the correct document language and RTL direction. Prefer logical CSS properties for direction-sensitive spacing and positioning.
- Keep phone numbers, email addresses, and technical identifiers readable with appropriate LTR treatment.
- Review spelling, grammar, punctuation, terminology, and naming consistency. Preserve proper names and factual specifications unless a correction is authorized.
- Match the site's voice. Avoid unnecessary marketing filler and untranslated interface labels.

## Implementation

- Follow the project's established framework, file structure, and coding conventions.
- Prefer the simplest implementation that satisfies the task. Do not introduce a framework or dependency for a change that existing HTML, CSS, or JavaScript can handle well.
- Keep shared styles and behavior reusable, with deliberate selector specificity. Scope experiments so they do not unexpectedly change other pages.
- Keep files reasonably focused. Split by responsibility when it improves maintainability; do not impose arbitrary file-size rules.
- Preserve existing working functionality, content, links, and integrations unless a change is requested.
- Protect credentials and private data. Do not place secrets in client code or commit them to version control.
- Optimize images and avoid unnecessary scripts or assets. Add image dimensions where appropriate and lazy-load noncritical imagery.
- Never expose implementation notes, development controls, or experimental panels in the production interface unless explicitly requested.

## Revisions and version history

- Inspect repository status before editing. Preserve unrelated user changes.
- Use version control to keep changes reviewable and reversible. If version control is unavailable, keep a clearly named backup outside the published page set before a substantial replacement.
- Do not generate duplicate public HTML pages for every small revision.
- When asked to restore a design, restore the intended visual version while retaining independent fixes the user still wants.
- Do not publish, push, or deploy solely because a file was edited. Follow the user's authorization and established workflow for the project.

## Verification and delivery

- Run checks appropriate to the change: document structure, local assets and links, relevant scripts, and existing project checks where applicable.
- When browser preview is available, inspect a representative desktop and mobile layout and exercise the interactions affected by the change.
- Check visual hierarchy, image cropping, spacing, readability, and overlay behavior against the brief. Revise observed problems before delivery.
- Do not describe static checks as visual verification. If preview or testing is unavailable, state the limitation clearly.
- Report the concrete result, relevant validation, and material remaining limitations briefly. Include the file or preview link when available.
- Do not claim deployment succeeded without a successful result from the publishing workflow.

## Reuse in another project

Copy this file to the new repository root as `AGENTS.md`. Keep project-specific details in the project's README or DESIGN.md, and consult them alongside these rules. Add a nested AGENTS.md only when a subdirectory needs more specific guidance.

This file provides instructions to coding assistants that support AGENTS.md. It does not execute code, install tools, or automatically configure unrelated projects. For other assistants, provide it as the project's instruction document using the mechanism they support.
