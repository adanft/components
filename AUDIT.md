# Component Library Audit

> Generated: 2026-03-20

---

## 🔴 Alto — pueden romper

| Componente               | Problema                                                                                                                                                                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~**Sidebar**~~          | ~~`left-68.5` y `left-18.5` no existen en Tailwind por defecto. El botón toggle probablemente no se posiciona correctamente.~~ ✅ Descartado — Tailwind 4 soporta valores decimales en la escala dinámica (`left-68.5` = `17.125rem`). Falso positivo del audit escrito asumiendo Tailwind 3. |
| ~~**local-storage.ts**~~ | ~~No tiene guards de SSR (`typeof window`). Explota en Next.js u otros entornos con server rendering.~~ ✅ Descartado — consumo exclusivamente client-side, guard innecesario.                                                                                                                |

---

## 🟡 Medio — accesibilidad y API

| Componente           | Problema                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~**Modal**~~        | ~~No tiene `role="dialog"`, `aria-modal="true"` ni `aria-labelledby`. Screen readers no lo anuncian como modal.~~ ✅ Resuelto — ver sección al final. |
| ~~**Profile**~~      | ~~El avatar usa un `div` con `onClick` en vez de `<button>`. Violación de accesibilidad básica.~~ ✅ Resuelto — ver sección al final.                 |
| ~~**SidebarGroup**~~ | ~~El botón de toggle no tiene `aria-label` ni `aria-controls`.~~ ✅ Resuelto — ver sección al final.                                                  |
| ~~**InputField**~~   | ~~Usa template literals hardcodeados para clases en vez del helper `cn()`. Inconsistente con el resto.~~ ✅ Resuelto — ver sección al final.          |

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
| Profile    | `profile.tsx`           | ✅ Sin issues          |
| Modal      | `modal/`                | ✅ Headless API + a11y |
| Sidebar    | `sidebar/` (7 archivos) | ✅ Sin issues          |
| Table      | `table/` (8 archivos)   | ✅ Bien estructurado   |

---

## Helpers & Hooks

| Archivo                             | Issues                                          |
| ----------------------------------- | ----------------------------------------------- |
| `src/lib/helpers/cn.ts`             | No resuelve conflictos de utilidades Tailwind   |
| `src/helpers/theme.ts`              | ✅ Sin issues críticos                          |
| `src/helpers/local-storage.ts`      | ✅ Analizado — falso positivo, solo client-side |
| `src/hooks/use-outside-handler.tsx` | ✅ Bien implementado                            |

---

## ✅ Resuelto

### Sidebar left-68.5 — Falso positivo descartado (2026-03-22)

`left-68.5` y `left-18.5` fueron auditados como clases inexistentes en Tailwind. Incorrecto: Tailwind 4 genera valores de forma dinámica desde la escala base de `0.25rem`, por lo que `left-68.5` compila correctamente como `left: 17.125rem`. El audit original fue escrito asumiendo Tailwind 3, donde solo existen clases predefinidas en la escala. En Tailwind 4 esto es válido out-of-the-box.

**Conclusión:**

| Issue original                                     | Resultado                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------------- |
| `left-68.5` / `left-18.5` inexistentes por defecto | Falso positivo — Tailwind 4 soporta valores decimales en su escala dinámica |

---

### local-storage.ts — Falso positivo descartado (2026-03-22)

Analizado el helper `src/helpers/local-storage.ts`. El guard SSR (`typeof window`) es innecesario: el helper es consumido exclusivamente desde componentes client-side — `localStorage` siempre está disponible en el contexto de uso. No requiere cambios.

**Conclusión:**

| Issue original                  | Resultado                                                                  |
| ------------------------------- | -------------------------------------------------------------------------- |
| Sin guard SSR (`typeof window`) | Falso positivo — helper siempre corre en cliente, localStorage garantizado |

---

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

---

### Profile — Trigger semántico y accesibilidad (2026-03-22)

El trigger del avatar fue reemplazado por un `<button>` semántico con atributos ARIA correctos.

**Problemas resueltos:**

| Issue original                                        | Solución implementada                                       |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| `div` con `onClick` como trigger del dropdown         | Reemplazado por `<button>` semántico, activable con teclado |
| Sin `aria-expanded` para indicar estado del menú      | Agregado `aria-expanded={open}` al botón trigger            |
| Sin `aria-haspopup` para anunciar el menú desplegable | Agregado `aria-haspopup="menu"` al botón trigger            |
| Callbacks y tipos innecesariamente complejos          | Simplificados — eliminada complejidad sin impacto funcional |

---

### SidebarGroup — aria-controls y tests a escala dinámica Tailwind 4 (2026-03-22)

El botón de toggle del grupo fue actualizado con `aria-controls` conectado vía `useId()`, y los tests fueron migrados a la escala dinámica de Tailwind 4.

**Problemas resueltos:**

| Issue original                              | Solución implementada                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Botón de toggle sin `aria-controls`         | Agregado `aria-controls` usando `useId()` para conectar el botón con el panel colapsable |
| Tests con valores hardcodeados (`w-[65px]`) | Migrados a escala dinámica Tailwind 4 (`w-[65px]` → `w-16.25`)                           |

---

## Estado final

> Fecha de cierre: 2026-03-22

| Componente   | Issues detectados   | Resultado                                      |
| ------------ | ------------------- | ---------------------------------------------- |
| Box          | 0                   | ✅ Sin issues                                  |
| Button       | 1 (disabled)        | ✅ Resuelto — estilos disabled agregados       |
| Icon         | 0                   | ✅ Sin issues                                  |
| InputField   | 2 (cn, a11y)        | ✅ Resuelto — migrado a cn() + aria attributes |
| Profile      | 3 (a11y)            | ✅ Resuelto — trigger semántico + ARIA         |
| Modal        | 8 (a11y, API)       | ✅ Resuelto — rewrite headless completo        |
| Sidebar      | 2 (false positives) | ✅ Descartado — falsos positivos Tailwind 3    |
| SidebarGroup | 1 (aria-controls)   | ✅ Resuelto — aria-controls con useId()        |
| Table        | 0                   | ✅ Sin issues                                  |
| cn() helper  | 1 (no tw-merge)     | 🔲 Pendiente — mejora de calidad no crítica    |
| SidebarLink  | 1 (router)          | 🔲 Pendiente — mejora de API no crítica        |

**Todos los issues críticos y de accesibilidad han sido resueltos o descartados. Los únicos pendientes son mejoras de calidad no bloqueantes.**
