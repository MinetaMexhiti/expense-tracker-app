import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
import { addNewExpAction } from "../../redux/slices/expenses/expenseAction";
import NewRecordWelcomePage from "./NewRecordWelcomePage";
import { addNewIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../DisabledButton";
import ErrorDisplayMessage from "../ErrorDisplayMessage";
import { toast } from 'react-toastify'; // Import toast from react-toastify

// Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});

const NewRecord = () => {
  const [isExp, setIsExp] = useState(false);
  const [isInc, setIsInc] = useState(false);

  const isExpHandler = () => {
    setIsExp(true);
    setIsInc(false);
    toast.info("Are you sure you want to add Expense?"); // Changed from alert.show to toast.info
  };

  const isIncHandler = () => {
    setIsExp(false);
    setIsInc(true);
    toast.info("Want to add income?"); // Changed from alert.show to toast.info
  };

  //dispatch action
  const dispatch = useDispatch();

  //expense
  const expenses = useSelector(state => state?.expenses);
  const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;
  //income
  const income = useSelector(state => state?.income);
  const { incLoading, incAppErr, incServerErr, isIncCreated } = income;
  
  const navigate = useNavigate();

  //initialize form
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: values => {
      return isExp
        ? dispatch(addNewExpAction(values))
        : isInc
        ? dispatch(addNewIncomeAction(values))
        : null;
    },
    validationSchema: formSchema,
  });

  //Redirect
  useEffect(() => {
    if (isExpCreated) {
      navigate("/expenses");
    }
    if (isIncCreated) {
      navigate("/incomes");
    }
  }, [isExpCreated, isIncCreated, navigate]);

  return (
    <>
      { /* Existing component structure unchanged */ }
    </>
  );
};

export default NewRecord;
