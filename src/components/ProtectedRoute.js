import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function ProtectedRoute({ component: Component, ...rest }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;