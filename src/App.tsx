import React, {useState} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [amount, setAmount] = useState<string>("3000");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const MpesaStkPushSubmitted = () => toast("Mpesa Stk Push Submitted Successfully, Enter your Pin to complete the transaction", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
    });
    const MpesaStkPushSuccess = () => toast.info("Thank you for participating in the campaign, Your Voice Matters", );
    const MpesaStkPushFailed = () => toast.error("Mpesa Stk Push Failed, Please recheck your number",{
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
            const {data} = await axios.post(
                "http://localhost:3000/api//stkpush",
                {
                    phone: phoneNumber,
                    amount: 3000,
                }
            );
            setIsLoading(false);
            MpesaStkPushSuccess();
            // await validateTransaction(data);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            MpesaStkPushFailed();
        }
    };
    // const validateTransaction = async (payload: any) => {
    //     //recursive function to check transaction status until data is returned
    //     const checkStatus = async () => {
    //         try {
    //             const {data} = await axios.post(
    //                 "http://localhost:5000/api/validate",
    //                 {
    //                     payload: {
    //                         MerchantRequestID: payload.MerchantRequestID,
    //                     }
    //                 }
    //             );
    //             const transaction = data.transaction;
    //             switch (transaction['ResultCode']) {
    //                 case 0:
    //                     console.log("Transaction Successful");
    //                     MpesaStkPushSuccess();
    //                     break;

    //                 case 1032:
    //                     console.log("Transaction cancelled by user");
    //                     StkPushCancelledByUser();
    //                     break;

    //                 default:
    //                     console.log("Transaction Failed");
    //                     MpesaStkPushFailed();
    //                     await checkStatus()
    //                     break;
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             MpesaStkPushFailed();
    //         }
    //     };
    //     setTimeout(checkStatus, 10000);

    // }
    // @ts-ignore
    return (
      <div className="App bg-slate-700 h-screen text-white w-ful pt-[100px]">
        <header className="App-header"></header>
        <h1 className="text-3xl text-center font-bold">
                #RejectFinanceBilll2024
                #RejectICTBill2024
        </h1>
        <div className="flex items-center justify-center">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
              type="text"
              placeholder="start with 2547..."
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <input
              className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={handleAmountChange}
              disabled
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
        <div className="flex items-center justify-center">
          <p className="text-center border  p-3 w-[40%] jus">Hey there patriot, you know it is hard when tech bros are becoming activits. This will initiate a stk Push Request to your MP number with message <q>Do you want to pay 3000 to account Reject Finance Bill 2024</q></p>
        </div>
      </div>
    );
}

export default App;
