import Input from "../../common/Input";
function PersonalInfo({ formik }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          label="First Name"
          id="firstName"
          style="border-2 focus:border-blue-600 py-2 rounded-md w-46 border-gray-300 outline-none caret-white text-white pl-2"
          {...formik.getFieldProps("firstName")}
          error={formik.touched.firstName && formik.errors.firstName}
        />
        <Input
          type="text"
          label="Last Name"
          id="lastName"
          style="border-2 focus:border-blue-600 py-2 rounded-md w-48 border-gray-300 outline-none caret-white text-white pl-2"
          {...formik.getFieldProps("lastName")}
          error={formik.touched.lastName && formik.errors.lastName}
        />
      </div>
      <Input
        type="email"
        label="Email"
        id="email"
        style="border-2 focus:border-blue-600 py-2 rounded-md w-96 border-gray-300 outline-none caret-white text-white pl-2"
        {...formik.getFieldProps("email")}
        error={formik.touched.email && formik.errors.email}
      />
      <Input
        type="tel"
        label="Phone Number"
        id="phoneNumber"
        style="border-2 focus:border-blue-600 py-2 rounded-md w-96 border-gray-300 outline-none caret-white text-white pl-2"
        {...formik.getFieldProps("phoneNumber")}
        error={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />
      <Input
        id="data"
        type="date"
        label="Date of Birth"
        style="border-2 focus:border-blue-600 py-2 rounded-md w-96 border-gray-300 outline-none caret-white text-white pl-2"
        {...formik.getFieldProps("date")}
        error={formik.touched.date && formik.errors.date}
      />
      <Input
        type="text"
        label="Address"
        id="address"
        style="border-2 focus:border-blue-600 py-2 rounded-md w-96 border-gray-300 outline-none caret-white text-white pl-2"
        {...formik.getFieldProps("address")}
        error={formik.touched.address && formik.errors.address}
      />
    </section>
  );
}

export default PersonalInfo;
