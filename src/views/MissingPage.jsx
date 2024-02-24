import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <main className="">
      <h1>Page Not Found</h1>
      <br />
      <p>
        <Link to="/">Back to HomePage</Link>
      </p>
    </main>
  );
};

export default MissingPage;
