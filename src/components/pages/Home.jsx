import BookCard from "../books/BookCard";
import book_store from "../books";
import MainLayout from "../../layout/MainLayout";

const Home = () => {

  return (
    <MainLayout>
   

      <section className="w-full bg-gray-100 mt-44 " >
        <div className="max-w-6xl grid py-16 lg:grid-cols-3 mx-4 grid-cols-1 gap-16 place-items-center lg:mx-auto ">
          {book_store?.map((book, idx) => {
            return (
              <BookCard
                key={idx}
                book_id={book.book_id}
                book_title={book.book_title}
                excerpt={book.execerpt}
                price={book.price}
                book_img={book.book_img}
              />
            );
          })}
        </div>
      </section>

      
    </MainLayout>
  );
};

export default Home;
