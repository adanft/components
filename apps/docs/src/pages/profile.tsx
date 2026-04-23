import {
  Box,
  Profile,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
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
        <h1 className="text-3xl font-bold text-heading">Profile</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Profile</Code> shows a user avatar trigger that opens a compact account panel.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={textUsageSnippet} />
        <CodeBlock code={imageUsageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>
        <h3 className="text-lg font-semibold text-heading">Start</h3>
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

        <h3 className="text-lg font-semibold text-heading">End</h3>
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
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
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
                <Code>username</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Secondary user identifier shown in the account panel.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>name</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Primary user name shown in the panel.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>actionLabel</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Label used for the action button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onAction</Code>
              </TableCell>
              <TableCell>
                <Code>{`() => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Called when the action button is pressed.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>avatarType</Code>
              </TableCell>
              <TableCell>
                <Code>{`"image" | "text"`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Chooses whether the trigger avatar is rendered from an image or text.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>avatarSrc</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required when <Code>avatarType</Code> is <Code>"image"</Code>.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>avatarAlt</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required when <Code>avatarType</Code> is <Code>"image"</Code>.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>avatarText</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required when <Code>avatarType</Code> is <Code>"text"</Code>.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default ProfilePage;
