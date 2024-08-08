import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="lg:w-full">
        <Auth type="Login" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
