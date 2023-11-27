import { HashLoader } from "react-spinners";

const Loader= () => {
  return (
    <div className=" flex flex-col my-12 items-center justify-center space-y-4">
      <HashLoader color="#22c55e" />

      <p className="font-bold text-lg">Processing payment</p>
      <p className="max-w-xl mx-4 text-center text-sm text-secondary-text">
        Your payment is being processed. Kindly wait for the prompt on
        your phone to authorize the payment.
      </p>
    </div>
  );
};

export default Loader;
