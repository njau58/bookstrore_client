import { Formik, Form, Field, ErrorMessage } from "formik";
import MainLayout from "../../layout/MainLayout";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import PropTypes from "prop-types";
import Loader from "../Loader";
import { GiPadlock } from "react-icons/gi";

const CheckOutForm = ({
  book_details,
  bookId,
  sendMessage,
  validationSchema,
  loading,
  error,
  setError,
  errorMessage,
  successMessage,
  setSuccessMessage,
}) => {
  return (
    <MainLayout>
      <div className="flex flex-col max-w-xl lg:mx-auto mx-4  px-4 pb-6 pt-2 mt-44">
        <div className="flex justify-start items-start  ">
          <Link
            className="px-6 py-2.5 bg-gray-100 rounded-lg  hover:bg-gray-200 "
            to="/"
          >
            <span className="inline-block">
              <MdArrowBackIos />
            </span>
            Back
          </Link>
        </div>

        <div className="mx-auto mt-4">
          <img
            className="w-16 h-16 mt-2 mb-4"
            src={`${book_details[0]?.book_img}`}
          ></img>
        </div>


        {error && (
              <div
                id="alert-2"
                className="flex items-center justify-between p-4 mb-4 text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium text-center">{errorMessage}</div>
                <button
                  onClick={() => setError(false)}
                  type="button"
                  className="ml-4 -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-5 w-5 "
                  data-dismiss-target="#alert-2"
                  aria-label="Close"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}

            {successMessage && (
              <div
                id="alert-2"
                className="flex items-center justify-between p-4 mb-4  text-green-800 rounded-lg bg-green-50 "
                role="alert"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium text-center">
                  Successful. We have sent the book to your email(or spam folder).
                </div>

                <button
                  onClick={() => setSuccessMessage(false)}
                  type="button"
                  className="ml-4 -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-5 w-5"
                  data-dismiss-target="#alert-2"
                  aria-label="Close"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}




        {loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{
              phoneNumber: "",
              emailAddress: "",
              amount: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const requestData = {
                ...values,
                amount: book_details[0]?.price,
                bookId: bookId,
              };

              console.log(requestData);

              sendMessage(requestData);
              //   setTimeout(resetForm, 6000);
            }}
          >
           

            {() => (
              <Form>
                <div className="flex flex-col ">
                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className=" text-start flex items-start mb-2 text-sm font-medium text-primary-text-color "
                    >
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="emailAddress"
                      className="bg-white border rounded-md border-gray-300 text-primary-text-color text-sm block w-full p-2.5 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none"
                      placeholder=" Enter email eg. example@gmail.com"
                    />
                    <div className="flex items-start ">
                      <ErrorMessage
                        name="emailAddress"
                        component="div"
                        className="text-red-500 text-xs py-2 "
                      />
                    </div>
                    <p className="flex items-start text-xs text-gray-500 ">
                      This is the email to recieve the book.
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="phonepNumber"
                      className=" text-start flex items-start mb-2 text-sm font-medium text-primary-text-color "
                    >
                      Phone (Mpesa Number)
                    </label>
                    <Field
                      type="tel"
                      name="phoneNumber"
                      className="bg-white rounded-md border border-gray-300 text-primary-text-color text-sm block w-full p-2.5 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none"
                      placeholder=" Enter Number eg. 0706..."
                    />
                    <div className="flex items-start ">
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-xs py-2 "
                      />
                    </div>
                    <p className="flex items-start text-xs text-gray-500 ">
                      Please ensure you have your phone near you. You will
                      receive a prompt on the number above this payment. Enter
                      your M-Pesa PIN to authorize the payment.
                    </p>
                  </div>
                </div>

                <button
                  className="w-full text-white bg-green-600  focus:outline-none font-medium rounded-md text-sm px-5 py-4 text-center "
                  type="submit"
                >
                  Pay With Mpesa KES {book_details[0]?.price}
                </button>
              </Form>
            )}
          </Formik>
        )}

        <div className="w-full flex items-center justify-center gap-2 mt-6 font-semibold text-sm text-black"><span className="text-2xl"><GiPadlock/></span>Powered by SoftleafApplications</div>
      </div>

    </MainLayout>
  );
};

CheckOutForm.propTypes = {
  book_details: PropTypes.array,
  bookId: PropTypes.string,
  sendMessage: PropTypes.func,
  validationSchema: PropTypes.func,
  loading: PropTypes.boolean,
  error: PropTypes.boolean,
  errorMessage: PropTypes.string,
  setError: PropTypes.func,
  setSuccessMessage: PropTypes.func,
  successMessage: PropTypes.boolean,
};

export default CheckOutForm;
