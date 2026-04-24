import { useEffect, useState } from 'react';

import { getSingletonHighlighter } from 'shiki';

const THEME = 'catppuccin-mocha';
const LANGUAGE = 'tsx';

type CodeBlockProps = {
  code: string;
};

function CodeBlock({ code }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    getSingletonHighlighter({
      langs: [LANGUAGE],
      themes: [THEME],
    })
      .then((highlighter) =>
        highlighter.codeToHtml(code, {
          lang: LANGUAGE,
          theme: THEME,
        }),
      )
      .then((highlightedHtml) => {
        if (isMounted) {
          setHtml(highlightedHtml);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHtml('');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div
      className="[&_pre]:p-4 [&_pre]:rounded-md [&_pre]:w-full [&_pre]:overflow-x-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized HTML from shiki syntax highlighter
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export { CodeBlock };
