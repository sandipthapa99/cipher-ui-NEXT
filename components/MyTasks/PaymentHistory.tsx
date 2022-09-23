import EllipsisDropdown from "@components/common/EllipsisDropdown";
import {
    faEllipsis,
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
    Select,
    Table,
    TextInput,
} from "@mantine/core";
import type { DateRangePickerValue } from "@mantine/dates";
import { DateRangePicker } from "@mantine/dates";
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
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const [allChecked, setAllChecked] = useState(false);
    const allIds = elements.map((element) => element.id);

    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>
                <Checkbox
                    checked={checkedIds.includes(element.id)}
                    onChange={(event) =>
                        setCheckedIds((previousIds) => {
                            if (event.target.checked) {
                                return [...previousIds, element.id];
                            }
                            return previousIds.filter(
                                (currentId) => currentId !== element.id
                            );
                        })
                    }
                />
            </td>
            <td>{element.position}</td>
            <td>{element.name}</td>
            <td>{element.symbol}</td>
            <td>{element.mass}</td>
            <td>{element.mass}</td>
            <td>
                {element.status === "Success" ? (
                    <Button className="w-100" color="green">
                        Success
                    </Button>
                ) : element.status === "Failed" ? (
                    <Button className="w-100" color="red">
                        Failed
                    </Button>
                ) : (
                    <Button className="w-100" color="yellow">
                        Pending
                    </Button>
                )}
            </td>
            <td>{element.mass}</td>
            <td className="text-center">
                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="svg-icon"
                />
            </td>
        </tr>
    ));

    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(2021, 11, 1),
        new Date(2021, 11, 5),
    ]);

    return (
        <div className="bg-white pt-5 payment-history">
            <div className="d-flex justify-content-between px-5 mb-5">
                <TextInput
                    icon={
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="me-0 svg-icon"
                        />
                    }
                    placeholder="Enter a search keyword"
                />
                <div className="d-flex">
                    <Menu shadow="md" width={500}>
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
                            {/* <DateRangePicker
                                label="Date"
                                placeholder="Pick dates range"
                                value={value}
                                onChange={setValue}
                                className="py-3"
                            /> */}
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
                    <Button color="gray" className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faPrint} className="svg-icon" />
                        Export
                    </Button>
                </div>
            </div>
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
                        <th>task</th>
                        <th>Methods</th>
                        <th className="text-center">Status</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
};
