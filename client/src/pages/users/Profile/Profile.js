import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import calTransaction from "../../../utils/accStatistics";
import DashboardData from "../../../components/Dashboard/DashboardData";
import UserProfileStats from "./UserProfileStats";
import DataGrap from "../../../components/Dashboard/DataGrap";
import LoadingComponent from "../../../components/Loading/Loading";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import { format } from 'date-fns';
import navigate from "../../../utils/navigate";

const Profile = () => {
  const [expResult, setExpResult] = useState({});
  const [incResult, setIncResult] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const users = useSelector(state => state?.users);
  const { profile, userLoading, userAppErr, userServerErr } = users;

  useEffect(() => {
    if (profile?.expenses) {
      const expenses = calTransaction(profile?.expenses);
      setExpResult(expenses);
    }
    if (profile?.income) {
      const income = calTransaction(profile?.income);
      setIncResult(income);
    }
  }, [profile]);

  const totalInc = incResult.totalExp || 0;
  const totalExp = expResult.totalExp || 0;
  const netProfit = totalInc - totalExp;

  return (
    <>
      {userLoading ? (
        <LoadingComponent />
      ) : userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <>
          <section className="py-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-12 col-lg-4 mb-5">
                  <div className="text-center mb-5 mb-lg-0">
                    <img
                      src={profile?.profilePhoto}
                      alt={profile?.lastname}
                      className="rounded-circle mb-3"
                      width="150"
                      height="150"
                    />
                    <h4 className="mb-2">
                      {profile?.firstname} {profile?.lastname}
                    </h4>
                    <p className="text-muted mb-0">
                      {profile?.createdAt && format(new Date(profile?.createdAt), 'dd-MMM-yyyy')}
                    </p>
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        onClick={() => navigate("/update-profile")}
                        className="btn btn-primary me-2"
                      >
                        Update Profile
                      </button>
                      <button className="btn btn-danger me-2">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <UserProfileStats
                    netProfit={netProfit}
                    totalInc={totalInc}
                    totalExp={totalExp}
                    incResult={incResult}
                    expResult={expResult}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="py-5 bg-light">
            <div className="container">
              <h2 className="mb-5 text-center">Recent Transactions</h2>
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h5 className="mb-4">Recent Income</h5>
                  <ul className="list-group">
                    {profile?.income?.slice(0, 5).map((inc, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h6 className="mb-0">{inc?.title}</h6>
                          <small className="text-muted">
                            {inc?.createdAt && format(new Date(inc?.createdAt), 'dd-MMM-yyyy')}
                          </small>
                        </div>
                        <span className="badge bg-success">
                          ${inc?.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6 mb-5">
                  <h5 className="mb-4">Recent Expenses</h5>
                  <ul className="list-group">
                    {profile?.expenses?.slice(0, 5).map((exp, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h6 className="mb-0">{exp?.title}</h6>
                          <small className="text-muted">
                            {exp?.createdAt && format(new Date(exp?.createdAt), 'dd-MMM-yyyy')}
                          </small>
                        </div>
                        <span className="badge bg-danger">${exp?.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button
                  onClick={() => navigate("/user-profile-income")}
                  className="btn btn-success me-2"
                >
                  View All Income
                </button>
                <button
                  onClick={() => navigate("/user-profile-expenses")}
                  className="btn btn-danger me-2"
                >
                  View All Expenses
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Profile;
