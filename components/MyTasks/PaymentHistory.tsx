import {
    faEllipsisVertical,
    faFilter,
    faPrint,
    faSearch,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Checkbox,
    Menu,
    Pagination,
    ScrollArea,
    Select,
    Table,
    TextInput,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { format } from "date-fns";
import { useGetTransactionHistory } from "hooks/use-transaction-history";
import { useState } from "react";

const elements = [
    {
        id: 1,
        position: `06/20/2022, 03:00 PM`,
        mass: 12.011,
        symbol: "C",
        name: "Carbon",
        status: "Pending",
        ammount: "Rs 100.00",
        is_earn: true,
    },
    {
        id: 2,
        position: `06/20/2022, 03:00 PM`,
        mass: 14.007,
        symbol: "N",
        name: "Nitrogen",
        status: "Success",
        ammount: "Rs 150.00",
        is_earn: true,
    },
    {
        id: 3,
        position: `06/20/2022, 03:00 PM`,
        mass: 88.906,
        symbol: "Y",
        name: "Yttrium",
        status: "Failed",
        ammount: "Rs 330.00",
        is_earn: true,
    },
    {
        id: 4,
        position: `06/20/2022, 03:00 PM`,
        mass: 137.33,
        symbol: "Ba",
        name: "Barium",
        status: "Pending",
        ammount: "Rs 330.00",
        is_earn: true,
    },
    {
        id: 5,
        position: `06/20/2022, 03:00 PM`,
        mass: 140.12,
        symbol: "Ce",
        name: "Cerium",
        status: "Success",
        ammount: "Rs 1000.00",
        is_earn: true,
    },
];

export const PaymentHistory = () => {
    const [checkedIds, setCheckedIds] = useState<any>([]);
    const { data: paymentHistory } = useGetTransactionHistory();

    const newElements = paymentHistory?.result?.map((item) => {
        return {
            id: item?.id.toString(),
            position: format(new Date(item?.created_at), "dd/MM/yyyy, hh:mm a"),
            mass: `${item?.receiver?.first_name} ${item?.receiver?.last_name}`,
            symbol: `${item?.sender?.first_name} ${item?.sender?.last_name}`,
            name: item?.order,
            status: item?.status,
            ammount: `${item?.currency?.code} ${item?.amount}`,
            is_earn: true,
            paymentMethod: item?.payment_method?.name,
        };
    });

    const [allChecked, setAllChecked] = useState(false);
    const allIds = newElements?.map((element) => element.id);

    const rows = newElements?.map((element) => (
        <tr key={element.name}>
            <td>
                <Checkbox
                    checked={checkedIds.includes(element.id)}
                    onChange={(event) =>
                        setCheckedIds((previousIds: any) => {
                            if (event.target.checked) {
                                return [...previousIds, element.id];
                            }
                            return previousIds.filter(
                                (currentId: any) => currentId !== element.id
                            );
                        })
                    }
                />
            </td>
            <td>{element.position}</td>
            <td>{element.id.substring(0, 8)}</td>
            <td>{element.symbol}</td>
            <td>{element.mass}</td>
            <td>{element.paymentMethod}</td>
            <td>
                {element.status === "completed" ? (
                    <Button className="w-100" color="green">
                        Success
                    </Button>
                ) : element.status === "cancelled" ? (
                    <Button className="w-100" color="red">
                        Failed
                    </Button>
                ) : element.status === "on_hold" ? (
                    <Button className="w-100" color="gray">
                        onHold
                    </Button>
                ) : element.status === "initiated" ? (
                    <Button className="w-100" color="blue">
                        Initiated
                    </Button>
                ) : (
                    <Button className="w-100" color="yellow">
                        Pending
                    </Button>
                )}
            </td>
            <td>{element.ammount}</td>
            <td className="text-center">
                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="svg-icon"
                />
            </td>
        </tr>
    ));

    return (
        <div className="bg-white pt-5 payment-history">
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
                                data={["React", "Angular", "Svelte", "Vue"]}
                                placeholder="Pick one"
                                label="Status"
                                className="py-3"
                            />
                            <Select
                                data={["React", "Angular", "Svelte", "Vue"]}
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
                                        setAllChecked(event.target.checked);
                                        if (event.target.checked) {
                                            setCheckedIds(allIds);
                                        } else {
                                            setCheckedIds([]);
                                        }
                                    }}
                                />
                            </th>
                            <th>Date</th>
                            <th>Invoice Id</th>
                            <th>User</th>
                            <th>Tasker</th>
                            <th>Methods</th>
                            <th className="text-center">Status</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            <div className="d-flex flex-column flex-sm-row justify-content-between px-2 px-md-5 mb-5">
                <Select data={["10", "20"]} placeholder="10" className="py-3" />
                <Pagination total={10} color="yellow" />
            </div>
        </div>
    );
};
