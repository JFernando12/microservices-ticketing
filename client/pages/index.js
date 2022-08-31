import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? <h1>User is log in</h1> : <h1>User not is log in</h1>;
};

export default LandingPage;

LandingPage.getInitialProps = async (context) => {
  console.log('Landing Page...');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};
