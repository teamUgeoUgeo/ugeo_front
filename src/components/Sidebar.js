import { Link } from 'react-router-dom'
import classes from './Sidebar.module.css';
import UserInfo from './UserInfo';

const Sidebar = () => {
    return (
        <aside className={classes.sidemenu}>
            <UserInfo></UserInfo>
            <nav>
                <ul>
                    <li>
                        <Link to="/setting/">설정</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;