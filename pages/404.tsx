import CardBtn from "@components/common/CardBtn";
import Layout from "@components/Layout";
import { faFileCircleXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PageNotFound = () => {
    return (
        <Layout>
            <section className="page-not-found d-flex flex-column justify-content-center align-items-center">
                <div className="not-found-icon">
                    <FontAwesomeIcon icon={faFileCircleXmark} className="icon" />
                </div>
                <h1>Page not found</h1>
                <p>The page you have been looking for might have been removed or temporarily unavailable</p>

                <Link href="/">
                    <a className="return-home">Return to Home</a>
                </Link>
            </section>

        </Layout>
    )
}
export default PageNotFound;