---
'@adanft/ui': minor
---

Button now forwards its type to asChild button children, accordion triggers
honor aria-disabled without losing focusability, tabs keep a keyboard entry
point by moving roving focus to the first enabled trigger when no tab matches
the value, and dropdown menu content layers above modal overlays.

Breaking behavior change for asChild consumers: a native button child without
an explicit type now receives Button's default `type="button"` instead of the
browser default `submit`. A composed button that should submit a form must now
declare the intent explicitly, on either element:

```tsx
<Button asChild type="submit">
  <button>Save</button>
</Button>
// or
<Button asChild>
  <button type="submit">Save</button>
</Button>
```
