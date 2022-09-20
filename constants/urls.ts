const taskPath = "/task/entity/service/";
const blogPath = "/blog/";
const taskerPath = "/tasker/";
const careerPath = "/career/vacancy/";
const bookings = "/task/entity/service-booking/";
const urls = {
    user: {
        login: "user/login/",
        signup: "user/signup/",
        changePassword: "user/password/change/",
    },
    task: {
        list: taskPath,
        service: `${taskPath}?is_requested=false`,
        service_per_user: `${taskPath}?is_requested=false&user=`,
        task: `${taskPath}?is_requested=true`,
        my_task: `${bookings}?is_requested=true`,
        application: "/task/application",
        cancelApplication: `task/entity/service-booking/cancel`,
        assigneeDetail: "task/asignee-task-detail/",
        assignerDetail: "task/assigner-task-detail/",
        assignerApplication: "task",
        heroCategory: "task/hero-category",
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
};

export default urls;
