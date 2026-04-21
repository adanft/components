import { Box, Profile } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Profile } from '@adanft/ui';`;

const textUsageSnippet = `<Profile
  username="@adan"
  name="Adan Franco"
  onAction={() => console.log('log out')}
  actionLabel="Log out"
  avatarType="text"
  avatarText="AF"
/>`;

const imageUsageSnippet = `<Profile
  username="@adan"
  name="Taylor Brown"
  onAction={() => console.log('log out')}
  actionLabel="Log out"
  avatarType="image"
  avatarSrc="https://example.com/avatar.png"
  avatarAlt="Taylor Brown avatar"
/>`;

const startExampleSnippet = `<Profile
  username="@adan"
  name="Adan Franco"
  onAction={() => undefined}
  actionLabel="Log out"
  avatarType="text"
  avatarText="AF"
/>`;

const endExampleSnippet = `<Profile
  username="@taylor"
  name="Taylor Brown"
  onAction={() => undefined}
  actionLabel="Log out"
  avatarType="image"
  avatarSrc="https://www.smartfren.com/app/uploads/2021/11/featured-image-37.png"
  avatarAlt="La Lisa"
/>`;

function ProfilePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Profile</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Profile</Code> shows a user avatar trigger that opens a compact account panel.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={textUsageSnippet} />
        <CodeBlock code={imageUsageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>
        <h3 className="text-lg font-semibold text-brand">Start</h3>
        <Box className="relative flex justify-start p-6" shadow="none" surface="none">
          <Profile
            username="@adan"
            name="Adan Franco"
            onAction={() => undefined}
            actionLabel="Log out"
            avatarType="text"
            avatarText="AF"
          />
        </Box>
        <CodeBlock code={startExampleSnippet} />

        <h3 className="text-lg font-semibold text-brand">End</h3>
        <Box className="relative flex justify-end p-6" shadow="none" surface="none">
          <Profile
            username="@taylor"
            name="Taylor Brown"
            onAction={() => undefined}
            actionLabel="Log out"
            avatarType="image"
            avatarSrc="https://www.smartfren.com/app/uploads/2021/11/featured-image-37.png"
            avatarAlt="La Lisa"
          />
        </Box>
        <CodeBlock code={endExampleSnippet} />
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
                  <Code>username</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Secondary user identifier shown in the account panel.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>name</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Primary user name shown in the panel.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>actionLabel</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Label used for the action button.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>onAction</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`() => void`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Called when the action button is pressed.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>avatarType</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"image" | "text"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Chooses whether the trigger avatar is rendered from an image or text.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>avatarSrc</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Required when <Code>avatarType</Code> is <Code>"image"</Code>.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>avatarAlt</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Required when <Code>avatarType</Code> is <Code>"image"</Code>.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>avatarText</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Required when <Code>avatarType</Code> is <Code>"text"</Code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export default ProfilePage;
