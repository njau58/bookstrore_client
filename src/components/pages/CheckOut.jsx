import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import book_store from "../books";
import { useReducer, useEffect } from "react";

import CheckOutForm from "../CheckOutForm";

const CheckOut = () => {
  const { bookId } = useParams();

  const navigate = useNavigate();

  const primaryReducer = (state, action) => {
    switch (action.type) {
      case "SET_BOOK_DETAILS": {
        return {
          ...state,
          book_details: action.payload,
        };
      }

      case "SET_ERROR": {
        return {
          ...state,
          error: action.payload,
        };
      }
      case "SET_LOADING": {
        return {
          ...state,
          loading: action.payload,
        };
      }
      case "SET_ERROR_MESSAGE": {
        return {
          ...state,
          errorMessage: action.payload,
        };
      }
      case "SET_SUCCESS": {
        return {
          ...state,
          success: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const initialState = {
    error: false,
    success: false,
    loading: false,
    book_details: [],
    errorMessage: "",
  };

  const [state, dispatch] = useReducer(primaryReducer, initialState);

  useEffect(() => {
    const book_info = book_store?.filter((book) => book.book_id === bookId);

    if (book_info?.length < 1) {
      navigate("/");
    }

    dispatch({ type: "SET_BOOK_DETAILS", payload: book_info });
  }, [bookId, navigate]);




  const setError = () =>{
    dispatch({ type: "SET_ERROR", payload: false });

  }
  const setSuccess = () =>{
    dispatch({ type: "SET_SUCCESS", payload: false });

  }

  const stkQuery = async (payload, CheckoutRequestID) => {
    let reqeustCount = 0;
    const timer = setInterval(async () => {
      reqeustCount += 1;
      if (reqeustCount === 15) {
        clearInterval(timer);
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "You took too long to pay",
        });
        dispatch({ type: "SET_LOADING", payload: "false" });
      }

      await axios
        .post(
          `https://bookstore-server-two.vercel.app/api/query/${CheckoutRequestID}`
        )
        .then(async (response) => {
          if (response.data.ResultCode === "0") {
            //make api
            clearInterval(timer);

            await axios
              .post(
                "https://bookstore-server-two.vercel.app/api/sendMedia",
                payload
              )
              .then((res) => {
                if (res) {
                  clearInterval(timer);
                  dispatch({ type: "SET_LOADING", payload: false });
                  dispatch({ type: "SET_ERROR", payload: false });
                  dispatch({
                    type: "SET_SUCCESS",
                    payload: true
                  });

                  return;
                }
              })
              .catch((error) => {
                dispatch({ type: "SET_ERROR", payload: true });
                dispatch({ type: "SET_ERROR_MESSAGE", payload: error.message });
                dispatch({ type: "SET_LOADING", payload: false });

                clearInterval(timer);
              });

            return;
          } else if (response.errorCode === "500.001.1001") {
            dispatch({ type: "SET_ERROR", payload: true });
            dispatch({
              type: "SET_ERROR_MESSAGE",
              payload: response.errorMessage,
            });
            dispatch({ type: "SET_LOADING", payload: false });

            clearInterval(timer);
          } else {
            dispatch({ type: "SET_ERROR", payload: true });
            dispatch({
              type: "SET_ERROR_MESSAGE",
              payload: response.data.ResultDesc,
            });
            dispatch({ type: "SET_LOADING", payload: false });

            clearInterval(timer);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  };

  const sendMessage = async (payload) => {
    dispatch({ type: "SET_LOADING", payload: true });
    await axios
      .post("https://bookstore-server-two.vercel.app/api/push", payload)
      .then(({ data }) => {
        console.log(data);
        stkQuery(payload, data.CheckoutRequestID);
      })
      .catch((error) => {
        console.log("THIS IS", error);

        dispatch({ type: "SET_ERROR", payload: true });
        dispatch({ type: "SET_ERROR_MESSAGE", payload: error.message });
        dispatch({ type: "SET_LOADING", payload: false });
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
    <>
      <CheckOutForm
        sendMessage={sendMessage}
        validationSchema={validationSchema}
        book_details={state.book_details}
        bookId={bookId}
        loading={state.loading}
        error={state.error}
        errorMessage={state.errorMessage}
        success={state.success}
        toggleError={setError}
        toggleSuccess={setSuccess}
      />
    </>
  );
};

export default CheckOut;
