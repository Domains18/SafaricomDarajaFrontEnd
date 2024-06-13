import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [amount] = useState<string>("1");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const MpesaStkPushSubmitted = () =>
    toast(
      "Mpesa Stk Push Submitted Successfully, Your MP has received the notification",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      }
    );

  const MpesaStkPushSuccess = () =>
    toast.info(
      "Thank you for participating in the campaign, Your Voice Matters"
    );

  const MpesaStkPushFailed = () =>
    toast.error("Mpesa Stk Push Failed, Please recheck your number", {
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
      await axios.post("https://nodejsdaraja.onrender.com/api/stkpush", {
        phone: phoneNumber,
        amount: 1,
      });
      setIsLoading(false);
      MpesaStkPushSuccess();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      MpesaStkPushFailed();
    }
  };

  return (
    <div className="App bg-slate-700 min-h-screen text-white flex flex-col items-center justify-center px-4 py-8">
      <header className="App-header"></header>
      <h1 className="text-3xl font-bold text-center mb-8">
        #RejectFinanceBilll2024
        <br />
        #RejectICTBill2024
      </h1>
      <div className="w-full max-w-md">
        {/* <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black w-full"
            type="text"
            placeholder="Start with 2547..."
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black w-full"
            type="number"
            placeholder="3000"
            value={amount}
            disabled
          />
          <button
            className={`border-2 border-gray-500 rounded-md p-2 m-2 bg-green-600 hover:bg-green-700 w-full ${
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
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </form> */}
        <p className="text-center border p-3 ">
          Being such a sensitive issue, I have had to disable the form. The struggle continues. #RejectFinanceBilll2024 #RejectICTBill2024. You can still call your MP. #RejectFinanceBilll2024 #RejectICTBill2024
        </p>
      </div>
      <div className="mt-8 lg:w-1/2">
        <p className="text-center border p-3 ">
          Hey there patriot, you know it is hard when tech bros are becoming
          activists. This will initiate a Stk Push Request to your MP number
          with the message{" "}
          <q>Do you want to pay 1 to account Reject Finance Bill 2024</q>
          Also call your MP. #RejectFinanceBilll2024 #RejectICTBill2024
        </p>
        <br />
        <p className="text-center border p-3 ">
          The Finance Bill 2024 is a bill that seeks to amend various tax laws
          in Kenya. The ICT Bill 2024 is a bill that seeks to regulate the ICT
          sector in Kenya. Both bills have been criticized for being anti-people
          and anti-technology. The campaign is calling on Kenyans to reject the
          bills and demand better legislation that promotes innovation and
          economic growth. To learn more about finance Bill 2024 and how it
          affects you, visit this chatbot link
          <a
            href="https://chatgpt.com/g/g-JBq7D0E5x-finance-bill-gpt"
            target="_blank"
            className="text-red-900 bg-white px-9 "
          >
            Chat here
          </a>
        </p>
        < Analytics />
      </div>
    </div>
  );
}

export default App;
