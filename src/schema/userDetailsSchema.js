import * as yup from "yup";
export const userSchema = yup.object().shape({
    userName: yup
        .string()
        .matches(
            /^[a-z0-9_.]+$/,
            "Username must contain only small letters, underscores, dots, and numbers."
        )
        .required("Username is required."),
    email: yup
        .string()
        .email("Invalid email address.")
        .required("Email is required."),
    name: yup
        .string()
        .required("Name is required.")
        .min(1, "Name must be at least 1 character long.")
        .max(50, "Name cannot be longer than 50 characters."),
    phoneNumber:
        yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
    bio: yup
        .string()
        .trim()
        .matches(/^[^#<>@/"$%^&*()!+=:;{}[\]`\\|~]+$/, {
            message:
                "Invalid characters in bio. Bio cannot contain hashtags, links, or special characters.",
            excludeEmptyString: true,
        })
        .max(150, "Bio cannot be longer than 150 characters."),
});