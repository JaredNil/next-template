import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../routes/routes";

export function ErrorBoundary() {

  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(()=> {
    const timer = setTimeout(()=>{
      setShouldRedirect(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (shouldRedirect) {
    return <Navigate to={ROUTES.BOARDS} replace />;
  }

  // if (isRouteErrorResponse(error)) {
  //   return (
  //     <>
  //       <h1>
  //         {error.status} {error.statusText}
  //       </h1>
  //       <p>{error.data}</p>
  //     </>
  //   );
  // } else if (error instanceof Error) {
  //   return (
  //     <div>
  //       <h1>Error</h1>
  //       <p>{error.message}</p>
  //       <p>The stack trace is:</p>
  //       <pre>{error.stack}</pre>
  //     </div>
  //   );
  // } else {
    return (
      <>
        <h1>Unknown Error</h1>
      </>
    );
}
