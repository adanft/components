import type { NavbarProps } from '../components/navbar';

const docsNavbarProps: NavbarProps = {
  profileProps: {
    avatarType: 'text',
    avatarText: 'AF',
    username: 'adanft',
    name: 'Adan Franco T.',
    onAction: () => undefined,
    actionLabel: 'Log out',
  },
  searchPlaceholder: 'Search docs',
};

export { docsNavbarProps };
