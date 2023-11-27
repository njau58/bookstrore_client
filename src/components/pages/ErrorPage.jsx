import { Link, useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const error = useRouteError();

  return (

   
 <div id="error-page" className="  mx-auto my-auto h-screen  w-screen flex items-center justify-center flex-col space-y-4">
   
      <p>Sorry, an unexpected error has occurred.</p>
      <h1 className="text-lg font-bold">
        {error.statusText || error.message}
      </h1>
     <Link className=" text-white bg-blue-600 text-sm rounded-lg px-6 py-2.5" to="/">Go Back Home</Link>
     
    </div>
   
   
  );
}