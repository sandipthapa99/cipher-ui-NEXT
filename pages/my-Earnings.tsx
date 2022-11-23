import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { faPrint } from "@fortawesome/pro-regular-svg-icons";
import { faFilter } from "@fortawesome/pro-regular-svg-icons";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";
import {
    faFileInvoiceDollar,
    faMoneyFromBracket,
    faPiggyBank,
    faSackDollar,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Checkbox,
    Menu,
    Pagination,
    ScrollArea,
    Select,
    Skeleton,
    Table,
    TextInput,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { format } from "date-fns";
import { useGetEarningHistory } from "hooks/use-earning-history";
import { useMyWallet } from "hooks/use-wallet";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

type INCOME_DATA_TYPE = {
    id: number;
    title: string;
    amount: number;
    icon: IconDefinition;
    color: string;
}[];

const MyEarnings = () => {
    const [checkedIds, setCheckedIds] = useState<any>([]);

    const [paginationNumber, setPaginationNumber] = useState(1);
    const [pageSize, setPageSize] = useState<string>("");
    const [allChecked, setAllChecked] = useState(false);
    const { data: EarningHistory } = useGetEarningHistory(
        paginationNumber,
        pageSize ? pageSize : "10"
    );

    const newElements = EarningHistory?.result.map((item) => {
        return {
            id: item.id,
            transactionId: item.transaction,
            user: item.sender,
            details: item.task_title.toString(),
            transactionDate: format(
                new Date(item?.created_at),
                "dd/MM/yyyy, hh:mm a"
            ),

            amount: item.amount,
        };
    });
    const allIds = newElements?.map((element) => element.id);
    const { data: myWallet } = useMyWallet();

    const INCOME_DATA: INCOME_DATA_TYPE = [
        {
            id: 1,
            title: "Current Balance",
            amount: myWallet ? myWallet[0].available_balance : 0,
            icon: faSackDollar,
            color: "#211D4F",
        },
        {
            id: 2,
            title: "Total Earnings",
            amount: myWallet ? myWallet[0].total_income : 0,
            icon: faPiggyBank,
            color: "#38C675",
        },
        {
            id: 3,
            title: "Total Withdrawals",
            amount: myWallet ? myWallet[0].total_withdrawals : 0,
            icon: faMoneyFromBracket,
            color: "#FE5050",
        },
        {
            id: 4,
            title: "Pending Amount",
            amount: myWallet ? myWallet[0].frozen_amount : 0,
            icon: faFileInvoiceDollar,
            color: "#FF9700",
        },
    ];

    const rows = newElements
        ? newElements?.map((element) => (
              <tr key={element.id}>
                  <td>
                      <Checkbox
                          checked={checkedIds.includes(element.id)}
                          onChange={(event) =>
                              setCheckedIds((previousIds: any) => {
                                  if (event.target.checked) {
                                      return [...previousIds, element.id];
                                  }
                                  return previousIds.filter(
                                      (currentId: any) =>
                                          currentId !== element.id
                                  );
                              })
                          }
                      />
                  </td>
                  <td>{element.transactionId.substring(0, 8)}</td>
                  <td>{element.user}</td>
                  <td>{element.details}</td>
                  <td>{element.transactionDate}</td>

                  <td>
                      {element.amount > 0 ? (
                          <Button className="w-100" color="green">
                              Recieved
                          </Button>
                      ) : (
                          <Button className="w-100" color="red">
                              Paid
                          </Button>
                      )}
                  </td>

                  <td
                      style={{
                          color: `${
                              element.amount > 0 ? "#38C675" : "#FE5050"
                          }`,
                      }}
                  >
                      {element.amount}
                  </td>
                  <td className="text-center">
                      <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="svg-icon"
                      />
                  </td>
              </tr>
          ))
        : Array.from({ length: 10 }).map((_, key) => (
              <tr key={key}>
                  <td>
                      <Skeleton height={30} width={"80%"} radius="md" />
                  </td>
                  <td>
                      <Skeleton height={20} width={"100%"} radius="md" />
                  </td>
                  <td>
                      <Skeleton height={20} width={"100%"} radius="md" />
                  </td>
                  <td>
                      <Skeleton height={20} width={"100%"} radius="md" />
                  </td>
                  <td>
                      <Skeleton height={20} width={"100%"} radius="md" />
                  </td>
                  <td>
                      <Skeleton height={20} width={"100%"} radius="md" />
                  </td>
                  <td>
                      <Skeleton height={40} width={"100%"} radius="md" />
                  </td>
                  <td>
                      <Skeleton
                          className="mx-auto"
                          height={20}
                          width={"100%"}
                          radius="md"
                      />
                  </td>
                  <td>
                      <Skeleton
                          className="mx-auto"
                          height={20}
                          width={"10%"}
                          radius="md"
                      />
                  </td>
              </tr>
          ));

    const renderIncome = INCOME_DATA.map((item) => {
        return (
            <Col key={item.id} className="income-card">
                <div className="d-flex-column align-items-center justify-content-center">
                    <p
                        className="income-card-amount"
                        style={{ color: `${item.color}` }}
                    >{`Nrs.${item.amount}`}</p>
                    <p className="income-card-title">{item.title}</p>
                </div>
                <FontAwesomeIcon
                    icon={item.icon}
                    className="income-card-icon"
                />
            </Col>
        );
    });

    return (
        <Layout title="My Earnings | Homaale">
            <section className="my-order-section" id="my-order-section">
                <BreadCrumb currentPage="My-Earnings" />

                <Container>
                    <p className="my-earnings-text">My Earnings</p>
                    <Row className="gap-3">{renderIncome}</Row>
                    <div className="bg-white pt-5 payment-history mt-5">
                        <div className="d-flex flex-column flex-sm-row justify-content-between px-2 px-md-5 mb-5">
                            <TextInput
                                icon={
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="me-0 svg-icon"
                                    />
                                }
                                placeholder="Enter a search keyword"
                            />
                            <div className="d-flex mt-3 mt-sm-0">
                                <Menu shadow="md" width={350}>
                                    <Menu.Target>
                                        <Button
                                            color="gray"
                                            className="d-flex align-items-center me-4"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFilter}
                                                className="svg-icon"
                                            />
                                            Filter
                                        </Button>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <h3>Filter Options</h3>
                                        <DateRangePicker
                                            label="Date"
                                            placeholder="Pick dates range"
                                            className="py-3"
                                        />
                                        <Select
                                            data={[
                                                "React",
                                                "Angular",
                                                "Svelte",
                                                "Vue",
                                            ]}
                                            placeholder="Pick one"
                                            label="Status"
                                            className="py-3"
                                        />
                                        <Select
                                            data={[
                                                "React",
                                                "Angular",
                                                "Svelte",
                                                "Vue",
                                            ]}
                                            placeholder="Pick one"
                                            label="Type"
                                            className="py-3"
                                        />
                                    </Menu.Dropdown>
                                </Menu>

                                <Menu shadow="md" width={160}>
                                    <Menu.Target>
                                        <Button
                                            color="gray"
                                            className="d-flex align-items-center"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPrint}
                                                className="svg-icon"
                                            />
                                            Export
                                        </Button>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Button className="bg-white text-black">
                                            Export to Excel
                                        </Button>
                                        <Button className="bg-white text-black">
                                            Export to CSV
                                        </Button>
                                    </Menu.Dropdown>
                                </Menu>
                            </div>
                        </div>
                        <ScrollArea>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            <Checkbox
                                                checked={allChecked}
                                                onChange={(event) => {
                                                    setAllChecked(
                                                        event.target.checked
                                                    );
                                                    if (event.target.checked) {
                                                        setCheckedIds(allIds);
                                                    } else {
                                                        setCheckedIds([]);
                                                    }
                                                }}
                                            />
                                        </th>
                                        <th>Transaction ID</th>
                                        <th>User</th>

                                        <th>Details</th>
                                        <th>Transaction Date</th>
                                        <th className="text-center">Status</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </Table>
                            {/* {newElements && newElements?.length >= 0 && (
                                <ApplyPostComponent
                                    model="service"
                                    title="No Payment History Available"
                                    subtitle="There is no Transaction created yet"
                                    buttonText="Go to Bookings"
                                    href="/home?activeTab=1"
                                />
                            )} */}
                        </ScrollArea>
                        <div className="d-flex flex-column flex-sm-row justify-content-between px-2 px-md-5 mb-5">
                            <Select
                                data={["10", "20"]}
                                placeholder="10"
                                className="py-3"
                                onChange={(value) => {
                                    if (value) setPageSize(value);
                                }}
                            />
                            <Pagination
                                total={
                                    EarningHistory
                                        ? EarningHistory?.result.length
                                        : 0
                                }
                                color="yellow"
                                onChange={(value) => {
                                    setPaginationNumber(value);
                                }}
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};
export default MyEarnings;
