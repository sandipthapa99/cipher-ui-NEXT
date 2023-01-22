import type { NextRouter } from "next/router";

// To check active menu page
export const handleMenuActive = (path: string, router: NextRouter) => {
    const defaultClass = "nav-item";
    const activeClass = defaultClass + " nav-item--active";
    return router.pathname == path ? activeClass : defaultClass;
};

// form-group validate
export const checkFormGroup = (error: any) => {
    const currentClass = "form-group";
    const errorClass = "validate";
    return error ? `${currentClass} ${errorClass}` : currentClass;
};

// form-control validate
export const checkFormControl = (error: any, touched: any) => {
    const currentClass = "form-control";
    const errorClass = "is-invalid";
    return error && touched ? `${currentClass} ${errorClass}` : currentClass;
};

// Form Button Submitting
export const isSubmittingClass = (isSubmitting: boolean) => {
    const defaultClass = `btn site-btn`;
    const submittingClass = `btn site-btn cf-spinner cf-spinner--center cf-spinner--sm isSubmitting`;
    return isSubmitting ? submittingClass : defaultClass;
};

// Date formatter
export const formatMonthDate = (dateString: any) => {
    const dateArray = new Date(String(dateString)).toDateString().split(" ");
    return `${dateArray[2]} ${dateArray[1]}, ${dateArray[3]}`;
};

export const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

// Blog API Links
export const BLOG_BASE_URL = "https://blog.api.cagtu.io/";
export const blogListAPI = `${BLOG_BASE_URL}blog/list`;
export const blogDetailAPI = `${BLOG_BASE_URL}blog/detail/`;

export const getPageUrl = () => {
    return typeof window != "undefined" ? window.location.href : "";
};
