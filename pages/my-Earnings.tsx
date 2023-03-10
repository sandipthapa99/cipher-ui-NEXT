import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
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
import {
    AttachMoneyOutlined,
    FilterAltOutlined,
    MoreVertOutlined,
    PaidOutlined,
    PriceCheckOutlined,
    PrintOutlined,
    SavingsOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useGetEarningHistory } from "hooks/use-earning-history";
import { useMyWallet } from "hooks/use-wallet";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { convertAmount } from "utils/convertAmount.js";

type INCOME_DATA_TYPE = {
    id: number;
    title: string;
    amount: number | undefined | string;
    icon: ReactNode;
    color: string;
}[];

const MyEarnings = () => {
    let available_balance;
    let total_income;
    let total_withdrawals;
    let frozen_amount;

    const [checkedIds, setCheckedIds] = useState<any>([]);

    const [paginationNumber, setPaginationNumber] = useState(1);
    const [pageSize, setPageSize] = useState<string>("");
    const [allChecked, setAllChecked] = useState(false);
    const { data: EarningHistory } = useGetEarningHistory(
        paginationNumber,
        pageSize ? pageSize : "10"
    );
    console.log(EarningHistory);

    const newElements = EarningHistory?.result.map((item) => {
        return {
            id: item?.id,
            transactionId: item?.transaction,
            user: item?.sender,
            details: item?.task_title?.toString(),
            transactionDate: format(
                new Date(item?.created_at),
                "dd/MM/yyyy, hh:mm a"
            ),

            amount: item.amount,
        };
    });
    const allIds = newElements?.map((element) => element.id);
    const { data: myWallet, isLoading } = useMyWallet();
    if (myWallet?.length !== 0 && myWallet) {
        available_balance = convertAmount(myWallet[0]?.available_balance);
        total_income = convertAmount(myWallet[0]?.available_balance);
        total_withdrawals = convertAmount(myWallet[0]?.total_withdrawals);
        frozen_amount = convertAmount(myWallet[0]?.frozen_amount);
    }

    const INCOME_DATA: INCOME_DATA_TYPE = [
        {
            id: 1,
            title: "Current Balance",
            amount: myWallet?.length !== 0 && myWallet ? available_balance : 0,
            icon: <PaidOutlined className="income-card-icon" />,
            color: "#211D4F",
        },
        {
            id: 2,
            title: "Total Earnings",
            amount: myWallet?.length !== 0 && myWallet ? total_income : 0,
            icon: <SavingsOutlined className="income-card-icon" />,
            color: "#38C675",
        },
        {
            id: 3,
            title: "Total Withdrawals",
            amount: myWallet?.length !== 0 && myWallet ? total_withdrawals : 0,
            icon: <PriceCheckOutlined className="income-card-icon" />,
            color: "#FE5050",
        },
        {
            id: 4,
            title: "Pending Amount",
            amount: myWallet?.length !== 0 && myWallet ? frozen_amount : 0,
            icon: <AttachMoneyOutlined className="income-card-icon" />,
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
                      <MoreVertOutlined className="svg-icon" />
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
                {item.icon}
            </Col>
        );
    });

    return (
        <Layout
            title="My Earnings | Homaale"
            description="Your earnings in homaale."
            keywords="homaale, airtasker-nepali, nepali-working-platform, homaale-feeback, business, online-business, earnings, homaale-earnings"
        >
            <section className="my-order-section" id="my-order-section">
                <BreadCrumb currentPage="My-Earnings" />

                <Container>
                    <p className="my-earnings-text">My Earnings</p>
                    <Row className="gap-3">{renderIncome}</Row>
                    {myWallet?.length !== 0 && !isLoading ? (
                        <div className="bg-white pt-5 payment-history mt-5">
                            <div className="d-flex flex-column flex-sm-row justify-content-between px-2 px-md-5 mb-5">
                                <TextInput
                                    icon={
                                        <SearchOutlined className="me-0 svg-icon" />
                                    }
                                    placeholder="Enter a search keyword"
                                />
                                {/* <div className="d-flex mt-3 mt-sm-0">
                                    <Menu shadow="md" width={350}>
                                        <Menu.Target>
                                            <Button
                                                color="gray"
                                                className="d-flex align-items-center me-4"
                                            >
                                                <FilterAltOutlined className="svg-icon" />
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
                                                <PrintOutlined className="svg-icon" />
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
                                </div> */}
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
                                                        if (
                                                            event.target.checked
                                                        ) {
                                                            setCheckedIds(
                                                                allIds
                                                            );
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
                                            <th className="text-center">
                                                Status
                                            </th>
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
                                            ? EarningHistory?.total_pages
                                            : 0
                                    }
                                    color="yellow"
                                    onChange={(value) => {
                                        setPaginationNumber(value);
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-5 text-center mt-5">
                            <figure className="position-relative">
                                <Image
                                    src={"/orderEmpty.png"}
                                    alt="order-empty-img"
                                    height={243}
                                    width={243}
                                />
                            </figure>
                            <p className="mb-3" style={{ fontSize: "2.4rem" }}>
                                You Have No Earning History.
                            </p>
                            <p>
                                <Link href={"/home?activeTab=1"}>
                                    <a>Click here </a>
                                </Link>
                                to see your booking details.
                            </p>
                        </div>
                    )}
                </Container>
            </section>
        </Layout>
    );
};
export default MyEarnings;
