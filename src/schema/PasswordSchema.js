import * as yup from "yup";
export const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("Required"),
    newPassword: yup
        .string()
        .required("Required")
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must be at most 20 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: yup
        .string()
        .required("Required")
        .oneOf([yup.ref("newPassword")], "Passwords must match"),
});