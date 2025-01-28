import Input from "../../common/Input";
import PasswordField from "../../common/PasswordField";

function FormField({formik}) {
  return (
    <section>
      <Input
        id="email"
        label="Email"
        type="email"
        style="border-2 focus:border-blue-600 py-2 rounded-md w-96 border-gray-300 outline-none caret-white text-white pl-2"
        {...formik.getFieldProps("email")}
        error={formik.touched.email && formik.errors.email}
      />
      <PasswordField
        id="password"
        type="password"
        label="Password"
        {...formik.getFieldProps("password")}
        error={formik.touched.password && formik.errors.password}
      />
    </section>
  );
}

export default FormField;
