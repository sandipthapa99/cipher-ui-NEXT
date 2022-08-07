import * as Yup from "yup";

let serviceTitleValidate, serviceDescriptionValidate, serviceTypeValidate, serviceCategoryValidate, serviceRequirementValidate, startingPriceValidate, revisionNumberValidate, packageTitleValidate, packageDesctiptionValidate, servicesOfferedValidate, packagePriceValidate, revisionPriceValidate, revisionDayValidate;

serviceTitleValidate = Yup.string().required("Required field");
serviceDescriptionValidate = Yup.string().required("Required field");
serviceTypeValidate = Yup.string().required("Required field");
serviceCategoryValidate = Yup.string().required("Required field");
serviceRequirementValidate = Yup.string().required("Required field");
startingPriceValidate = Yup.string().required("Required field");
revisionNumberValidate = Yup.number().required("Required field");
packageTitleValidate = Yup.string().required("Required field");
packageDesctiptionValidate = Yup.string().required("Required field");
servicesOfferedValidate = Yup.string().required("Required field");
packagePriceValidate = Yup.number().required("Required field");
revisionPriceValidate = Yup.string().required("Required field");
revisionDayValidate = Yup.string().required("Required field");

export const addServiceFormSchema = Yup.object().shape({
   service_title: serviceTitleValidate,
   service_description: serviceDescriptionValidate,
   service_type: serviceTypeValidate,
   service_category: serviceCategoryValidate,
   requirement: serviceRequirementValidate,
   starting_price: startingPriceValidate,
   revision_number: revisionNumberValidate,
   package_title: packageTitleValidate,
   package_description: packageDesctiptionValidate,
   package_revisions_number: revisionNumberValidate,
   services_offered: servicesOfferedValidate,
   package_price: packagePriceValidate,
   revision_price: revisionPriceValidate,
   revision_day: revisionDayValidate,
});