import { useFormik } from "formik";
import { useAuth } from "../../../hooks/Auth";
import FormField from "./FormField";
import Button from "../../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginValidation } from "../../utils/Validation";
function Index() {
  const { login, isError } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidation,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      console.log(formik.errors);
      try {
        console.log(values);
        const response = await login(values);
        console.log('Login response:', response);
        if (response.success) {
          response.user.role === "user"
            ? navigate("/dashboard")
            : navigate("/adminpannel");
        }
      } catch (error: any) {
        setStatus(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <section className="py-10 rounded-xl w-[30%] h-[70%] bg-black items-center justify-center overflow-y-auto flex flex-col relative shadow-md">
      <section className="absolute top-5 ">
        <h1 className="text-white font-bold text-3xl"> Login</h1>
      </section>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-10">
        <FormField formik={formik} />
        <div className="h-[12px]">
          {isError && (
            <p className="text-red-600 text-[12px] font-bold">{isError}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={
            formik.isSubmitting ||
            Object.keys(formik.errors).length > 0 ||
            !formik.isValid||Object.values(formik.values).some(value => !value.trim())
          }
          style="bg-white py-2 w-96 rounded-3xl font-bold hover:bg-gray-300"
          name={formik.isSubmitting ? "Loading..." : "Login"}
        />
        <p className="text-gray-300 text-center">
          No account?{" "}
          <Link to="/signup" className="text-blue-600">
            Register now
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Index;
