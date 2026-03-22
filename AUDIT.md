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

| Componente         | Problema                                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~**Modal**~~      | ~~No tiene `role="dialog"`, `aria-modal="true"` ni `aria-labelledby`. Screen readers no lo anuncian como modal.~~ ✅ Resuelto — ver sección al final. |
| **Profile**        | El avatar usa un `div` con `onClick` en vez de `<button>`. Violación de accesibilidad básica.                                                         |
| **SidebarGroup**   | El botón de toggle no tiene `aria-label` ni `aria-controls`.                                                                                          |
| ~~**InputField**~~ | ~~Usa template literals hardcodeados para clases en vez del helper `cn()`. Inconsistente con el resto.~~ ✅ Resuelto — ver sección al final.          |

---

## 🟢 Bajo — mejoras de calidad

| Componente      | Problema                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| **cn() helper** | No hace merge de Tailwind — `cn('px-4', 'px-6')` deja ambas clases. Considerar `clsx + tailwind-merge`. |
| ~~**Button**~~  | ~~No tiene estilos para estado `disabled`.~~ ✅ Resuelto — ver sección al final.                        |
| **SidebarLink** | No acepta un componente de router (React Router / Next.js `Link`). Hardcodea `<a>`.                     |
| **Modal.Body**  | Siempre requiere `closeIcon` prop. No permite dialogs sin botón de cierre.                              |

---

## Inventario de componentes

| Componente | Archivos                | Estado                 |
| ---------- | ----------------------- | ---------------------- |
| Box        | `box.tsx`               | ✅ Sin issues          |
| Button     | `button.tsx`            | ✅ Sin issues          |
| Icon       | `icon.tsx`              | ✅ Sin issues          |
| InputField | `input-field.tsx`       | ✅ Sin issues          |
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

### InputField — Migración a cn() y accesibilidad (2026-03-22)

Migrado a `cn()` en todas las clases del componente y agregados atributos de accesibilidad para estados de error.

**Problemas resueltos:**

| Issue original                                  | Solución implementada                                                     |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| Template literals hardcodeados en vez de `cn()` | Todas las clases migradas a `cn()`, consistente con el resto del proyecto |
| Sin `aria-invalid` en estado de error           | Agregado `aria-invalid={!!error}` al `<input>`                            |
| Sin `aria-describedby` para mensajes de error   | Agregado `aria-describedby` apuntando al ID del mensaje de error          |

---

### Button — Estado disabled (2026-03-22)

Agregados estilos para el estado `disabled` directamente en las clases base del componente.

**Problemas resueltos:**

| Issue original                   | Solución implementada                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| Sin estilos para estado disabled | Agregados `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none` |

---

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
