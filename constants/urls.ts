const taskPath = "/task/entity/service/";
const blogPath = "/blog/";
const taskerPath = "/tasker/";
const careerPath = "/career/vacancy/";
const localePath = "/locale/client/";
const bookings = "/task/entity/service-booking/";
const myBookings = "/task/entity/service-mybooking/";
const tasks = "/task/entity/service/";

const urls = {
    user: {
        login: "/user/login/",
        signup: "/user/signup/",
        changePassword: "/user/password/change/",
        google: "/user/register/social/google-oauth2/",
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
        approvedTaskList: `${tasks}task/list`,
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
    },
    tasker: {
        list: taskerPath,
        profile: `${taskerPath}profile/`,
        top_tasker: `${taskerPath}top-tasker/`,
        success_story: `${taskerPath}success-story/`,
    },
    category: { list: `/task/task-category/nested/` },
    carrer: { list: `${careerPath}list/`, detail: `${careerPath}detail/` },
    blog: { list: blogPath, detail: `${blogPath}detail/` },
    wishlist: {
        list: "task/wishlist/",
    },
    bookmark: "/task/bookmark/",
    locale: {
        localePath,
        city: `${localePath}city/options?search=`,
    },
};

export default urls;
