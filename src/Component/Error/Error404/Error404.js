import "./style/style.scss"
import { Link } from "react-router-dom";

function Error404() {
    return (
        <div id="error404">
            <div className="error ">
                <div className="wrap">
                    <div className="404">
                        <span className="info"/>
                    </div>
                </div>
                <Link to="/">
                    <div className="btnInError flex-center">Home</div>
                </Link>
            </div>
        </div>
    );
}

export default Error404;
