import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "@mantine/core";
import Link from "next/link";
import React from "react";
import type { NestedCategoriesDataProps } from "types/nestedCategoryProps";

export const AllCategories = ({
    nestedCategoriesData,
}: {
    nestedCategoriesData: NestedCategoriesDataProps;
}) => {
    const NestedAccordion = ({
        child,
    }: {
        child: NestedCategoriesDataProps;
    }) => {
        return (
            <>
                {child?.map((item, index) => {
                    return (
                        <Accordion
                            radius="lg"
                            chevron={
                                item?.child.length ? (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                ) : (
                                    false
                                )
                            }
                            chevronPosition="left"
                            key={index}
                        >
                            <Accordion.Item value={item?.name}>
                                <Accordion.Control>
                                    <Link href={`/category/${item?.slug}`}>
                                        {item?.name}
                                    </Link>
                                </Accordion.Control>

                                <Accordion.Panel>
                                    {item?.child && (
                                        <NestedAccordion child={item?.child} />
                                    )}
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    );
                })}
            </>
        );
    };
    return (
        <div className="all-categories">
            <NestedAccordion child={nestedCategoriesData} />
        </div>
    );
};
