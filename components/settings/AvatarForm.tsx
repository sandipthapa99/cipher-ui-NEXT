import { async } from "@firebase/util";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import { Button } from "@mantine/core";
import { Select } from "@mantine/core";
import { useData } from "hooks/use-data";
import { useForm } from "hooks/use-form";
import Image from "next/image";
import React, { useState } from "react";
import type { AvatarProps } from "types/avatarProps";
import type { ServiceCategoryOptions } from "types/serviceCategoryOptions";
import { axiosClient } from "utils/axiosClient";

const AvatarForm = () => {
    const [value, setValue] = useState<string>("1");
    const [ids, setIds] = useState<number | null>();
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

    const HandleSubmit = async () => {
        try {
            const res = await axiosClient.patch("/tasker/profile/", {
                avatar: ids,
            });
        } catch (error) {
            console.log(error);
        }
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
                        setIds(null);
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
                                  ids === item?.id
                                      ? setIds(null)
                                      : setIds(item?.id);
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
                                      ids && "avatar-section__click"
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
