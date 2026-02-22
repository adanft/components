import type { NavbarProps } from '../../lib';
import { DOCS_BASE_PATH } from './routes';

const docsNavbarProps: NavbarProps = {
  profileProps: {
    avatarSrc: `${DOCS_BASE_PATH}/profile.png`,
    handle: 'adanft',
    displayName: 'Adan Franco T.',
  },
  searchPlaceholder: 'Search docs',
};

export { docsNavbarProps };
