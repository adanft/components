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
  description: string;
  name: string;
  type: string;
};

type AttributeRow = {
  description: string;
  name: string;
};

type ApiSectionProps = {
  attributes?: AttributeRow[];
  nativeElement: string;
  props: PropRow[];
  title: string;
};

const classNameProp: PropRow = {
  defaultValue: '—',
  description: 'Extends the component styles.',
  name: 'className',
  type: 'string',
};

const apiSections: ApiSectionProps[] = [
  {
    title: 'Breadcrumbs',
    nativeElement: 'nav',
    props: [classNameProp],
    attributes: [
      {
        name: 'aria-label',
        description: 'Labels the navigation landmark. Defaults to Breadcrumb.',
      },
    ],
  },
  {
    title: 'Breadcrumbs.List',
    nativeElement: 'ol',
    props: [classNameProp],
  },
  {
    title: 'Breadcrumbs.Item',
    nativeElement: 'li',
    props: [classNameProp],
  },
  {
    title: 'Breadcrumbs.Link',
    nativeElement: 'a',
    props: [
      classNameProp,
      {
        name: 'href',
        type: 'string',
        defaultValue: '—',
        description: 'Destination for the anchor when asChild is not enabled.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies link styles to the child element instead of rendering an anchor.',
      },
    ],
  },
  {
    title: 'Breadcrumbs.Page',
    nativeElement: 'span',
    props: [classNameProp],
    attributes: [
      {
        name: 'aria-current',
        description: 'Marks the item as the current page.',
      },
    ],
  },
  {
    title: 'Breadcrumbs.Separator',
    nativeElement: 'li',
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        defaultValue: '—',
        description: 'Replaces the default separator icon.',
      },
      classNameProp,
    ],
    attributes: [
      {
        name: 'aria-hidden',
        description: 'Hides the visual separator from assistive technology.',
      },
      {
        name: 'role',
        description: 'Marks the separator as presentational.',
      },
    ],
  },
];

function ApiSection({ attributes = [], nativeElement, props, title }: ApiSectionProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-heading">{title}</h3>
        <p className="text-sm leading-6 text-foreground">
          A thin wrapper around the native <Code>{`<${nativeElement}>`}</Code> element.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Prop</TableHead>
            <TableHead scope="col">Type</TableHead>
            <TableHead scope="col">Default</TableHead>
            <TableHead scope="col">Description</TableHead>
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
              <TableCell>{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {attributes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Attribute</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attribute) => (
              <TableRow key={attribute.name}>
                <TableCell>
                  <Code>{attribute.name}</Code>
                </TableCell>
                <TableCell>{attribute.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
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
        <CodeBlock code={basicExampleSnippet} />
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
