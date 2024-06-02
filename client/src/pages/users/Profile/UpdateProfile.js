import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import moneySVG from "../../../img/money.svg";
import {
  updateProfileAction,
  userProfileAction,
} from "../../../redux/slices/users/usersSlices";
import DisabledButton from "../../../components/DisabledButton";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import SuccessMessage from "../../../components/SuccessMessage";

//Form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
});

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const users = useSelector((state) => state?.users);
  const { profile, userLoading, userAppErr, userServerErr, isUpdated } = users;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profile?.email,
      firstname: profile?.firstname,
      lastname: profile?.lastname,
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (isUpdated) navigate("/profile");
  }, [isUpdated, navigate]);

  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img className="img-fluid" src={moneySVG} alt="money-svg" width="200" />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">Update Profile</span>
                <h2 className="mb-4 fw-light">Update your profile</h2>
                {userAppErr || userServerErr ? (
                  <ErrorDisplayMessage
                    error={{ appErr: userAppErr, serverErr: userServerErr }}
                  />
                ) : null}
                {isUpdated && <SuccessMessage msg="Profile updated successfully!" />}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.firstname}
                    onBlur={formik.handleBlur("firstname")}
                    onChange={formik.handleChange("firstname")}
                    className="form-control"
                    type="text"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.lastname}
                    onBlur={formik.handleBlur("lastname")}
                    onChange={formik.handleChange("lastname")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.email}
                    onBlur={formik.handleBlur("email")}
                    onChange={formik.handleChange("email")}
                    className="form-control"
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                {userLoading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" className="btn btn-primary mb-4 w-100">
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
