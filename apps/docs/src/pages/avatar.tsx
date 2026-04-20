import { Avatar, Box } from '@adanft/ui';
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
        <h1 className="text-3xl font-bold text-brand">Avatar</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Avatar</Code> displays a user identity as either text initials or an image.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Text</h3>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Avatar type="text" size="md" text="AF" />
        </Box>
        <CodeBlock code={textExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Sizes</h3>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Avatar type="text" size="sm" text="AF" />
          <Avatar type="text" size="md" text="TB" />
          <Avatar type="text" size="lg" text="LS" />
        </Box>
        <CodeBlock code={sizesExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Image</h3>
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
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
              <tr>
                <th className="border-b border-border px-4 py-3 font-semibold">Prop</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Type</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Default</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>type</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"image" | "text"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Chooses whether the avatar renders an image or text initials.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>size</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"sm" | "md" | "lg"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"md"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls the visual size of both image and text avatars.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>src</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Required when <Code>type</Code> is <Code>"image"</Code>. Provides the image
                  source.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>alt</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Required when <Code>type</Code> is <Code>"image"</Code>. Provides accessible alt
                  text for the image variant.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>text</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Required when <Code>type</Code> is <Code>"text"</Code>. Provides the initials or
                  short text content.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>className</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Extends the component styles and can override default values when needed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export default AvatarPage;
