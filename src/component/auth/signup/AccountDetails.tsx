import Input from "../../common/Input";
import PasswordField from "../../common/PasswordField";

function AccountDetails({ formik }) {
  return (
    <section className="flex flex-col gap-4">
      <Input
        type="text"
        id="userName"
        label="Username"
        style="border-2 focus:border-blue-600 py-2 rounded-md w-96 border-gray-300 outline-none caret-white text-white pl-2"
        {...formik.getFieldProps("userName")}
        error={formik.touched.userName && formik.errors.userName}
      />
      <PasswordField
        label="Password"
        id="password"
        type="password"
        {...formik.getFieldProps("password")}
        error={formik.touched.password && formik.errors.password}
      />
      <PasswordField
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        {...formik.getFieldProps("confirmPassword")}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />
    </section>
  );
}

export default AccountDetails;
