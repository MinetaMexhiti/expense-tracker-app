import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../components/Loading/Loading";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import { format } from 'date-fns';

const UserProfileIncList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const users = useSelector(state => state?.users);
  const { profile, userLoading, userAppErr, userServerErr } = users;

  return (
    <section className="py-5">
      <div className="container">
        {userLoading ? (
          <LoadingComponent />
        ) : userAppErr || userServerErr ? (
          <ErrorDisplayMessage>
            {userServerErr} {userAppErr}
          </ErrorDisplayMessage>
        ) : (
          <>
            <h2>Income List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {profile?.income?.map((income) => (
                  <tr key={income.id}>
                    <td>{income.title}</td>
                    <td>${income.amount}</td>
                    <td>{format(new Date(income.createdAt), 'dd-MMM-yyyy')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default UserProfileIncList;
