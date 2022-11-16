const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? <h1>User is log in</h1> : <h1>User not is log in</h1>;
};

export default LandingPage;

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};
