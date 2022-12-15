const taskPath = "/task/entity/service/";
const blogPath = "/blog/";
const taskerPath = "/tasker/";
const careerPath = "/career/vacancy/";
const localePath = "/locale/client/";
const bookings = "/task/entity/service-booking/";
const myBookings = "/task/entity/service-mybooking/";
const tasks = "/task/entity/service/";
const support = "/support/";
const payment = "/payment/";
const offer = "/offer/";

const urls = {
    user: {
        login: "/user/login/",
        signup: "/user/signup/",
        changePassword: "/user/password/change/",
        google: "/user/register/social/google-oauth2/",
        facebook: "/user/register/social/facebook/",
        activity: "/history/my-activities/",
    },
    task: {
        list: taskPath,
        myBookings: `${myBookings}?is_requested=false`,
        service: `${taskPath}?is_requested=false`,
        service_per_user: `${taskPath}?is_requested=false&user=`,
        task: `${taskPath}?is_requested=true`,
        my_task: `${tasks}?is_requested=true`,
        requested_task: `${myBookings}?is_requested=true`,
        my_applicants: `${bookings}`,
        taskApplicantsNumber: `${tasks}tasker-count`,
        approvedTaskList: `${tasks}task/list/`,
        application: "/task/application",
        cancelApplication: `task/entity/service-booking/cancel`,
        assigneeDetail: "task/asignee-task-detail/",
        assignerDetail: "task/assigner-task-detail/",
        assignerApplication: "task",
        heroCategory: "task/hero-category",
        approval: `task/entity/service-booking/approval/`,
        decline: `task/entity/service-booking/reject/`,
    },
    profile: {
        portfolio: `${taskerPath}portfolio/`,
        education: `${taskerPath}education/`,
        experience: `${taskerPath}experience/`,
        certifications: `${taskerPath}certification/`,
        rating: `/task/rating`,
        other_bookings: `/task/entity/service-booking/`,
        my_bookings: `/task/entity/service-mybooking/`,
    },

    tasker: {
        list: taskerPath,
        profile: `${taskerPath}profile/`,
        top_tasker: `${taskerPath}top-tasker/`,
        success_story: `${taskerPath}success-story/`,
    },

    followers: {
        list: `${taskerPath}my-followers/`,
    },
    followings: {
        list: `${taskerPath}my-following/`,
    },
    follow: `${taskerPath}follow/`,

    category: { list: `/task/task-category/nested/` },
    carrer: { list: `${careerPath}list/`, detail: `${careerPath}detail/` },
    blog: { list: blogPath, detail: `${blogPath}detail/` },
    wishlist: {
        list: "task/wishlist/",
    },
    bookmark: "/task/bookmark/",
    locale: {
        localePath,
        city: `${localePath}city/options/?search=`,
    },
    trusted_partners: "/landingpage/trusted-partner/",
    hero_category: "/task/hero-category/",
    privacyPolicy: "/landingpage/content/privacy-policy/",
    termsandconditions: "/landingpage/content/terms-conditions/",
    support: { help: `${support}help/`, helpTopics: `${support}help/topic/` },
    payment: {
        method: `${payment}cms/payment-method/`,
        intent: `${payment}intent/`,
        order: `${payment}order/`,
    },
    offer: {
        offerCode: `${offer}applyoffercode/`,
        reedem: `${offer}redeem/`,
        list: `${offer}offerredeem/list/`,
        all: `${offer}serviceoffer/all/`,
    },
};

export default urls;
