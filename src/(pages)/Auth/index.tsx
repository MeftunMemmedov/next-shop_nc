import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = ({ type }: { type: 'signin' | 'signup' }) => {
  if (type === 'signin') return <SignIn />;

  if (type === 'signup') return <SignUp />;
};

export default Auth;
