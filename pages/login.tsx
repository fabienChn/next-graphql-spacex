import react from 'react';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

export default function Login(): JSX.Element {
  const githubAuth = new GithubAuthProvider();

  const handleLoginClick = async () => {
    await signInWithPopup(auth, githubAuth);
  };

  return (
    <div 
      className="flex flex-col items-center justify-center"
    >
      <h1 className="title">Login</h1>

      <button className="btn" onClick={handleLoginClick}>
        Login with Github
      </button>
    </div>
  )
}