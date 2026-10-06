import { Badge, Button } from '@adanft/ui';

const variants = ['primary', 'secondary', 'danger', 'info', 'success'] as const;
const badgeVariants = ['primary', 'secondary', 'success', 'danger', 'outline'] as const;

export default function TextContrastCase() {
  return (
    <main className="flex flex-col gap-4 p-8">
      {(['background', 'surface'] as const).map((host) => (
        <section
          key={host}
          data-testid={host}
          className={`flex flex-wrap items-center gap-4 p-4 ${host === 'background' ? 'bg-background' : 'bg-surface'}`}>
          {variants.map((variant) => (
            <Button key={variant} data-treatment={`filled-${variant}`} variant={variant}>
              {variant}
            </Button>
          ))}
          {[...variants, 'theme' as const].map((variant) => (
            <Button key={variant} data-treatment={`outline-${variant}`} variant={variant} outline>
              {variant}
            </Button>
          ))}
          {badgeVariants.map((variant) => (
            <Badge key={variant} data-treatment={`badge-${variant}`} variant={variant}>
              {variant}
            </Badge>
          ))}
        </section>
      ))}
    </main>
  );
}
