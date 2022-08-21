import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { browseTasks } from "staticData/how-to-find";

const HowToFindTasks = () => {
    return (
        <Layout title="How to find tasks | Cipher">
            <BreadCrumb currentPage="How to find tasks" />
            <Container fluid="xl">
                <section className="find-tasks">
                    {/* Notable quality section starts  */}
                    <section
                        id="browse-tasks"
                        className="find-tasks__browse-task"
                    >
                        <Container fluid="xl" className="px-5">
                            <LongSquareImageCard
                                title="Browse tasks"
                                image="/groupB.png"
                                imageOnRight={true}
                                description={browseTasks}
                            />
                        </Container>
                    </section>
                    {/* Notable quality section ends  */}
                </section>
            </Container>
        </Layout>
    );
};
export default HowToFindTasks;
