import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
import { addNewIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../../components/DisabledButton";

//Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});

const AddIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const income = useSelector(state => state?.income);
  const { incLoading, incAppErr, incServerErr, isIncCreated } = income;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: values => {
      dispatch(addNewIncomeAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (isIncCreated) {
      navigate("/user-profile-income");
    }
  }, [isIncCreated, navigate]);

  return (
    <section className="py-5 bg-success vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img className="img-fluid" src={moneySVG} alt="SVGeXPENSES" width="200" />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">Income</span>
                <h2 className="mb-4 fw-light">Record New Income</h2>
                {incServerErr || incAppErr ? (
                  <div className="alert alert-danger" role="alert">
                    {incServerErr} {incAppErr}
                  </div>
                ) : null}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onBlur={formik.handleBlur("title")}
                    onChange={formik.handleChange("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.description}
                    onBlur={formik.handleBlur("description")}
                    onChange={formik.handleChange("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.description && formik.errors.description}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.amount}
                    onBlur={formik.handleBlur("amount")}
                    onChange={formik.handleChange("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.amount && formik.errors.amount}
                </div>
                {incLoading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" className="btn btn-success mb-4 w-100">
                    Record Income
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

export default AddIncome;
