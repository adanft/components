import { Box, Profile } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Profile } from '@adanft/ui';`;

const imageUsageSnippet = `<Profile
  userKey="@taylor"
  fullName="Taylor Brown"
  btnAction={() => console.log('log out')}
  btnName="Log out"
  avatarType="image"
  avatarSrc="https://example.com/avatar.png"
  avatarAlt="Taylor Brown avatar"
/>`;

const textUsageSnippet = `<Profile
  userKey="@adan"
  fullName="Adan Franco"
  btnAction={() => console.log('log out')}
  btnName="Log out"
  avatarType="text"
  avatarText="AF"
/>`;

function ProfilePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Profile
        </p>
        <h1 className="text-3xl font-bold text-brand">Profile</h1>
        <p className="text-foreground">
          <code>Profile</code> renders a user avatar trigger with a popover card that shows identity
          details and a sign-out action. Use it in navigation bars and account menus.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import <code>Profile</code> from the public library entrypoint. Avatar supports either an
          image or text avatar. The image variant accepts local assets or remote URLs via{' '}
          <code>avatarSrc</code> and descriptive copy via <code>avatarAlt</code>. Use{' '}
          <code>avatarText</code> when <code>avatarType</code> is <code>text</code>.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={imageUsageSnippet} />
        <CodeBlock code={textUsageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="relative flex justify-end p-6">
          <Profile
            userKey="@taylor"
            fullName="Taylor Brown"
            btnAction={() => undefined}
            btnName="Log out"
            avatarType="image"
            avatarSrc="https://www.smartfren.com/app/uploads/2021/11/featured-image-37.png"
            avatarAlt="La Lisa"
          />
        </Box>
        <CodeBlock code={imageUsageSnippet} />
      </section>
    </article>
  );
}

export default ProfilePage;
