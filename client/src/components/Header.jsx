import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoviesStore } from "../store/User";

function Header() {
  const user = useMoviesStore((state) => state.user);
  const loginUser = useMoviesStore((state) => state.loginUser);
  const checkUser = useMoviesStore((state) => state.checkUser);
  useEffect(() => {
    checkUser();
  }, []);
  async function handleLogin(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    await loginUser(formdata.get("email"), formdata.get("password"));
  }
  function handleLogout() {
    window.localStorage.setItem("token", "");
    window.location.reload();
  }
  return (
    <header className="navbar">
      <div className="navbar-content container">
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/movies/">Movies</Link>
        </div>

        <div className="profile">
          {user ? (
            <>
              <p>{user.fullName} hello, Sir!</p>
              <button onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <form onSubmit={handleLogin}>
              <input type="text" name="email" placeholder="email" />
              <input type="text" name="password" placeholder="password" />
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
