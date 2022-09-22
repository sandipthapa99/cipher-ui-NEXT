import { AllCategories } from "@components/AllCategories";
import { AllCategoriesCard } from "@components/AllCategoriesCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import urls from "constants/urls";
import parse from "html-react-parser";
import type { GetStaticProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import type { NestedCategoriesDataProps } from "types/nestedCategoryProps";
import { axiosClient } from "utils/axiosClient";

interface CategoriesPageProps {
    nestedCategoriesData: NestedCategoriesDataProps;
}
const CategoriesPage: NextPage<{
    nestedCategoriesData: CategoriesPageProps["nestedCategoriesData"];
}> = ({ nestedCategoriesData }) => {
    //console.log(nestedCategoriesData);

    return (
        <Layout title="Categories | Cipher">
            <Container fluid="xl" className="px-5">
                <BreadCrumb currentPage={"Categories"} />

                <h2 className="all-categories-title">
                    Browse all cipher Categories
                </h2>

                <AllCategoriesCard
                    nestedCategoriesData={nestedCategoriesData}
                />
                {/*<AllCategories nestedCategoriesData={nestedCategoriesData} />*/}
            </Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: nestedCategoriesData } = await axiosClient.get(
            urls.category.list
        );
        return {
            props: {
                nestedCategoriesData: nestedCategoriesData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                nestedCategoriesData: [],
            },
            revalidate: 10,
        };
    }
};
export default CategoriesPage;
