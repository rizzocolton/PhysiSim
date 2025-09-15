import {Link} from "react-router-dom";
import Header from './Header/Header';

function NotFound(){
    return(
        <>
            <Header/>
            <div className="page-not-found">
            <h1>Page Not Found</h1>
            <Link to={"/"}>
                <button>
                    Go back Home
                </button>
            </Link>
            </div>
        </>
    );
}

export default NotFound;