import { useFormik } from "formik";
import AccountDetails from "./AccountDetails";
import PersonalInfo from "./PersonalInfo";
import { useAuth } from "../../../hooks/Auth";
import { useNavigate } from "react-router-dom";
import { SignUpValidation } from "../../utils/Validation";
import Button from "../../common/Button";
import { useState } from "react";
function Index() {
  const [isNext, setIsNext] = useState(1);
  const { signup, isError } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      date: "",
      address: "",
    },
    validationSchema: SignUpValidation,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      console.log(formik.errors);
      try {
        const response = await signup(values);
        if (response.success) {
          navigate("/dashboard");
        }
      } catch (error: any) {
        setStatus(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleNext = () => {
    setIsNext((prev) => prev + 1);
  };
  const isValueFill = () => {
    const { userName, password, confirmPassword } = formik.values;
    return (
      userName && password && confirmPassword && password === confirmPassword
    );
  };

  return (
    <section className=" h-[80%] overflow-y-auto w-[40%] bg-black flex items-center justify-center rounded-xl shadow-md relative">
      <form onSubmit={formik.handleSubmit}>
        {isNext === 1 && (
          <section className="flex flex-col gap-4">
            <div>
              <h1 className="text-bold text-white text-3xl">Account Details</h1>
            </div>
            <AccountDetails formik={formik} />
            <Button
              type="button"
              disabled={!isValueFill()}
              name="Next"
              style="bg-white py-2 w-96 rounded-3xl font-bold hover:bg-gray-300"
              onClick={handleNext}
            />
          </section>
        )}
        {isNext === 2 && (
          <section className="flex flex-col gap-4">
            <div>
              <h1 className="text-bold text-white text-3xl">
                Personal Information
              </h1>
            </div>
            <PersonalInfo formik={formik} />
            <div className="h-[12px]">
              {isError && (
                <p className="text-red-600 text-[12px] font-bold">{isError}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={
                formik.isSubmitting ||
                !formik.isValid ||
                Object.keys(formik.touched).length === 0
              }
              style="bg-white py-2 w-96 rounded-3xl font-bold hover:bg-gray-300"
              name={
                formik.isSubmitting ? "Creating Account..." : "Create Account"
              }
            />
          </section>
        )}
      </form>
    </section>
  );
}

export default Index;
