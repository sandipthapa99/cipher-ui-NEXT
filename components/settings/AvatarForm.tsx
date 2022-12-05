import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import { Button } from "@mantine/core";
import { Select } from "@mantine/core";
import { QueryClient } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import type { AvatarProps } from "types/avatarProps";
import type { ServiceCategoryOptions } from "types/serviceCategoryOptions";
import { axiosClient } from "utils/axiosClient";

const AvatarForm = ({
    onAvatarEdit,
    setShowEditForm,
    userId,
}: {
    onAvatarEdit: (avatar: AvatarProps[0]) => void;
    setShowEditForm: Dispatch<SetStateAction<boolean>>;
    userId?: string;
}) => {
    const [value, setValue] = useState<string>("1");
    const [avatarData, setAvatarData] = useState<AvatarProps[0] | null>();
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

    const queryClient = new QueryClient();

    const HandleSubmit = async () => {
        try {
            await axiosClient.patch("/tasker/profile/", {
                avatar: avatarData?.id,
                profile_image: null,
            });
            await queryClient.invalidateQueries(["profile", userId]);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        avatarData && onAvatarEdit(avatarData);
        setShowEditForm(avatarData ? false : true);
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
                        setAvatarData(null);
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
                                  avatarData?.id === item?.id
                                      ? setAvatarData(null)
                                      : setAvatarData(item);
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
                                      avatarData?.id === item?.id &&
                                      "avatar-section__click"
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
                <Button
                    className="btn close-btn px-4"
                    onClick={() => setShowEditForm(false)}
                >
                    Cancel
                </Button>
                <Button
                    className="btn close-btn px-4"
                    onClick={() => HandleSubmit()}
                    disabled={!avatarData}
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default AvatarForm;
