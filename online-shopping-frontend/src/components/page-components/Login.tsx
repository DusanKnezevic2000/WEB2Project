import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLoginBoxFill } from "react-icons/ri";
import authService from "../../services/authentication-service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import authGuardService from "../../services/auth-guard-service";
import { useEffect } from "react";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

const schema = z.object({
  email: z.string().email({ message: "E-mail is not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authGuardService.isUserLoggedIn()) navigate("/profile");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    authService
      .login(data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("status", response.data.status);
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const responseFacebook = (response: any) => {
    console.log(response);
  };

  const componentClicked = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container text-center">
          <br />
          <br />
          <h1>Log In</h1>
          <br />
          <RiLoginBoxFill size="25%" color="#0D6EFD" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <div className="mb-3 text-center">
                <label htmlFor="email" className="form-label">
                  <h3>E-mail</h3>
                </label>
                <input
                  {...register("email")}
                  id="email"
                  placeholder="E-mail"
                  type="email"
                  className="form-control"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-3 text-center">
                <label htmlFor="password" className="form-label">
                  <h3>Password</h3>
                </label>
                <input
                  {...register("password")}
                  id="password"
                  placeholder="Password"
                  type="password"
                  className="form-control"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Log In
                </button>
              </div>
            </div>
            <div className="col sm-3"></div>
          </div>
        </div>
      </form>
      <br /> <br />
      <div className="container-fluid text-center">
        <LoginSocialGoogle
          client_id="238674901787-7mdhlbfsbsmj0ce6e8b40010n10224m3.apps.googleusercontent.com"
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log(provider, data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
      </div>
    </>
  );
};

export default Login;
