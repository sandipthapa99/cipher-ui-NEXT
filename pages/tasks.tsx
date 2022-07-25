import type { NextPage } from "next"
import Header from "@components/Header"
import Footer from "@components/Footer"
import { Container } from "react-bootstrap"
import { SearchCategory } from "@components/SearchTask/searchCategory"
import SearchResults from "@components/SearchTask/SearchResults"
import SearchHeader from "@components/SearchTask/searchHeader"
import TaskCard from "@components/common/TaskCard"
import TaskAside from "@components/AppliedTask/taskAside"
const AppliedLayout: NextPage = () => {
  return (
    <>
      <SearchHeader />
      <Header />
      <Container style={{ height: "200vh" }}>
        <SearchCategory />
        <TaskAside />
      </Container>
      <Footer />
    </>
  )
}
export default AppliedLayout
