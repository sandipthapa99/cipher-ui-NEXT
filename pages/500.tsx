import Layout from "@components/Layout";
import { faFileCircleXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PageNotFound = () => {
    return (
        <Layout>
            <section className="page-not-found d-flex flex-column justify-content-center align-items-center">
                <div className="not-found-icon">
                    <FontAwesomeIcon
                        icon={faFileCircleXmark}
                        className="icon"
                    />
                </div>
                <h1>Internal Server Error</h1>
                <p>
                    Some parts of your web server is not configured correctly or
                    the application is trying to do something and the server is
                    failing to carry out the request due to a conflict or
                    restriction.
                </p>

                <Link href="/">
                    <a className="return-home">Return to Home</a>
                </Link>
            </section>
        </Layout>
    );
};
export default PageNotFound;
