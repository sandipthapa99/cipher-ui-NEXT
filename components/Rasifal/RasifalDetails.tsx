import { Tabs } from "@mantine/core";
import React from "react";
import { Col, Row } from "react-bootstrap";

import { DailyRasifal } from "./DailyRasifal";
import { MonthlyRasifal } from "./MonthlyRasifal";
import { WeeklyRasifal } from "./WeeklyRasifal";
import { YearlyRasifal } from "./YearlyRasifal";

export const RasifalDetails = () => {
    return (
        <div className="rasifal-details mt-5">
            <Tabs color="lime" variant="pills" radius="md" defaultValue="daily">
                <Row>
                    <Col md={6}>
                        <h1 className="m-0">Rashifal</h1>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex justify-content-end tab-lists">
                            <Tabs.List className="d-flex justify-content-between">
                                <Tabs.Tab value="daily">Daily</Tabs.Tab>
                                <Tabs.Tab value="weekly">Weekly</Tabs.Tab>
                                <Tabs.Tab value="monthly">Monthly</Tabs.Tab>
                                <Tabs.Tab value="yearly">Yearly</Tabs.Tab>
                            </Tabs.List>
                        </div>
                    </Col>
                </Row>

                <Tabs.Panel value="daily" pt="xs">
                    <DailyRasifal />
                </Tabs.Panel>

                <Tabs.Panel value="weekly" pt="xs">
                    <WeeklyRasifal />
                </Tabs.Panel>

                <Tabs.Panel value="monthly" pt="xs">
                    <MonthlyRasifal />
                </Tabs.Panel>

                <Tabs.Panel value="yearly" pt="xs">
                    <YearlyRasifal />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};
