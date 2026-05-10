import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Avatar } from '@adanft/ui';`;

const usageSnippet = `<Avatar type="text" size="md" text="AF" />`;

const textExampleJsx = `<Avatar type="text" size="md" text="AF" />`;

const sizesExampleJsx = `<Avatar type="text" size="sm" text="AF" />
<Avatar type="text" size="md" text="TB" />
<Avatar type="text" size="lg" text="LS" />`;

const imageExampleJsx = `<Avatar
  type="image"
  size="sm"
  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
  alt="Avery avatar"
/>
<Avatar
  type="image"
  size="md"
  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=224&q=80"
  alt="Mason avatar"
/>
<Avatar
  type="image"
  size="lg"
  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80"
  alt="Jordan avatar"
/>`;

function AvatarPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Avatar</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Avatar</Code> displays a user identity as either text initials or an image.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Text</h3>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Avatar type="text" size="md" text="AF" />
        </Box>
        <CodeBlock code={textExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Sizes</h3>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Avatar type="text" size="sm" text="AF" />
          <Avatar type="text" size="md" text="TB" />
          <Avatar type="text" size="lg" text="LS" />
        </Box>
        <CodeBlock code={sizesExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Image</h3>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Avatar
            type="image"
            size="sm"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
            alt="Avery avatar"
          />
          <Avatar
            type="image"
            size="md"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=224&q=80"
            alt="Mason avatar"
          />
          <Avatar
            type="image"
            size="lg"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80"
            alt="Jordan avatar"
          />
        </Box>
        <CodeBlock code={imageExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <p className="text-foreground">
          Image avatars render <Code>{`<img>`}</Code> and accept native image props except{' '}
          <Code>src</Code> and <Code>alt</Code>. Text avatars render <Code>{`<div>`}</Code> and
          accept native div props.
        </p>
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
            <TableRow>
              <TableCell>
                <Code>type</Code>
              </TableCell>
              <TableCell>
                <Code>{`"image" | "text"`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Chooses whether the avatar renders an image or text initials.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>size</Code>
              </TableCell>
              <TableCell>
                <Code>{`"sm" | "md" | "lg"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"md"`}</Code>
              </TableCell>
              <TableCell>Controls the visual size of both image and text avatars.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>src</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required when <Code>type</Code> is <Code>"image"</Code>. Provides the image source.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>alt</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required when <Code>type</Code> is <Code>"image"</Code>. Provides accessible alt
                text for the image variant.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>text</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required when <Code>type</Code> is <Code>"text"</Code>. Provides the initials or
                short text content.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default AvatarPage;
