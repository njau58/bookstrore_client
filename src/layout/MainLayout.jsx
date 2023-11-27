/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className=" relative w-screen  flex items-center justify-center top-0 py-24  bg-hero bg-center bg-cover bg-no-repeat  ">
        <div className="absolute z-20  mx-4 flex flex-col items-center justify-center space-y-24">
          <h1 className="text-white font-bold text-3xl lg:text-4xl text-center ">
            Get The Best Selling Book Today
          </h1>
          <h2 className="absolute z-20 text-center text-white text-lg  font-extralight">
            Get book in your phone with just a click of a button.
          </h2>
        </div>

        <div className="absolute inset-0 w-full h-full z-10 bg-black bg-opacity-70"></div>
      </div>
      <div>{children}</div>
      <footer className="relative bottom-0 mx-auto py-24 ">
        <hr></hr>

        <p className="mx-auto text-center mt-12 text-sm font-bold ">
          @soma-kitabu
        </p>
      </footer>
    </>
  );
};

MainLayout.PropTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
