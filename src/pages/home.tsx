function Home() {
  return (
    <article>
      <h1 className="text-center font-bold text-3xl ui-text-brand my-4 uppercase">
        React Components
      </h1>
      <h2 className="font-semibold text-xl ui-text-brand my-4 uppercase">Font family</h2>
      <div className="text-8xl text-center flex flex-wrap flex-col">
        <span>Google Fonts</span>
        <span>-</span>
        <span>Poppins</span>
      </div>
      <h2 className="font-semibold text-xl ui-text-brand my-4 uppercase">Icons</h2>
      <div className="flex flex-col items-center gap-4">
        <span>Nerd Fonts - Cheat Sheet</span>
        <div className="text-8xl grid gap-8 grid-cols-2">
          <i className="nf nf-fa-node_js text-green-600" />
          <i className="nf nf-dev-css3 text-blue-400" />
          <i className="nf nf-dev-html5 text-orange-500" />
          <i className="nf nf-seti-c_sharp ui-text-brand" />
          <i className="nf nf-dev-rust text-red-500" />
          <i className="nf nf-seti-go text-cyan-500" />
          <i className="nf nf-md-react text-blue-300" />
          <i className="nf nf-dev-python text-yellow-400" />
        </div>
      </div>
      <h2 className="font-semibold text-xl ui-text-brand my-4 uppercase">Themes</h2>
      <div className="flex justify-center gap-4">
        <div className="flex flex-col items-center justify-between rounded-lg ui-bg-surface-inverse ui-text-inverse-muted p-4 w-40 h-40">
          <span>Dark</span>
          <i
            className="nf nf-fa-moon text-8xl
           "
          />
        </div>
        <div className="flex flex-col items-center justify-between rounded-md ui-bg-surface-page ui-text-body p-4 w-40 h-40">
          <span>Light</span>
          <i
            className="nf nf-md-brightness_7 text-8xl
           "
          />
        </div>
      </div>
    </article>
  );
}

export default Home;
