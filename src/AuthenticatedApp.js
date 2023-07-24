import React from 'react';
import { Auth } from 'aws-amplify';

function AuthenticatedApp({ signOut, user }) {
    const handleSignOut = async () => {
      try {
        await Auth.signOut();
        signOut();
      } catch (error) {
        console.log('Error signing out: ', error);
      }
    };
  
    return (
      <div>
        <h1>Hello {user.username}</h1>
        <button onClick={handleSignOut}>Sign out</button>
        {/* Add any other content for authenticated users here */}
      </div>
    );
  }

export default AuthenticatedApp;

  