import FormButton from "@components/common/FormButton";
import { Button, Grid, Skeleton, Switch } from "@mantine/core";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { data } from "cheerio/lib/api/attributes";
import { useFormik } from "formik";
import { Formik } from "formik";
import { type } from "os";
import React, { useCallback, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

interface TNotificationPreferences {
    id: number;
    update_notification: boolean | null | undefined;
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
        name: "update_notification",
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

const NotificationSettings = () => {
    const [notificationData, setNotificationData] =
        useState<TNotificationPreferenceID>({
            update_notification: false,
            reminder_notification: false,
            alert_notification: false,
            geolocation_notification: false,
            muted: false,
        });
    const { data: notifcationPreferences, isLoading } = useQuery(
        ["notification-preferences"],
        () => {
            return axiosClient.get<TNotificationPreferences[]>(
                "/notification/list-preference/"
            );
        },
        {
            onSuccess: (notification) => {
                const newValues = {
                    update_notification:
                        notification.data[0].update_notification,
                    reminder_notification:
                        notification.data[0].reminder_notification,
                    alert_notification: notification.data[0].alert_notification,
                    geolocation_notification:
                        notification.data[0].geolocation_notification,
                    muted: notification.data[0].muted,
                };
                setNotificationData(newValues);
            },
        }
    );

    // const notificationSettings: any = notifcationPreferences?.data[0];

    const changeNotificationSetting = useMutation(
        (data: TNotificationPreferenceID) =>
            axiosClient.patch("/notification/add-preference/", data)
    );

    const queryClient = new QueryClient();

    const { handleSubmit, setFieldValue, values } = useFormik({
        initialValues: notificationData,

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
            const newvalues: any = { ...values };

            return (
                <ChangeNotificationSettings
                    key={item?.id}
                    name={item?.name}
                    label={item?.label}
                    fieldValue={setFieldValue}
                    checked={newvalues[item.name]}
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
                <Grid className="p-5">
                    <Col span={9}>
                        <Skeleton height={50} radius="sm" className="mb-4" />
                        <Skeleton height={50} radius="sm" />
                    </Col>
                    <Col span={9}>
                        <Skeleton height={50} radius="sm" className="mb-4" />
                        <Skeleton height={50} radius="sm" />
                    </Col>
                </Grid>
            )}
        </div>
    );
};
const ChangeNotificationSettings = ({
    label,
    checked,
    name,
    fieldValue,
}: {
    label: string;
    checked?: boolean;
    name: string;
    fieldValue: (name: string, value: any) => void;
}) => {
    return (
        <div className="change-notification">
            <p className="change-notify-label">{label}</p>
            <Switch
                name={name}
                size="md"
                onChange={(change) =>
                    fieldValue(name, change.currentTarget.checked)
                }
                checked={checked}
            />
        </div>
    );
};
export default NotificationSettings;
