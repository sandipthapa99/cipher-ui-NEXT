export interface UserProfileInfoProps {
    userImage: string;

    countryCode: number | undefined;

    userName: string | undefined;

    userJob: string | undefined;

    userRating: number;

    userPrice: number | undefined;

    userLocation: string | undefined;

    userPhone: string | undefined;

    userEmail: string | undefined;

    moreServices: string | undefined;

    activeFrom: string | undefined;

    activeTo: string | undefined;

    userBio: string | undefined;

    userBadge: string | undefined;

    userPoints: number | undefined;

    pointGoal: number | undefined;

    happyClients: number | undefined;

    successRate: number | undefined;

    userReviews: number | undefined;

    taskCompleted: number | undefined;

    userActiveStatus: boolean | undefined;

    tooltipMessage: string | undefined;
}
