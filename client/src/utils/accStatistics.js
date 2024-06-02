// utils/accStatistics.js
const calTransaction = (transactions) => {
  const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const avg = total / transactions.length || 0;
  const min = Math.min(...transactions.map(t => t.amount));
  const max = Math.max(...transactions.map(t => t.amount));
  return { totalExp: total, avgExp: avg, minExp: min, maxExp: max };
};

export default calTransaction;
