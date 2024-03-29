export default {
  email: {
    required: "Email is required",
    invalid: "Invalid email",
  },
  password: {
    required: "Password is required",
    length: "Password must be at least 8 characters",
  },
  username: {
    required: "Username is required",
    length: "Username must be at least 3 characters",
  },
} as const
