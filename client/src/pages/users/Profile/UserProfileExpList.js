import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import UserProfileContentDetails from "../../../components/UserProfile/UserProfileContentDetails";
import LoadingComponent from "../../../components/Loading/Loading";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import ContentDetails from "../../../components/ContentDetails/ContentDetails";

const UserProfileExpList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const users = useSelector(state => state?.users);
  const { profile, userLoading, userAppErr, userServerErr } = users;

  return (
    <>
      {userLoading ? (
        <LoadingComponent />
      ) : userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-5 bg-white vh-100">
          <div className="container">
            <h2 className="mb-5 text-center">Expense Transactions</h2>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="bg-success text-white">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile?.expenses?.length <= 0 ? (
                        <tr className="text-center">
                          <td colSpan="5" className="py-3">
                            No Expense Found
                          </td>
                        </tr>
                      ) : (
                        profile?.expenses?.map(exp => (
                          <UserProfileContentDetails item={exp} key={exp?._id} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserProfileExpList;
