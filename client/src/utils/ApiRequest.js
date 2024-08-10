const host = "http://localhost:9000";
// const host = "https://finance-tracker-u8k5.onrender.com";

// Auth APIs
export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;

// Transaction APIs
export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;

// Savings Goals APIs
export const addSavingsGoal = `${host}/api/v1/addSavingsGoal`;
export const getSavingsGoal = `${host}/api/v1/getSavingsGoals`;
export const updateSavingsGoal = `${host}/api/v1/updateSavingsGoal`;
export const deleteSavingsGoal = `${host}/api/v1/deleteSavingsGoal`;
