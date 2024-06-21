import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import DataGrap from "./DataGrap";




const DashboardData = () => {
  const dispatch = useDispatch();
  const { stats, statsLoading, appErr, serverErr } = useSelector(state => state.statistics);

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const expensesStats = stats?.expensesStats?.[0] || {};
  const incomeStats = stats?.incomeStats?.[0] || {};
  const profit = stats?.profit || 0;

  const totalExp = expensesStats.totalExp || 0;
  const totalInc = incomeStats.totalInc || 0;
  const avgExp = expensesStats.averageExp || 0;
  const avgInc = incomeStats.averageInc || 0;
  const minExp = expensesStats.minExp || 0;
  const maxExp = expensesStats.maxExp || 0;
  const minInc = incomeStats.minInc || 0;
  const maxInc = incomeStats.maxInc || 0;
  const numOfTransExp = expensesStats.totalRecords || 0;
  const numOfTransInc = incomeStats.totalRecords || 0;
  const netProfit = profit || 0;

  const formattedTotalExp = useCurrencyFormatter("USD", totalExp);
  const formattedTotalInc = useCurrencyFormatter("USD", totalInc);
  const formattedNetProfit = useCurrencyFormatter("USD", netProfit);

  if (statsLoading) {
    return <div>Loading...</div>;
  }

  if (appErr || serverErr) {
    return (
      <div>
        {appErr} {serverErr}
      </div>
    );
  }

  return (
    <section className="py-6">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <DataGrap income={totalInc} expenses={totalExp} />
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h2 className="text-success">Net Profit : {formattedNetProfit}</h2>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 mb-6">
            <div className="p-8 border rounded-2">
              <div className="d-flex mb-6 align-items-start justify-content-between">
                <span
                  className="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>
                <span className="badge fs-2 bg-light text-danger">
                  Total Expenses
                </span>
              </div>
              <h1 className="mb-4">{formattedTotalExp}</h1>
              <p className="mb-0">
                <span>Number of Transactions</span>
                <span className="text-danger ms-1">
                  <span>{numOfTransExp}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Minimum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{minExp}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Maximum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{maxExp}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Average Transactions</span>
                <span className="text-danger ms-1">
                  <span>{avgExp}</span>
                </span>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-6">
            <div className="p-8 border rounded-2">
              <div className="d-flex mb-6 align-items-start justify-content-between">
                <span
                  className="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>
                <span className="badge fs-2 bg-primary-light text-primary">
                  Total Income
                </span>
              </div>
              <h1 className="mb-4">{formattedTotalInc}</h1>
              <p className="mb-0">
                <span>Number of Transactions</span>
                <span className="text-danger ms-1">
                  <span>{numOfTransInc}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Minimum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{minInc}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Maximum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{maxInc}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Average Transactions</span>
                <span className="text-danger ms-1">
                  <span>{avgInc}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardData;
