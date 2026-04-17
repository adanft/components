import type { NavbarProps } from '../components/navbar';

const docsNavbarProps: NavbarProps = {
  profileProps: {
    avatarType: 'text',
    avatarText: 'AF',
    userKey: 'adanft',
    fullName: 'Adan Franco T.',
    btnAction: () => undefined,
    btnName: 'Log out',
  },
  searchPlaceholder: 'Search docs',
};

export { docsNavbarProps };
