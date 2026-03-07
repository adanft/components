# Reusable Component Plan

## Goal

Create a reusable, simple, effective, and documented component for the library.

## Core principles

- Reusable: the component should be usable anywhere and remain as independent as possible.
- Simple: keep the code free of unnecessary complexity and follow KISS, DRY, and YAGNI.
- Effective: the component must always solve the base use case it was created for.

## Scope

This plan assumes the component already belongs in the library and will live under `src/lib`.

## Workflow

### 1. Define the base use case

- Start by describing the main problem the component must solve.
- Focus on the primary use case only.
- Do not design for hypothetical future scenarios.

### 2. Define the minimum API

- Add only the props needed for the base use case.
- Keep the API flexible, but not over-designed.
- Use clear and obvious prop names.
- Add variants only when a real use case already exists.
- Use `children` only when it adds real value.
- Forward native props when it makes practical sense.
- Avoid configuration props added "just in case".

### 3. Choose the minimum file structure

- Use `component-name.tsx` when the component is simple.
- Use `component-name/*.tsx` with a local `index.tsx` only when the component needs a slightly larger structure.
- Do not create extra files or folders before they are needed.

### 4. Implement the component

- Add all internal logic needed to solve the base use case.
- Avoid external logic that does not belong to the component itself.
- Keep the implementation small, readable, and focused.

### 5. Reuse existing library components when it helps

- A component may use another existing library component.
- Prefer composition when it reduces duplication and keeps behavior consistent.
- Reuse existing components only when it truly simplifies the new component.
- Avoid tight coupling or confusing APIs caused by excessive wrapping.
- If composition makes the component too rigid or harder to understand, implement the base directly instead.

### 6. Use existing styles first

- Reuse the styles, tokens, and visual patterns already used across the library.
- Add new styles only when they are necessary.
- Do not introduce media queries unless the case strictly requires them.

### 7. Keep dependencies minimal

- Avoid external dependencies.
- Icons are the only acceptable exception when needed.

### 8. Document the component

Each new component should document:

- the problem it solves
- the correct import
- the minimum usage
- a real example
- composition guidance, if applicable

The docs should reflect the real public usage of the component.

### 9. Add tests

- Every new component should include tests.
- Tests should cover the basic behavior.
- Validation steps may be automated, so they do not need to be described as mandatory manual work in this plan.

## Done criteria

A component is considered done when:

- it solves the base use case
- it has a minimum API
- it is documented
- it has a basic test
- it can be used from the library without awkward adjustments

## Recommended order

1. Define the base use case
2. Define the minimum API
3. Choose the minimum file structure
4. Implement the component
5. Reuse an existing component only if it simplifies the result
6. Document it
7. Add a basic test
8. Leave it ready to use from the library

## Expected outcome

The library gets components that are practical, easy to understand, easy to reuse, and documented without unnecessary complexity.

## Reusable component template

Use this template before building a new component.

### Component summary

- Component name:
- Base use case:
- Problem it solves:

### Minimum API

- Required props:
- Optional props:
- Uses `children`:
- Native props to forward:
- Variants with real use cases:

### File structure

- Planned path:
- Simple file or folder structure:
- Reason for this structure:

### Implementation notes

- Internal logic needed:
- Existing library components to compose with:
- Existing styles or tokens to reuse:
- New styles needed:
- Media queries needed:
- External dependencies needed:

### Documentation notes

- Problem statement:
- Correct import snippet:
- Minimum usage snippet:
- Real example snippet:
- Composition guidance:

### Testing notes

- Basic behaviors to test:
- Edge cases worth covering:

## Reusable component checklist

Use this checklist when the component is ready.

- [ ] Solves the base use case
- [ ] Keeps the API minimal and practical
- [ ] Avoids "just in case" props
- [ ] Uses the minimum file structure needed
- [ ] Keeps internal logic focused
- [ ] Reuses existing components only when it simplifies the result
- [ ] Reuses existing styles and tokens where possible
- [ ] Avoids media queries unless strictly needed
- [ ] Avoids external dependencies except icons when necessary
- [ ] Includes documentation for problem, import, minimum usage, real example, and composition if needed
- [ ] Includes tests that cover the basic behavior
- [ ] Can be used from the library without awkward adjustments
