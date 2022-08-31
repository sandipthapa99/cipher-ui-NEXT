import { Accordion } from "@mantine/core";
import React from "react";
import type { ChildCategory } from "staticData/categories";
import { NestedCategoriesData } from "staticData/categories";

export const AllCategories = () => {
    const NestedAccordion = ({ child }: { child: ChildCategory }) => {
        console.log("child", child);
        return (
            <>
                {child.map((item) => {
                    return item?.child ? (
                        <Accordion radius="lg" chevronPosition="left">
                            <NestedAccordion child={item?.child} />
                        </Accordion>
                    ) : (
                        <Accordion.Item value=""></Accordion.Item>
                    );
                })}
            </>
        );
    };
    return (
        <div className="all-categories">
            {/* <Accordion
                radius="lg"
                chevronPosition="left"
                defaultValue="customization"
            >
                {NestedCategoriesData.map((item, index) => (
                    <Accordion.Item value={item.name} key={index}>
                        <Accordion.Control>{item?.name}</Accordion.Control>
                        <Accordion.Panel>
                            {item?.child.map((item, index) => (
                                <Accordion.Item value={item?.name} key={index}>
                                    <Accordion.Control>
                                        {item?.name}
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        {item?.name}
                                    </Accordion.Panel>
                                </Accordion.Item>
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion> */}

            <NestedAccordion child={NestedCategoriesData} />
        </div>
    );
};
