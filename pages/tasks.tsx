import TaskAside from "@components/AppliedTask/taskAside"
import TaskCard from "@components/common/TaskCard"
import Footer from "@components/Footer"
import Header from "@components/Header"
import { SearchCategory } from "@components/SearchTask/searchCategory"
import SearchHeader from "@components/SearchTask/searchHeader"
import SearchResults from "@components/SearchTask/SearchResults"
import type { NextPage } from "next"
import { Container } from "react-bootstrap"
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
