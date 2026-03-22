# Component Library Audit

> Generated: 2026-03-20

---

## 🔴 Alto — pueden romper

| Componente           | Problema                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Sidebar**          | `left-68.5` y `left-18.5` no existen en Tailwind por defecto. El botón toggle probablemente no se posiciona correctamente. |
| **local-storage.ts** | No tiene guards de SSR (`typeof window`). Explota en Next.js u otros entornos con server rendering.                        |

---

## 🟡 Medio — accesibilidad y API

| Componente       | Problema                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~**Modal**~~    | ~~No tiene `role="dialog"`, `aria-modal="true"` ni `aria-labelledby`. Screen readers no lo anuncian como modal.~~ ✅ Resuelto — ver sección al final. |
| **Profile**      | El avatar usa un `div` con `onClick` en vez de `<button>`. Violación de accesibilidad básica.                                                         |
| **SidebarGroup** | El botón de toggle no tiene `aria-label` ni `aria-controls`.                                                                                          |
| **InputField**   | Usa template literals hardcodeados para clases en vez del helper `cn()`. Inconsistente con el resto.                                                  |

---

## 🟢 Bajo — mejoras de calidad

| Componente      | Problema                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| **cn() helper** | No hace merge de Tailwind — `cn('px-4', 'px-6')` deja ambas clases. Considerar `clsx + tailwind-merge`. |
| **Button**      | No tiene estilos para estado `disabled`.                                                                |
| **SidebarLink** | No acepta un componente de router (React Router / Next.js `Link`). Hardcodea `<a>`.                     |
| **Modal.Body**  | Siempre requiere `closeIcon` prop. No permite dialogs sin botón de cierre.                              |

---

## Inventario de componentes

| Componente | Archivos                | Estado                 |
| ---------- | ----------------------- | ---------------------- |
| Box        | `box.tsx`               | ✅ Sin issues          |
| Button     | `button.tsx`            | 🟢 Minor               |
| Icon       | `icon.tsx`              | ✅ Sin issues          |
| InputField | `input-field.tsx`       | 🟡 cn() + aria         |
| Profile    | `profile.tsx`           | 🟡 Accesibilidad       |
| Modal      | `modal/`                | ✅ Headless API + a11y |
| Sidebar    | `sidebar/` (7 archivos) | 🔴 Tailwind bug        |
| Table      | `table/` (8 archivos)   | ✅ Bien estructurado   |

---

## Helpers & Hooks

| Archivo                             | Issues                                        |
| ----------------------------------- | --------------------------------------------- |
| `src/lib/helpers/cn.ts`             | No resuelve conflictos de utilidades Tailwind |
| `src/helpers/theme.ts`              | ✅ Sin issues críticos                        |
| `src/helpers/local-storage.ts`      | 🔴 Sin guard SSR                              |
| `src/hooks/use-outside-handler.tsx` | ✅ Bien implementado                          |

---

## ✅ Resuelto

### Modal — Rewrite completo (2026-03-22)

El componente Modal fue reescrito desde cero con una API headless y accesibilidad completa.

**API anterior** (eliminada): `Modal.Root`, `Modal.Trigger`, `Modal.Body`, `Modal.Close`

**API nueva**: `Modal`, `Modal.Backdrop`, `Modal.Panel`, `Modal.Title`

**Problemas resueltos:**

| Issue original                             | Solución implementada                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| Sin `role="dialog"` ni `aria-modal="true"` | Implementados en `Modal.Panel`                                          |
| Sin `aria-labelledby`                      | `Modal.Panel` conecta automáticamente con `Modal.Title` vía ID generado |
| Sin focus trap                             | Tab / Shift+Tab ciclan entre elementos focusables dentro del panel      |
| Sin initial focus                          | Soporte de `data-autofocus` para controlar el foco inicial              |
| Sin inert en siblings                      | Sweep de `inert` sobre elementos fuera del modal al abrirse             |
| Sin scroll lock                            | `overflow: hidden` en `body` mientras el modal está abierto             |
| Sin focus restore                          | El foco vuelve al elemento que abrió el modal al cerrarlo               |
| Dark mode incompleto                       | Tokens de `Box` (`bg-surface`) heredan el tema automáticamente          |
| Error messages pobres en context           | Mensajes descriptivos con instrucción de uso correcto                   |
