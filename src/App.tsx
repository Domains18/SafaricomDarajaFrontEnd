import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [amount, setAmount] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [transactionDetails, setTransactionDetails] = useState<any>([]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const MpesaStkPushSubmitted = () =>
    toast(
      "Mpesa Stk Push Submitted Successfully, Enter your Pin to complete the transaction",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      }
    );
  const MpesaStkPushSuccess = () =>
    toast.info("Mpesa Stk Push Success, transaction completed successfully");
  const MpesaStkPushFailed = () =>
    toast.error("Mpesa Stk Push Failed, Please try again", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  const StkPushCancelledByUser = () =>
    toast.error("StkPush was rejected by the user", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api//stkpush", {
        phone: phoneNumber,
        amount: amount,
      });
      // setTransactionDetails(data);
      console.log(data);
      setIsLoading(false);
      MpesaStkPushSuccess();
      await validateTransaction(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      MpesaStkPushFailed();
    }
  };
  const validateTransaction = async (payload: any) => {
    //recursive function to check transaction status until data is returned
    const checkStatus = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/validate",
          {
            payload: {
              MerchantRequestID: payload.MerchantRequestID,
            },
          }
        );
        const transaction = data.transaction;
        switch (transaction["ResultCode"]) {
          case 0:
            console.log("Transaction Successful");
            MpesaStkPushSuccess();
            break;

          case 1032:
            console.log("Transaction cancelled by user");
            StkPushCancelledByUser();
            break;

          default:
            console.log("Transaction Failed");
            MpesaStkPushFailed();
            await checkStatus();
            break;
        }
      } catch (error) {
        console.log(error);
        MpesaStkPushFailed();
      }
    };
    setTimeout(checkStatus, 10000);
  };
  // @ts-ignore
  return (
    <div className="App bg-slate-700 h-screen text-white w-full">
      <header className="App-header">
        <p className="text-center pt-9">Please Enter your Details Below</p>
      </header>
      <div className="flex items-center justify-center">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
            type="text"
            placeholder="2547XXXXXXXX"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <button
            className={`border-2 border-gray-500 rounded-md p-2 m-2 bg-green-600 
            hover:bg-green-700 ${
              !phoneNumber || !amount ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={!phoneNumber || !amount || isLoading}
            onClick={MpesaStkPushSubmitted}
          >
            Submit
          </button>
          <ToastContainer />
          {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <p className="text-white absolute">Loading...</p>
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
