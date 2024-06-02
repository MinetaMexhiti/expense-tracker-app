import React from "react";
import useCurrencyFormatter from "../../../hooks/useCurrencyFormatter";
import DataGraph from "../../../components/Dashboard/DataGrap";

const UserProfileStats = ({
  totalInc,
  totalExp,
  incResult = {},
  expResult = {},
  netProfit,
}) => {
  const formattedTotalExp = useCurrencyFormatter("USD", totalExp || 0);
  const formattedTotalInc = useCurrencyFormatter("USD", totalInc || 0);
  const formattedNetProfit = useCurrencyFormatter("USD", netProfit || 0);

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
          <DataGraph income={totalInc} expenses={totalExp} />
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
                  <span>{expResult?.totalRecords || 0}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Minimum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{expResult?.minExp || 0}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Maximum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{expResult?.maxExp || 0}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Average Transactions</span>
                <span className="text-danger ms-1">
                  <span>{expResult?.averageExp || 0}</span>
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
                  <span>{incResult?.totalRecords || 0}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Minimum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{incResult?.minInc || 0}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Maximum Transactions</span>
                <span className="text-danger ms-1">
                  <span>{incResult?.maxInc || 0}</span>
                </span>
              </p>
              <p className="mb-0">
                <span>Average Transactions</span>
                <span className="text-danger ms-1">
                  <span>{incResult?.averageInc || 0}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileStats;
