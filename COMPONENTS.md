# @adanft/ui — Component docs

Unified documentation for the current pages in `apps/docs/src/pages`, excluding Home. Each component can be imported from the public `@adanft/ui` root or from its documented public subpath.

> Import blocks show alternatives. Use the `@adanft/ui` root import to group components, or use the public subpath to import a specific component.

## Quick setup

Import the library global styles once in your app entrypoint:

```tsx
import '@adanft/ui/styles.css';
```

If you use theme switching in a client-side app, initialize the theme before rendering:

```tsx
import { initializeTheme } from '@adanft/ui/theme';

initializeTheme();
```

### Theme variables

`@adanft/ui` exposes its visual contract as CSS variables. You can override any token in your own environment after importing the package styles:

```css
@import '@adanft/ui/styles.css';

:root {
  --color-brand: #7c3aed;
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-foreground: #1f2937;
  --shadow-card: 0 12px 32px oklch(0.25 0 0 / 0.12);
}

:root.dark {
  --color-background: #0f172a;
  --color-surface: #111827;
  --color-foreground: #e5e7eb;
}
```

| Variable | Light default | Dark default | Usage |
| --- | --- | --- | --- |
| `--color-brand` | `#6747c8` | `#6747c8` | Primary brand color. |
| `--color-danger` | `#ff004c` | `#ff004c` | Danger and destructive states. |
| `--color-info` | `#00b4d8` | `#00b4d8` | Informational states. |
| `--color-success` | `#2a9d8f` | `#2a9d8f` | Success states. |
| `--color-warning` | `#e9c46a` | `#e9c46a` | Warning states. |
| `--color-background` | `#ffffff` | `#16141a` | Page background. |
| `--color-surface` | `#ffffff` | `#1f1d24` | Card and overlay surfaces. |
| `--color-foreground` | `#34303d` | `#9e99ad` | Default body text. |
| `--color-heading` | `#251a44` | `#bfb8d1` | Headings and high-emphasis text. |
| `--color-muted` | `#9b98a3` | `#6c6877` | Subtle text, placeholders, and scrollbars. |
| `--color-border` | `#d4dee8` | `#292436` | Component borders. |
| `--color-separator` | `#ebeef1` | `#221e2c` | Dividers and separators. |
| `--color-shadow` | `oklch(0.85 0 0 / 0.5)` | `oklch(0.6 0 0 / 0.15)` | Base shadow color. |
| `--shadow-card` | `0 0 8px var(--color-shadow)` | `0 0 8px var(--color-shadow)` | Default card shadow. |

## Contents

- [Design Tokens](#design-tokens)
- [Accordion](#accordion)
- [Alert](#alert)
- [Avatar](#avatar)
- [Badge](#badge)
- [Box](#box)
- [Breadcrumbs](#breadcrumbs)
- [Button](#button)
- [Checkbox](#checkbox)
- [Dropdown Menu](#dropdown-menu)
- [Field](#field)
- [Input](#input)
- [Label](#label)
- [Modal](#modal)
- [Pagination](#pagination)
- [Popover](#popover)
- [Profile](#profile)
- [Radio Group](#radio-group)
- [Select](#select)
- [Sidebar](#sidebar)
- [Skeleton](#skeleton)
- [Spinner](#spinner)
- [Switch](#switch)
- [Table](#table)
- [Tabs](#tabs)
- [Textarea](#textarea)
- [Theme Switch](#theme-switch)
- [Tooltip](#tooltip)

---

## Design Tokens

Default design variables used by the component styles. Import `@adanft/ui/styles.css` first, then override the tokens in your app CSS with `:root` and `:root.dark`.

```tsx
import '@adanft/ui/styles.css';
```

```css
:root {
  --color-brand: #7c3aed;
  --color-background: #fafafa;
}

:root.dark {
  --color-background: #0f172a;
}
```

**Examples:** brand customization, light/dark app theme override, custom card shadow.

**API:** see [Theme variables](#theme-variables) for the full list of default tokens.

## Accordion

Controlled primitive for expandable sections.

```tsx
import { Accordion } from '@adanft/ui';
```

```tsx
import Accordion from '@adanft/ui/accordion';
```

```tsx
const [value, setValue] = useState<string | null>('overview');

<Accordion value={value} onValueChange={setValue}>
  <Accordion.Item value="overview">
    <Accordion.Header>
      <Accordion.Trigger>Overview</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>Overview content</Accordion.Content>
  </Accordion.Item>
</Accordion>;
```

**Examples:** collapsible sections, fixed-open sections with `collapsible={false}`.

**API:**

| Component | Public props |
| --- | --- |
| `Accordion` | `value: string \| null`, `onValueChange(value)`, `collapsible = true`, `className` |
| `Accordion.Item` | `value: string`, `className` |
| `Accordion.Header` | `className` |
| `Accordion.Trigger` | `disabled = false`, `className` |
| `Accordion.Content` | `keepMounted = false`, `className` |

## Alert

Inline contextual feedback for information, success, warning, or danger states.

```tsx
import { Alert } from '@adanft/ui';
```

```tsx
import Alert from '@adanft/ui/alert';
```

```tsx
<Alert variant="warning">
  <Alert.Title>Attention</Alert.Title>
  <Alert.Description>Review your changes before continuing.</Alert.Description>
</Alert>
```

**Examples:** `info`, `success`, `warning`, `danger`, each optionally with an icon.

**API:**

| Component | Public props |
| --- | --- |
| `Alert` | `variant: "info" \| "success" \| "warning" \| "danger" = "info"`, `icon`, `className` |
| `Alert.Title` | `className` |
| `Alert.Description` | `className` |

## Avatar

Displays a user identity as text initials or an image.

```tsx
import { Avatar } from '@adanft/ui';
```

```tsx
import Avatar from '@adanft/ui/avatar';
```

```tsx
<Avatar type="text" size="md" text="AF" />
```

**Examples:** text avatar, `sm`/`md`/`lg` sizes, image avatar.

**API:** `type: "image" | "text"`, `size: "sm" | "md" | "lg" = "md"`, `src` + `alt` for images, `text` for text avatars, `className`.

## Badge

Compact label for short metadata, states, or categories.

```tsx
import { Badge } from '@adanft/ui';
```

```tsx
import Badge from '@adanft/ui/badge';
```

```tsx
<Badge>Beta</Badge>
```

**Examples:** `primary`, `secondary`, `success`, `danger`, `outline`.

**API:** `variant: "primary" | "secondary" | "success" | "danger" | "outline" = "secondary"`, `className`.

## Box

Simple container for grouping related content with a consistent visual wrapper.

```tsx
import { Box } from '@adanft/ui';
```

```tsx
import Box from '@adanft/ui/box';
```

```tsx
<Box surface="default" padding="default" shadow="default">
  <p>Content inside the container</p>
</Box>
```

**Examples:** default bordered surface, no surface/shadow wrapper.

**API:** `surface: "default" | "none" = "default"`, `padding: "default" | "none" = "default"`, `shadow: "default" | "none" = "default"`, `className`.

## Breadcrumbs

Shows where the current page sits inside a navigation path.

```tsx
import { Breadcrumbs } from '@adanft/ui';
```

```tsx
import Breadcrumbs from '@adanft/ui/breadcrumbs';
```

```tsx
<Breadcrumbs>
  <Breadcrumbs.List>
    <Breadcrumbs.Item><Breadcrumbs.Link href="/">Home</Breadcrumbs.Link></Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item><Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page></Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>
```

**Examples:** basic breadcrumbs, custom separator, router links through `asChild`.

**API:**

| Component | Public props |
| --- | --- |
| `Breadcrumbs`, `List`, `Item`, `Page` | `className` |
| `Breadcrumbs.Link` | `href`, `asChild = false`, `className` |
| `Breadcrumbs.Separator` | `children`, `className` |

## Button

Action component for user interactions with a consistent visual style.

```tsx
import { Button } from '@adanft/ui';
```

```tsx
import Button from '@adanft/ui/button';
```

```tsx
<Button>Save changes</Button>
```

**Examples:** variants, outline variants, sizes, router links with `asChild`.

**API:** `variant: "primary" | "secondary" | "danger" | "info" | "success" | "theme" = "primary"`, `outline = false`, `size: "sm" | "md" | "lg" = "md"`, `asChild = false`, `type = "button"`, `className`.

## Checkbox

Form control used to toggle a checked or unchecked state.

```tsx
import { Checkbox } from '@adanft/ui';
```

```tsx
import Checkbox from '@adanft/ui/checkbox';
```

```tsx
<Checkbox label="Accept terms" onChange={() => {}} />
```

**Examples:** checked, disabled, invalid, label positions, accessible checkbox without visible label.

**API:** `label`, `labelPosition: "left" | "right" | "top" | "bottom" = "right"`, native checkbox props, `className`.

## Dropdown Menu

Grouped actions from a trigger for menus and command lists.

```tsx
import { DropdownMenu } from '@adanft/ui';
```

```tsx
import DropdownMenu from '@adanft/ui/dropdown-menu';
```

```tsx
const [open, setOpen] = useState(false);

<DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenu.Trigger><button type="button">Actions</button></DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={() => {}}>Profile</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>;
```

**Examples:** account menu with labels/icons, positioned row actions.

**API:**

| Component | Public props |
| --- | --- |
| `DropdownMenu` | `open`, `onOpenChange(open)`, `position = "bottom-start"` |
| `DropdownMenu.Trigger` | single child trigger element |
| `DropdownMenu.Content` | `className`, `style` |
| `DropdownMenu.Item` | `onSelect`, `textValue`, `disabled`, `className` |
| `DropdownMenu.Label`, `Separator` | `className` |

## Field

Groups form labels, controls, helper text, and validation messages.

```tsx
import { Field, Input, RadioGroup } from '@adanft/ui';
```

```tsx
import Field from '@adanft/ui/field';
import Input from '@adanft/ui/input';
import RadioGroup from '@adanft/ui/radio-group';
```

```tsx
<Field required>
  <Field.Label htmlFor="email">Email *</Field.Label>
  <Input id="email" type="email" required />
  <Field.Description id="email-description">We never share your email.</Field.Description>
</Field>
```

**Examples:** default field, invalid field with error list, grouped fieldset.

**API:**

| Component | Public props |
| --- | --- |
| `Field`, `Field.Set` | `invalid = false`, `required = false`, `className` |
| `Field.Legend`, `Field.Label`, `Field.Description` | `className` |
| `Field.Error` | `errors?: Array<{ message?: string } | undefined>`, `role = "alert"`, `className` |

## Input

Text field primitive with base styles for common form entry.

```tsx
import { Input } from '@adanft/ui';
```

```tsx
import Input from '@adanft/ui/input';
```

```tsx
<Input type="email" placeholder="name@example.com" />
```

**Examples:** default, disabled, invalid via `aria-invalid`.

**API:** native input props, `type = "text"`, `className`.

## Label

Native label element with base typography for form controls.

```tsx
import { Input, Label } from '@adanft/ui';
```

```tsx
import Input from '@adanft/ui/input';
import Label from '@adanft/ui/label';
```

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="name@example.com" />
```

**Examples:** label with `htmlFor`, label wrapping children.

**API:** native label props, `className`.

## Modal

Focused dialog content for blocking workflows and confirmations.

```tsx
import { Button, Modal } from '@adanft/ui';
```

```tsx
import Button from '@adanft/ui/button';
import Modal from '@adanft/ui/modal';
```

```tsx
const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel className="space-y-4">
    <Modal.Title>Confirm action</Modal.Title>
    <p>This action needs confirmation before continuing.</p>
  </Modal.Panel>
</Modal>;
```

**Examples:** publish confirmation, form modal, panel named with `aria-label` when no visible title exists.

**API:**

| Component | Public props |
| --- | --- |
| `Modal` | `open`, `onClose()` |
| `Modal.Backdrop`, `Modal.Panel`, `Modal.Title` | `className` plus native element props |

## Pagination

Controls page size and page navigation for paged content.

```tsx
import { PaginationFoot, PaginationHead } from '@adanft/ui';
```

```tsx
import PaginationHead from '@adanft/ui/pagination-head';
import PaginationFoot from '@adanft/ui/pagination-foot';
```

```tsx
const totalItems = 125;
const [pageIndex, setPageIndex] = useState(0);
const [pageSize, setPageSize] = useState(10);

<PaginationHead
  pageSize={pageSize}
  totalItems={totalItems}
  onPaginationChange={({ pageSize, pageIndex }) => {
    setPageSize(pageSize);
    setPageIndex(pageIndex);
  }}
/>

<PaginationFoot
  pageIndex={pageIndex}
  pageSize={pageSize}
  totalItems={totalItems}
  totalPages={Math.ceil(totalItems / pageSize)}
  onPageChange={setPageIndex}
/>;
```

**Examples:** page-size head, page-navigation foot.

**API:**

| Component | Public props |
| --- | --- |
| `PaginationHead` | `pageSize`, `totalItems`, `onPaginationChange({ pageSize, pageIndex })`, `label = "items"`, `pageSizeOptions = [5, 10, 20, 50]`, `className` |
| `PaginationFoot` | `pageIndex`, `pageSize`, `totalItems`, `totalPages`, `onPageChange(pageIndex)`, `label = "items"`, `className` |

## Popover

Interactive floating content anchored to a trigger.

```tsx
import { Button, Popover } from '@adanft/ui';
```

```tsx
import Button from '@adanft/ui/button';
import Popover from '@adanft/ui/popover';
```

```tsx
const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <Popover.Trigger><Button>Open popover</Button></Popover.Trigger>
  <Popover.Content className="rounded-md border p-4">Popover content</Popover.Content>
</Popover>;
```

**Examples:** share panel, positioned shortcuts panel.

**API:** `open`, `onOpenChange(open)`, `position = "bottom"`, `contentRole: "dialog" | null = "dialog"`, `triggerHasPopup = true`, `Popover.Content` accepts `className` and `style`.

## Profile

User avatar trigger that opens a compact account panel.

```tsx
import { Profile } from '@adanft/ui';
```

```tsx
import Profile from '@adanft/ui/profile';
```

```tsx
<Profile
  username="@adan"
  name="Adan Franco"
  onAction={() => undefined}
  actionLabel="Log out"
  avatarType="text"
  avatarText="AF"
/>
```

**Examples:** text avatar profile, image avatar profile.

**API:** `username`, `name`, `actionLabel`, `onAction`, `avatarType: "image" | "text"`, `avatarSize = "md"`, `panelAvatarSize = "md"`, `avatarSrc` + `avatarAlt` for images, `avatarText` for text.

## Radio Group

Lets users choose one option from a related set.

```tsx
import { Field, RadioGroup } from '@adanft/ui';
```

```tsx
import Field from '@adanft/ui/field';
import RadioGroup from '@adanft/ui/radio-group';
```

```tsx
const [plan, setPlan] = useState('starter');

<Field.Set>
  <Field.Legend id="plan-label">Billing plan</Field.Legend>
  <RadioGroup value={plan} onValueChange={setPlan} aria-labelledby="plan-label">
    <RadioGroup.Item value="starter" label="Starter" />
    <RadioGroup.Item value="pro" label="Pro" />
  </RadioGroup>
</Field.Set>;
```

**Examples:** default group, label position, disabled group, invalid item.

**API:**

| Component | Public props |
| --- | --- |
| `RadioGroup` | `value`, `onValueChange(value)`, `name` auto-generated when omitted, `disabled = false`, `labelPosition = "right"`, `className` |
| `RadioGroup.Item` | `value`, `label`, `disabled = false`, native radio props, `className` |

## Select

Native select control for choosing one option from a list.

```tsx
import { Select } from '@adanft/ui';
```

```tsx
import Select from '@adanft/ui/select';
```

```tsx
<Select placeholder="Choose a plan" defaultValue="starter">
  <option value="starter">Starter</option>
  <option value="pro">Pro</option>
</Select>
```

**Examples:** default, invalid, controlled select.

**API:** native select props, `placeholder`, `className`.

## Sidebar

Application navigation for top-level and nested links.

```tsx
import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLink,
  SidebarHead,
  SidebarLink,
  SidebarSection,
} from '@adanft/ui';
```

```tsx
import Sidebar, {
  SidebarBody,
  SidebarGroup,
  SidebarGroupLink,
  SidebarHead,
  SidebarLink,
  SidebarSection,
} from '@adanft/ui/sidebar';
```

```tsx
const [sidebarOpen, setSidebarOpen] = useState(true);

<Sidebar state={sidebarOpen} action={setSidebarOpen}>
  <SidebarHead href="/" logoSrc="/logo.png" title="Comps Docs" />
  <SidebarBody>
    <SidebarSection text="Core" />
    <SidebarLink href="/docs/button" icon={Hand} text="Button" />
    <SidebarGroup icon={FileText} text="Reports">
      <SidebarGroupLink href="/docs/users" text="User Reports" />
    </SidebarGroup>
  </SidebarBody>
</Sidebar>;
```

**Examples:** simple sidebar, advanced sidebar with grouped links and `asChild` brand link.

**API:**

| Component | Public props |
| --- | --- |
| `Sidebar` | `state`, `action(state)`, `className` |
| `SidebarHead` | `logoSrc`, `title`, `href = "/"`, `asChild = false`, `className` |
| `SidebarLink` | `href`, `icon`, `text`, `active = false`, `asChild = false`, `className` |
| `SidebarGroup` | `icon`, `text`, `active = false` |
| `SidebarGroupLink` | `href`, `text`, `active = false`, `asChild = false`, `className` |
| `SidebarBody` | `className` |
| `SidebarSection` | `text`, `className` |

## Skeleton

Loading placeholder for content that has not rendered yet.

```tsx
import { Skeleton } from '@adanft/ui';
```

```tsx
import Skeleton from '@adanft/ui/skeleton';
```

```tsx
<Skeleton className="h-4 w-32 rounded-sm" />
```

**Examples:** animated card placeholder, static placeholder with `animation="none"`.

**API:** `animation: "pulse" | "none" = "pulse"`, `className`.

## Spinner

Loading indicator for indeterminate actions or pending states.

```tsx
import { Spinner } from '@adanft/ui';
```

```tsx
import Spinner from '@adanft/ui/spinner';
```

```tsx
<Spinner />
```

**Examples:** default, `slow`/`normal`/`fast` speeds, decorative loading button spinner, custom size/color.

**API:** `speed: "slow" | "normal" | "fast" = "normal"`, `className`, native SVG accessibility props.

## Switch

Controlled input used to toggle an on/off state.

```tsx
import { Switch } from '@adanft/ui';
```

```tsx
import Switch from '@adanft/ui/switch';
```

```tsx
const [checked, setChecked] = useState(false);

<Switch checked={checked} onCheckedChange={setChecked} label="Dark mode" />;
```

**Examples:** label positions, disabled, invalid.

**API:** `checked`, `onCheckedChange(checked)`, `label`, `labelPosition = "right"`, native checkbox props, `className`.

## Table

Semantic table primitives with consistent base styles.

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
```

```tsx
import Table, {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui/table';
```

```tsx
<Table aria-label="Deals">
  <TableCaption>Pipeline by owner</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Owner</TableHead>
      <TableHead scope="col">Stage</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana Torres</TableCell>
      <TableCell>Negotiation</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Examples:** simple data table, footer totals.

**API:** `Table`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, and `TableCell` accept their native table element props plus `className`.

## Tabs

Switches between related sections without leaving the current page.

```tsx
import { Tabs } from '@adanft/ui';
```

```tsx
import Tabs from '@adanft/ui/tabs';
```

```tsx
const [value, setValue] = useState('overview');

<Tabs value={value} onValueChange={setValue}>
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Overview panel</Tabs.Content>
  <Tabs.Content value="analytics">Analytics panel</Tabs.Content>
</Tabs>;
```

**Examples:** horizontal tabs, vertical tabs.

**API:**

| Component | Public props |
| --- | --- |
| `Tabs` | `value`, `onValueChange(value)` |
| `Tabs.List` | `orientation: "horizontal" | "vertical" = "horizontal"`, `className` |
| `Tabs.Trigger` | `value`, `disabled = false`, `className` |
| `Tabs.Content` | `value`, `keepMounted = false`, `className` |

## Textarea

Multi-line text field for longer form content.

```tsx
import { Textarea } from '@adanft/ui';
```

```tsx
import Textarea from '@adanft/ui/textarea';
```

```tsx
<Textarea placeholder="Write a message" />
```

**Examples:** default, invalid, disabled.

**API:** native textarea props, `className`.

## Theme Switch

Lets users toggle between light and dark themes.

```tsx
import { ThemeSwitch, initializeTheme } from '@adanft/ui';
```

```tsx
import ThemeSwitch from '@adanft/ui/theme-switch';
import { initializeTheme } from '@adanft/ui/theme';
```

```tsx
// CSR only: call before your app renders.
initializeTheme();

<ThemeSwitch initialDark={false} />;
```

For SSR apps, read your theme source on the server and pass it into `initialDark`.

**Examples:** default switch, `sm`/`md`/`lg` sizes, controlled demo with `onCheckedChange`.

**API:**

| Export | Public contract |
| --- | --- |
| `ThemeSwitch` | `initialDark`, `onCheckedChange(isDark)`, `size: "sm" | "md" | "lg" = "md"`, `className` |
| `initializeTheme` | Browser setup helper for CSR apps before render. |

## Tooltip

Short, non-interactive hints shown on hover or focus.

```tsx
import { Button, Tooltip } from '@adanft/ui';
```

```tsx
import Button from '@adanft/ui/button';
import Tooltip from '@adanft/ui/tooltip';
```

```tsx
const [open, setOpen] = useState(false);

<Tooltip open={open} onOpenChange={setOpen}>
  <Tooltip.Trigger><Button>Hover or focus me</Button></Tooltip.Trigger>
  <Tooltip.Content className="rounded-md border px-3 py-2 text-sm">
    Helpful tooltip text
  </Tooltip.Content>
</Tooltip>;
```

**Examples:** button tooltip, icon trigger tooltip, custom position.

**API:**

| Component | Public props |
| --- | --- |
| `Tooltip` | `open`, `onOpenChange(open)`, `position = "top"` |
| `Tooltip.Trigger` | single child trigger element |
| `Tooltip.Content` | `className`, `style`, native div props |
