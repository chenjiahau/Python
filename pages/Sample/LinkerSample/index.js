import LinkerWithA from "components/LinkerWithA";
import LinkerWithRoute from "components/LinkerWithRoute";

const LinkerSample = () => {
  return (
    <div className="mb-5">
      <h3>Linker ( router ) </h3>
      <LinkerWithRoute
        label="Forgot password"
        to="/forgot_password"
        className="linker-blue text-decoration-none mt-1"
        onClick={() => {}}
      />

      <h3>Linker ( a href )</h3>
      <LinkerWithA
        label="Link to Google"
        href="https://google.com"
        className="linker-blue text-decoration-none mt-1"
        onClick={() => {}}
      />
    </div>
  )
};

export default LinkerSample;
