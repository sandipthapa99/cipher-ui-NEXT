import Layout from "@components/Layout";
import { HighlightOffOutlined } from "@mui/icons-material";
import Link from "next/link";

const PageNotFound = () => {
    return (
        <Layout>
            <section className="page-not-found d-flex flex-column justify-content-center align-items-center">
                <div className="not-found-icon">
                    <HighlightOffOutlined className="icon" />
                </div>
                <h1>Page not found</h1>
                <p>
                    The page you have been looking for might have been removed
                    or temporarily unavailable
                </p>

                <Link href="/">
                    <a className="return-home">Return to Home</a>
                </Link>
            </section>
        </Layout>
    );
};
export default PageNotFound;
