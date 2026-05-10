import { describe, expect, it } from 'vitest';

import accordionSource from '../pages/accordion.tsx?raw';
import alertSource from '../pages/alert.tsx?raw';
import avatarSource from '../pages/avatar.tsx?raw';
import badgeSource from '../pages/badge.tsx?raw';
import boxSource from '../pages/box.tsx?raw';
import breadcrumbsSource from '../pages/breadcrumbs.tsx?raw';
import buttonSource from '../pages/button.tsx?raw';
import checkboxSource from '../pages/checkbox.tsx?raw';
import dropdownMenuSource from '../pages/dropdown-menu.tsx?raw';
import fieldSource from '../pages/field.tsx?raw';
import inputSource from '../pages/input.tsx?raw';
import labelSource from '../pages/label.tsx?raw';
import modalSource from '../pages/modal.tsx?raw';
import paginationSource from '../pages/pagination.tsx?raw';
import popoverSource from '../pages/popover.tsx?raw';
import profileSource from '../pages/profile.tsx?raw';
import radioGroupSource from '../pages/radio-group.tsx?raw';
import selectSource from '../pages/select.tsx?raw';
import sidebarSource from '../pages/sidebar.tsx?raw';
import skeletonSource from '../pages/skeleton.tsx?raw';
import spinnerSource from '../pages/spinner.tsx?raw';
import switchSource from '../pages/switch.tsx?raw';
import tableSource from '../pages/table.tsx?raw';
import tabsSource from '../pages/tabs.tsx?raw';
import textareaSource from '../pages/textarea.tsx?raw';
import themeSwitchSource from '../pages/theme-switch.tsx?raw';
import tooltipSource from '../pages/tooltip.tsx?raw';

const pageSources = {
  'accordion.tsx': accordionSource,
  'alert.tsx': alertSource,
  'avatar.tsx': avatarSource,
  'badge.tsx': badgeSource,
  'box.tsx': boxSource,
  'breadcrumbs.tsx': breadcrumbsSource,
  'button.tsx': buttonSource,
  'checkbox.tsx': checkboxSource,
  'dropdown-menu.tsx': dropdownMenuSource,
  'field.tsx': fieldSource,
  'input.tsx': inputSource,
  'label.tsx': labelSource,
  'modal.tsx': modalSource,
  'pagination.tsx': paginationSource,
  'popover.tsx': popoverSource,
  'profile.tsx': profileSource,
  'radio-group.tsx': radioGroupSource,
  'select.tsx': selectSource,
  'sidebar.tsx': sidebarSource,
  'skeleton.tsx': skeletonSource,
  'spinner.tsx': spinnerSource,
  'switch.tsx': switchSource,
  'table.tsx': tableSource,
  'tabs.tsx': tabsSource,
  'textarea.tsx': textareaSource,
  'theme-switch.tsx': themeSwitchSource,
  'tooltip.tsx': tooltipSource,
};

const usageImportExamples = [
  [
    'accordion.tsx',
    "import { Accordion } from '@adanft/ui';",
    "import Accordion from '@adanft/ui/accordion';",
  ],
  ['alert.tsx', "import { Alert } from '@adanft/ui';", "import Alert from '@adanft/ui/alert';"],
  ['avatar.tsx', "import { Avatar } from '@adanft/ui';", "import Avatar from '@adanft/ui/avatar';"],
  ['badge.tsx', "import { Badge } from '@adanft/ui';", "import Badge from '@adanft/ui/badge';"],
  ['box.tsx', "import { Box } from '@adanft/ui';", "import Box from '@adanft/ui/box';"],
  [
    'breadcrumbs.tsx',
    "import { Breadcrumbs } from '@adanft/ui';",
    "import Breadcrumbs from '@adanft/ui/breadcrumbs';",
  ],
  ['button.tsx', "import { Button } from '@adanft/ui';", "import Button from '@adanft/ui/button';"],
  [
    'checkbox.tsx',
    "import { Checkbox } from '@adanft/ui';",
    "import Checkbox from '@adanft/ui/checkbox';",
  ],
  [
    'dropdown-menu.tsx',
    "import { DropdownMenu } from '@adanft/ui';",
    "import DropdownMenu from '@adanft/ui/dropdown-menu';",
  ],
  [
    'field.tsx',
    "import { Field, Input, RadioGroup } from '@adanft/ui';",
    "import Field from '@adanft/ui/field';",
  ],
  [
    'field.tsx',
    "import { Field, Input, RadioGroup } from '@adanft/ui';",
    "import Input from '@adanft/ui/input';",
  ],
  [
    'field.tsx',
    "import { Field, Input, RadioGroup } from '@adanft/ui';",
    "import RadioGroup from '@adanft/ui/radio-group';",
  ],
  ['input.tsx', "import { Input } from '@adanft/ui';", "import Input from '@adanft/ui/input';"],
  [
    'label.tsx',
    "import { Input, Label } from '@adanft/ui';",
    "import Label from '@adanft/ui/label';",
  ],
  [
    'label.tsx',
    "import { Input, Label } from '@adanft/ui';",
    "import Input from '@adanft/ui/input';",
  ],
  [
    'modal.tsx',
    "import { Button, Modal } from '@adanft/ui';",
    "import Modal from '@adanft/ui/modal';",
  ],
  [
    'modal.tsx',
    "import { Button, Modal } from '@adanft/ui';",
    "import Button from '@adanft/ui/button';",
  ],
  [
    'pagination.tsx',
    "import { PaginationFoot, PaginationHead } from '@adanft/ui';",
    "import PaginationHead from '@adanft/ui/pagination-head';",
  ],
  [
    'pagination.tsx',
    "import { PaginationFoot, PaginationHead } from '@adanft/ui';",
    "import PaginationFoot from '@adanft/ui/pagination-foot';",
  ],
  [
    'popover.tsx',
    "import { Button, Popover } from '@adanft/ui';",
    "import Popover from '@adanft/ui/popover';",
  ],
  [
    'popover.tsx',
    "import { Button, Popover } from '@adanft/ui';",
    "import Button from '@adanft/ui/button';",
  ],
  [
    'profile.tsx',
    "import { Profile } from '@adanft/ui';",
    "import Profile from '@adanft/ui/profile';",
  ],
  [
    'radio-group.tsx',
    "import { Field, RadioGroup } from '@adanft/ui';",
    "import RadioGroup from '@adanft/ui/radio-group';",
  ],
  [
    'radio-group.tsx',
    "import { Field, RadioGroup } from '@adanft/ui';",
    "import Field from '@adanft/ui/field';",
  ],
  ['select.tsx', "import { Select } from '@adanft/ui';", "import Select from '@adanft/ui/select';"],
  ['sidebar.tsx', "} from '@adanft/ui';", "} from '@adanft/ui/sidebar';"],
  [
    'skeleton.tsx',
    "import { Skeleton } from '@adanft/ui';",
    "import Skeleton from '@adanft/ui/skeleton';",
  ],
  [
    'spinner.tsx',
    "import { Spinner } from '@adanft/ui';",
    "import Spinner from '@adanft/ui/spinner';",
  ],
  ['switch.tsx', "import { Switch } from '@adanft/ui';", "import Switch from '@adanft/ui/switch';"],
  ['table.tsx', "} from '@adanft/ui';", "} from '@adanft/ui/table';"],
  ['tabs.tsx', "import { Tabs } from '@adanft/ui';", "import Tabs from '@adanft/ui/tabs';"],
  [
    'textarea.tsx',
    "import { Textarea } from '@adanft/ui';",
    "import Textarea from '@adanft/ui/textarea';",
  ],
  [
    'theme-switch.tsx',
    "import { ThemeSwitch } from '@adanft/ui';",
    "import ThemeSwitch from '@adanft/ui/theme-switch';",
  ],
  [
    'theme-switch.tsx',
    "import { initializeTheme } from '@adanft/ui';",
    "import { initializeTheme } from '@adanft/ui/theme';",
  ],
  [
    'tooltip.tsx',
    "import { Button, Tooltip } from '@adanft/ui';",
    "import Tooltip from '@adanft/ui/tooltip';",
  ],
  [
    'tooltip.tsx',
    "import { Button, Tooltip } from '@adanft/ui';",
    "import Button from '@adanft/ui/button';",
  ],
] as const;

describe('docs Usage import examples', () => {
  it.each(
    usageImportExamples,
  )('%s documents the package root and public subpath import forms', (page, rootImport, subpathImport) => {
    const source = pageSources[page];

    expect(source).toContain(rootImport);
    expect(source).toContain(subpathImport);
  });
});
