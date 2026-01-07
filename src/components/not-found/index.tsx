import './index.css';

function NotFound() {
  return (
    <div className="not-found flex flex-col items-center justify-center">
      <h1 className="text-[12rem] font-semibold">404</h1>
      <div className="bg" />
      <h2 className="text-xl text-primary-color">Not Found.</h2>
    </div>
  );
}

export default NotFound;
