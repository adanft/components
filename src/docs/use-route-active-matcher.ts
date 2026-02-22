import { useLocation } from 'react-router';

function useRouteActiveMatcher() {
  const { pathname } = useLocation();

  return (href: string) => pathname === href;
}

export default useRouteActiveMatcher;
