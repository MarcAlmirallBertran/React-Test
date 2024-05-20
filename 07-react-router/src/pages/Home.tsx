import { Link } from "../components/Link";

export default function HomePage () {
    return (
      <>
        <h1>Home Page</h1>
        <p>Welcome to the Home Page</p>
        <Link to='/about'>About</Link>
      </>
    )
  }