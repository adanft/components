# Legacy Alias Migration Matrix

Legacy token aliases and utility classes remain available only through the compatibility layer while consumers migrate.

## Deprecation Policy

- Deprecated since `v1.0.0`.
- Internal code is blocked from using legacy aliases except explicit compatibility blocks in:
  - `src/lib/theme/tokens.css`
  - `src/lib/theme/utilities.css`
- Compatibility aliases are scheduled for removal in `v2.0.0`.

## CSS Variable Aliases

| Legacy variable      | Semantic replacement        |
| -------------------- | --------------------------- |
| `--border-color`     | `--ui-border-default`       |
| `--muted-color`      | `--ui-text-muted`           |
| `--text-color`       | `--ui-text-body`            |
| `--title-color`      | `--ui-text-primary`         |
| `--primary-color`    | `--ui-color-primary`        |
| `--shadow-color`     | `--ui-shadow-color`         |
| `--bg-primary-color` | `--ui-surface-page`         |
| `--bg-second-color`  | `--ui-surface-raised`       |
| `--bg-third-color`   | `--ui-surface-subtle`       |
| `--danger-color`     | `--ui-color-danger`         |
| `--secondary-color`  | `--ui-color-accent`         |
| `--info-color`       | `--ui-color-info`           |
| `--success-color`    | `--ui-color-success`        |
| `--white-color`      | `--ui-color-white`          |
| `--bg-scroll`        | `--ui-surface-scroll`       |
| `--bg-hover-scroll`  | `--ui-surface-scroll-hover` |
| `--profile-bg`       | `--ui-surface-profile`      |
| `--bg-transparent`   | `--ui-surface-overlay`      |

## Utility Class Aliases

| Legacy class           | Semantic replacement    |
| ---------------------- | ----------------------- |
| `bg-dark`              | `ui-bg-surface-inverse` |
| `text-dark`            | `ui-text-inverse-muted` |
| `bg-light`             | `ui-bg-surface-page`    |
| `bg-primary-color`     | `ui-bg-surface-page`    |
| `text-light`           | `ui-text-body`          |
| `text-color`           | `ui-text-body`          |
| `bg-main-color`        | `ui-bg-brand`           |
| `bg-secondary-color`   | `ui-bg-surface-raised`  |
| `border-color`         | `ui-border-default`     |
| `shadow-personal`      | `ui-shadow-sm`          |
| `box`                  | `ui-surface-card`       |
| `border-primary-color` | `ui-border-brand`       |
| `text-primary-color`   | `ui-text-brand`         |
| `text-muted`           | `ui-text-muted`         |
| `active`               | `ui-nav-active`         |
