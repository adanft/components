import { getHighlightedCode } from './generated/highlighted-code';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

type CodeBlockProps = {
  code: string;
};

function CodeBlock({ code }: CodeBlockProps) {
  const html = getHighlightedCode(code) ?? `<pre><code>${escapeHtml(code)}</code></pre>`;

  return (
    <div
      className="[&_pre]:p-4 [&_pre]:rounded-md [&_pre]:w-full [&_pre]:overflow-x-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized HTML from shiki syntax highlighter
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export { CodeBlock };
