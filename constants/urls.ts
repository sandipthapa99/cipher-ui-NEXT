const taskPath = "/task/entity/service/";
const blogPath = "/blog/";
const taskerPath = "/tasker/";

const urls = {
    user: {
        login: "user/login/",
        signup: "user/signup/",
        changePassword: "user/password/change/",
    },
    task: {
        list: taskPath,
        service: `${taskPath}?is_requested=false`,
        application: "task/application/",
        cancelApplication: "task/application/",
        assigneeDetail: "task/asignee-task-detail/",
        assignerDetail: "task/assigner-task-detail/",
        assignerApplication: "task/assigner/application",
        heroCategory: "task/hero-category",
    },
    tasker: {
        list: taskerPath,
        top_tasker: `${taskerPath}top-tasker/`,
        success_story: `${taskerPath}success-story/`,
    },
    blog: { list: blogPath },
    wishlist: {
        list: "task/wishlist/",
    },
};

export default urls;
