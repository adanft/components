import {
  Box,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { Dot } from 'lucide-react';
import { Link } from 'react-router';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Breadcrumbs } from '@adanft/ui';`;

const basicExampleSnippet = `<Breadcrumbs>
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="/components">Components</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item>
      <Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>`;

const customExampleSnippet = `import { Dot } from 'lucide-react';
import { Link } from 'react-router';

<Breadcrumbs>
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link asChild>
        <Link to="/">Home</Link>
      </Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator>
      <Dot className="size-4" />
    </Breadcrumbs.Separator>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link asChild>
        <Link to="/components">Components</Link>
      </Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator>
      <Dot className="size-4" />
    </Breadcrumbs.Separator>
    <Breadcrumbs.Item>
      <Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>`;

type PropRow = {
  defaultValue: string;
  name: string;
  type: string;
};

type ApiSectionProps = {
  description: string;
  props: PropRow[];
  title: string;
};

const classNameProp: PropRow = {
  defaultValue: '-',
  name: 'className',
  type: 'string',
};

const apiSections: ApiSectionProps[] = [
  {
    title: 'Breadcrumbs',
    description: 'Root navigation element that wraps the breadcrumb list.',
    props: [classNameProp, { name: 'aria-label', type: 'string', defaultValue: 'Breadcrumb' }],
  },
  {
    title: 'Breadcrumbs.List',
    description: 'Ordered list of breadcrumb items.',
    props: [classNameProp],
  },
  {
    title: 'Breadcrumbs.Item',
    description: 'Wrapper for each breadcrumb item.',
    props: [classNameProp],
  },
  {
    title: 'Breadcrumbs.Link',
    description: 'Clickable breadcrumb link. Use asChild when another component owns navigation.',
    props: [classNameProp, { name: 'asChild', type: 'boolean', defaultValue: 'false' }],
  },
  {
    title: 'Breadcrumbs.Page',
    description: 'Current page text in the breadcrumb.',
    props: [classNameProp],
  },
  {
    title: 'Breadcrumbs.Separator',
    description: 'Separator between breadcrumb items. Pass children to replace the default icon.',
    props: [{ name: 'children', type: 'React.ReactNode', defaultValue: '-' }, classNameProp],
  },
];

function ApiSection({ description, props, title }: ApiSectionProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-heading">{title}</h3>
        <p className="text-sm leading-6 text-foreground">{description}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Prop</TableHead>
            <TableHead scope="col">Type</TableHead>
            <TableHead scope="col">Default</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell>
                <Code>{prop.name}</Code>
              </TableCell>
              <TableCell>
                <Code>{prop.type}</Code>
              </TableCell>
              <TableCell>{prop.defaultValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

function BreadcrumbsPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Breadcrumbs</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Breadcrumbs</Code> shows where the current page sits inside a navigation path.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Basic</h3>
        <Box shadow="none" surface="none">
          <Breadcrumbs>
            <Breadcrumbs.List>
              <Breadcrumbs.Item>
                <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
              </Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Item>
                <Breadcrumbs.Link href="/components">Components</Breadcrumbs.Link>
              </Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Item>
                <Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page>
              </Breadcrumbs.Item>
            </Breadcrumbs.List>
          </Breadcrumbs>
        </Box>
        <CodeBlock code={basicExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Custom</h3>
        <Box shadow="none" surface="none">
          <Breadcrumbs>
            <Breadcrumbs.List>
              <Breadcrumbs.Item>
                <Breadcrumbs.Link asChild>
                  <Link to="/">Home</Link>
                </Breadcrumbs.Link>
              </Breadcrumbs.Item>
              <Breadcrumbs.Separator>
                <Dot className="size-4" />
              </Breadcrumbs.Separator>
              <Breadcrumbs.Item>
                <Breadcrumbs.Link asChild>
                  <Link to="/components">Components</Link>
                </Breadcrumbs.Link>
              </Breadcrumbs.Item>
              <Breadcrumbs.Separator>
                <Dot className="size-4" />
              </Breadcrumbs.Separator>
              <Breadcrumbs.Item>
                <Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page>
              </Breadcrumbs.Item>
            </Breadcrumbs.List>
          </Breadcrumbs>
        </Box>
        <CodeBlock code={customExampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <div className="space-y-6">
          {apiSections.map((section) => (
            <ApiSection key={section.title} {...section} />
          ))}
        </div>
      </section>
    </article>
  );
}

export default BreadcrumbsPage;
