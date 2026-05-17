import { Button, ThemeSwitch } from '@adanft/ui';
import { Search } from 'lucide-react';

const GITHUB_REPOSITORY_URL = 'https://github.com/adanft/components';

type NavbarProps = {
  searchPlaceholder?: string;
};

function GitHubMark() {
  return (
    <svg aria-hidden="true" className="size-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92v2.8c0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function Navbar({ searchPlaceholder = 'Search' }: NavbarProps) {
  return (
    <div className="fixed left-[65px] top-0 right-0 h-[97px] bg-surface border-separator border-b shadow-card px-8 flex justify-between items-center z-10">
      <div></div>
      <div className="hidden gap-4 rounded-full border border-brand bg-background px-4 py-2 sm:flex sm:w-80">
        <Search aria-hidden="true" className="mt-0.5 size-5 text-brand stroke-2" />
        <input
          className="w-full bg-background font-medium text-foreground focus-visible:outline-none"
          type="text"
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="flex gap-4 items-center">
        <ThemeSwitch initialDark={document.documentElement.classList.contains('dark')} />
        <Button
          asChild
          outline
          variant="theme"
          size="md"
          className="size-12 border-0 p-0"
          aria-label="Open GitHub repository">
          <a href={GITHUB_REPOSITORY_URL} target="_blank" rel="noreferrer">
            <GitHubMark />
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
export type { NavbarProps };
