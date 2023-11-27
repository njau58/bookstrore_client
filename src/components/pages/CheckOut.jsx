import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import book_store from "../books";
import { useState, useEffect } from "react";

import CheckOutForm from "../CheckOutForm";

const CheckOut = () => {
  const { bookId } = useParams();
  const [book_details, setBookDetails] = useState([]);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const book_info = book_store?.filter((book) => book.book_id === bookId);

    if (book_info?.length < 1) {
      navigate("/");
    }
    setBookDetails(book_info);
  }, [bookId, navigate]);

  const stkQuery = async (payload, CheckoutRequestID) => {
    let reqeustCount = 0;
    const timer = setInterval(async() => {
      reqeustCount += 1;
      if (reqeustCount === 15) {
        clearInterval(timer);
        setErrorMessage("You took too long to pay");
        setLoading(false);
      }

    await  axios
        .post(`https://bookstore-server-two.vercel.app/api/query/${CheckoutRequestID}`)
        .then(async (response) => {
          if (response.data.ResultCode === "0") {
            //make api
            clearInterval(timer);

            await axios
              .post("https://bookstore-server-two.vercel.app/api/sendMedia", payload)
              .then((res) => {
                if (res) {
                  clearInterval(timer);
                  setLoading(false);
                  setError(false);
                  setSuccessMessage(
                    `Successful. We've sent book to your email.`
                  );
                  return;
                }
              })
              .catch((error) => {
                setError(true);
                setErrorMessage(error.message);
                setLoading(false);
                clearInterval(timer);
              });

            return;
          } else if (response.errorCode === "500.001.1001") {
            setError(true);
            setErrorMessage(response.errorMessage);
            setLoading(false);
            clearInterval(timer);
          } else {
            setError(true);
            setErrorMessage(response.data.ResultDesc);
            setLoading(false);
            clearInterval(timer);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  };

  const sendMessage = async (payload) => {
    setLoading(true);
   await axios
      .post("https://bookstore-server-two.vercel.app/api/push", payload)
      .then(({ data }) => {

        console.log(data)
        stkQuery(payload, data.CheckoutRequestID);
      })
      .catch((error) => {
        // console.log('THIS IS', error)
        setError(true);
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^(\+254|0)(2\d{7}|7\d{8}|1\d{6})$/, "Invalid phone number")
      .required("Field is required"),
    emailAddress: Yup.string()
      .matches(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "Invalid email address"
      )
      .required("Field is required"),
  });

  return (
    <CheckOutForm
      sendMessage={sendMessage}
      validationSchema={validationSchema}
      book_details={book_details}
      bookId={bookId}
      loading={loading}
      error={error}
      errorMessage={errorMessage}
      successMessage={successMessage}
      setError={setError}
      setSuccessMessage={setSuccessMessage}
    />
  );
};

export default CheckOut;
