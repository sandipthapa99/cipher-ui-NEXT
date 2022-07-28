export interface RewardCardProps {
    title: string;
    rewardImage: string;
    haveDiscount?: boolean;
    discount?: string;
    description: string;
    haveCouponCode: boolean;
    isAvailable?: boolean;
    daysLeft?: number;
    isCouponCodeAvailable: boolean;
    couponCode?: string;
    btnText?: string;
}
