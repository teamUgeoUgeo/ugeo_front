import { Form, NavLink, Link, useRouteLoaderData } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {
  const token = useRouteLoaderData("root");

    return (
      <header className={classes.header}>
        <div className={`${classes.headerwrap} max-width space-between`} >
            <Link to="/">
                logo
            </Link>
            <nav>
                <ul>
                    {!token && (
                    <li>
                        <NavLink to="/user/login">Login</NavLink>
                    </li>
                    )}
                    {token && (
                    <li>
                        <Form action="/user/logout" method="post">
                            <button className={classes.logout}>Logout</button>
                        </Form>
                    </li>
                    )}
                </ul>
            </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
  
