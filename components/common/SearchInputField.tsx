import InputField from "@components/common/InputField";
import { SearchOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";

export interface Props {
    validationSchema: any;
    placeholder: string;
}

export const SearchInputField = ({ validationSchema, placeholder }: Props) => {
    return (
        <Formik
            initialValues={{ name: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                console.log(values);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form className="search-input-field">
                    <InputField
                        type="text"
                        name="text"
                        error={errors.name}
                        touch={touched.name}
                        placeHolder={placeholder}
                    />

                    <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                    >
                        <SearchOutlined className="svg-icon" />
                    </button>
                </Form>
            )}
        </Formik>
    );
};
