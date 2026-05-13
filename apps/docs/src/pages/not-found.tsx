import { Box } from '@adanft/ui';

function NotFoundPage() {
  return (
    <Box className="mx-auto max-w-xl pt-16 text-center" shadow="none" surface="none">
      <p className="text-6xl font-semibold uppercase text-muted">404</p>
      <h1 className="mt-4 text-3xl font-semibold uppercase text-heading">Page not found</h1>
      <p className="mt-4 text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
    </Box>
  );
}

export default NotFoundPage;
