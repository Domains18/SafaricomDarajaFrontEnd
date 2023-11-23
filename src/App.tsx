import React, { useState } from "react";

function App() {
  const [amount, setAmount] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", phoneNumber, amount);
  };

  return (
    <div className="App bg-slate-700 h-screen text-white w-full">
      <header className="App-header">
        <p className="text-center pt-9">Please Enter your Details Below</p>
      </header>
      <div className="flex items-center justify-center">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
            type="number"
            placeholder="Enter your Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <button
            className={`border-2 border-gray-500 rounded-md p-2 m-2 bg-green-600 
            hover:bg-green-700 ${!phoneNumber || !amount ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={!phoneNumber || !amount}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
