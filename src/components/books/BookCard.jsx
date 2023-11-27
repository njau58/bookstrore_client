/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const BookCard = ({ book_id, book_title, price, book_img, excerpt }) => {
  return (
    <div className="bg-white shadow-lg border rounded-lg py-6 px-3">
      <img className="object-center mx-auto h-44 w-44" src={book_img}></img>
      <div className="flex flex-col space-y-4 items-center  justify-center">
        <h1 className="font-bold mt-4 text-lg">{book_title}</h1>
        <p className="text-sm text-center">{excerpt}</p>
        <p className="font-bold">
          KES:<span>{price}</span>
        </p>
      </div>

      <Link to={`checkout/${book_id}`}
        className="w-full mt-4 text-white bg-green-600 hover:bg-green-700  focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center "
        type="submit"
      >
        Pay With Mpesa
      </Link>
    </div>
  );
};

export default BookCard;
