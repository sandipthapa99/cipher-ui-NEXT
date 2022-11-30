import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import { Button } from "@mantine/core";
import { Select } from "@mantine/core";
import { useData } from "hooks/use-data";
import Image from "next/image";
import React, { useState } from "react";
import type { AvatarProps } from "types/avatarProps";
import type { ServiceCategoryOptions } from "types/serviceCategoryOptions";

const AvatarForm = () => {
    const [value, setValue] = useState<string>("1");
    const [urls, setUrls] = useState<string>();
    const { data: nestedData } = useData<ServiceCategoryOptions>(
        ["category-list"],
        "/task/cms/task-category/list/"
    );

    const serviceItems: SelectItem[] = nestedData
        ? nestedData?.data.map((service) => ({
              id: service?.id,
              label: service?.name,
              value: service?.id,
          }))
        : [];

    const { data: Avatar } = useData<AvatarProps>(
        ["Avatar-list", value],
        `/task/avatar/list?category=${value}`,
        !!value
    );

    const HandleSubmit = () => {
        console.log("first");
    };

    return (
        <div className="avatar-section mt-5">
            <div className="d-flex align-items-center gap-4">
                Select Category{" "}
                <Select
                    placeholder="Pick one"
                    value={value}
                    onChange={(id: string) => {
                        setValue(id ?? "");
                        setUrls("");
                    }}
                    searchable
                    data={serviceItems}
                />
            </div>
            <div className="d-flex gap-4 pt-5">
                {Avatar?.data && Avatar?.data?.length > 0
                    ? Avatar?.data.map((item, key) => (
                          <figure
                              key={key}
                              onClick={() => {
                                  urls === item?.image
                                      ? setUrls("")
                                      : setUrls(item?.image);
                              }}
                              className={"position-relative"}
                          >
                              <Image
                                  className="rounded-circle avatar-section__image"
                                  src={
                                      item?.image
                                          ? item?.image
                                          : "/placeholder/profilePlaceholder.png"
                                  }
                                  alt="sd"
                                  width={120}
                                  height={120}
                              />
                              <div
                                  className={`position-absolute rounded-circle ${
                                      urls && "avatar-section__click"
                                  }`}
                              >
                                  <FontAwesomeIcon
                                      icon={faCheck}
                                      className="avatar-section__click--icon"
                                  />
                              </div>
                          </figure>
                      ))
                    : "no image"}
            </div>
            <div className="d-flex gap-3 align-items-center justify-content-center">
                <Button>Cancel</Button>
                <Button
                    className="btn close-btn px-4"
                    onClick={() => HandleSubmit()}
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default AvatarForm;
