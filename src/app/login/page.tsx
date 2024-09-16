import { Suspense } from "react";
import Signin from "@/components/Signin";

const LoginPage = async () => {
  return (
    <Suspense>
      {" "}
      <Signin />{" "}
    </Suspense>
  );
};

export default LoginPage;
