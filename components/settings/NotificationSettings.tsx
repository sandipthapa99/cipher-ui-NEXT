import { Button, Grid, Skeleton, Switch } from "@mantine/core";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { val } from "cheerio/lib/api/attributes";
import { isValid } from "date-fns";
import { useFormik } from "formik";
import type { ChangeEvent } from "react";
import React from "react";
import { Col, Form } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";
import { TypeOf } from "yup";

interface TNotificationPreferences {
    id: number;
    promotional_notification: boolean | null | undefined;
    reminder_notification: boolean | null | undefined;
    alert_notification: boolean | null | undefined;
    geolocation_notification: boolean | null | undefined;
    muted: boolean | null | undefined;
}
type TNotificationPreferenceID = Omit<TNotificationPreferences, "id">;

type NotificationSettings = {
    id: number;
    label: string;
    name: string;
};

// const notificationOptions = [
//     { id: 1, label: "Your task Activities", value: "taskActivities" },
//     { id: 2, label: "New taks/ services", value: "newTask" },
// ];

const NOTIFICATION_PREFERENCES: NotificationSettings[] = [
    {
        id: 1,
        label: "Allow Permission for Update Notification",
        name: "promotional_notification",
    },
    {
        id: 2,
        label: "Allow Permission for Reminder Notification",
        name: "reminder_notification",
    },
    {
        id: 3,
        label: "Allow Permission for Alert Notification",
        name: "alert_notification",
    },
    {
        id: 4,
        label: "Allow Permission for Geographical Notification",
        name: "geolocation_notification",
    },
    {
        id: 5,
        label: "Mute All Notification",
        name: "muted",
    },
];

const newLabel = NOTIFICATION_PREFERENCES.filter(
    (item) => item.name !== "muted"
);

const NotificationSettings = () => {
    const { data: notifcationPreferences, isLoading } = useQuery(
        ["notification-preferences"],
        () => {
            return axiosClient.get<TNotificationPreferences[]>(
                "/notification/list-preference/"
            );
        }
    );

    const changeNotificationSetting = useMutation(
        (data: TNotificationPreferenceID) =>
            axiosClient.patch("/notification/add-preference/", data)
    );

    const queryClient = new QueryClient();

    const { handleSubmit, setFieldValue, values } = useFormik({
        enableReinitialize: true,
        initialValues: {
            promotional_notification:
                notifcationPreferences?.data[0]?.promotional_notification,
            reminder_notification:
                notifcationPreferences?.data[0]?.reminder_notification,
            alert_notification:
                notifcationPreferences?.data[0]?.alert_notification,
            geolocation_notification:
                notifcationPreferences?.data[0]?.geolocation_notification,
            muted: notifcationPreferences?.data[0]?.muted,
        },

        onSubmit: (values: any) => {
            changeNotificationSetting.mutate(values, {
                onSuccess: () => {
                    toast.success("Settings Changed");
                    queryClient.invalidateQueries(["notification-preferences"]);
                },
                onError: (err: any) => {
                    toast.error(err.message);
                },
            });
        },
    });

    const renderNotificationReferences = NOTIFICATION_PREFERENCES.map(
        (item) => {
            return (
                <ChangeNotificationSettings
                    key={item?.id}
                    name={item?.name}
                    label={item?.label}
                    fieldValue={setFieldValue}
                    checked={Boolean(values[item.name as keyof typeof values])}
                    values={values}
                />
            );
        }
    );

    return (
        <div className="account-form">
            <div className="change-notification-head-div">
                <h2 className="notification-header">Notications Preferences</h2>
                <p className="notification-text">Your Notification Settings.</p>
            </div>
            {!isLoading ? (
                <Form onSubmit={handleSubmit}>
                    <div className="d-flex-col align-items-center gap-5 ">
                        {renderNotificationReferences}
                    </div>
                    <div className="d-flex justify-content-end mt-5 gap-4">
                        <Button onClick={() => handleSubmit()}>Save</Button>
                    </div>
                </Form>
            ) : (
                <>
                    <Grid className="p-5">
                        <Col span={9}>
                            <Skeleton
                                height={50}
                                radius="sm"
                                className="mb-4"
                            />
                            <Skeleton height={50} radius="sm" />
                        </Col>
                        <Col span={9}>
                            <Skeleton
                                height={50}
                                radius="sm"
                                className="mb-4"
                            />
                            <Skeleton height={50} radius="sm" />
                        </Col>
                    </Grid>
                    <Grid className="p-5">
                        <Col span={9}>
                            <Skeleton
                                height={50}
                                radius="sm"
                                className="mb-4"
                            />
                            <Skeleton height={50} radius="sm" />
                        </Col>
                        <Col span={9}>
                            <Skeleton
                                height={50}
                                radius="sm"
                                className="mb-4"
                            />
                            <Skeleton height={50} radius="sm" />
                        </Col>
                    </Grid>
                </>
            )}
        </div>
    );
};
const ChangeNotificationSettings = ({
    label,
    checked,
    name,
    fieldValue,
    values,
}: {
    label: string;
    checked?: boolean;
    name: string;
    fieldValue: (name: string, value: any) => void;
    values?: TNotificationPreferenceID;
}) => {
    const handleChange = (change: ChangeEvent<HTMLInputElement>) => {
        fieldValue(name, change.currentTarget.checked);
        if (name === "muted") {
            newLabel.forEach((element) => {
                fieldValue(element.name, !change.currentTarget.checked);
            });
        }
        if (name !== "muted" && !checked) {
            fieldValue("muted", false);
        }
        // const newChecked =
        //     values &&
        //     Object.entries(values).reduce((acc: any, curr) => {
        //         const [key, value] = curr;
        //         const newValues = [
        //             ...acc,
        //             acc.push({ name: key, checked: value }),
        //         ];
        //         return acc;
        //     }, []);
        // newChecked.forEach((element: { name: string; checked: boolean }) => {
        //     let isValid = false;
        //     if (element.name !== "muted" && element.checked === true) {
        //         isValid = true;
        //     }
        //     console.log(isValid, "isvlid");

        //     if (!isValid) {
        //         fieldValue("muted", true);
        //     }
        // });

        //  else {
        //     fieldValue("muted", !change.currentTarget.checked);
        // }
    };

    return (
        <div className="change-notification">
            <p className="change-notify-label">{label}</p>
            <Switch
                name={name}
                size="md"
                onChange={handleChange}
                checked={checked}
            />
        </div>
    );
};
export default NotificationSettings;
