import { ChangeEvent, useState } from "react";
import { RiFileUserFill } from "react-icons/ri";
import User from "../model/User";
import validator from "validator";
import userService from "../services/user-service";

const RegistrationForm = () => {
  const [registerErrors, setRegisterErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    dateOfBirth: false,
    address: false,
    role: false,
    image: false,
  });

  const handleFileChange = (event: ChangeEvent) => {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        setRegisterInfo({ ...registerInfo, image: event.target.result });
      };
    } catch {
      setRegisterInfo({ ...registerInfo, image: "" });
    }
  };

  const [registerInfo, setRegisterInfo] = useState<User>({
    id: 0,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    dateOfBirth: "",
    address: "",
    role: "",
    image: "",
  });

  const validateRegister = () => {
    let usernameError = false;
    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;
    let nameError = false;
    let dateOfBirthError = false;
    let addressError = false;
    let roleError = false;
    let imageError = false;
    if (registerInfo.username.length < 3) {
      usernameError = true;
    }
    if (!validator.isEmail(registerInfo.email)) {
      emailError = true;
    }
    if (registerInfo.password.length < 6) {
      passwordError = true;
    }
    if (registerInfo.confirmPassword !== registerInfo.password) {
      confirmPasswordError = true;
    }
    if (registerInfo.name.length === 0) {
      nameError = true;
    }
    if (registerInfo.dateOfBirth.length < 10) {
      dateOfBirthError = true;
    }
    if (registerInfo.address.length < 6) {
      addressError = true;
    }
    if (registerInfo.role.length === 0) {
      roleError = true;
    }
    if (registerInfo.image.length === 0) {
      imageError = true;
    }
    setRegisterErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      name: nameError,
      dateOfBirth: dateOfBirthError,
      address: addressError,
      role: roleError,
      image: imageError,
    });

    if (
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      nameError ||
      dateOfBirthError ||
      addressError ||
      roleError ||
      imageError
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateRegister()) {
      console.log("OK");
      console.log(registerInfo);
      userService
        .create(registerInfo)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error.response.data));
    } else {
      console.log("NOT OK");
    }
  };

  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-md-center">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="container">
              <br />
              <h1>Register</h1>
              <br />

              <RiFileUserFill size="20%" color="#0D6EFD" />
            </div>
            <div className="row">
              <div className="col-sm-5">
                <div className="mb-1">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    value={registerInfo.username}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        username: event.target.value.trim(),
                      });
                    }}
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Username"
                  />
                  {registerErrors.username && (
                    <p className="text-danger">
                      Username must contain at least 3 characters
                    </p>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    value={registerInfo.email}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        email: event.target.value.trim(),
                      });
                    }}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                  />
                  {registerErrors.email && (
                    <p className="text-danger">E-mail is not valid</p>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    value={registerInfo.password}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        password: event.target.value.trim(),
                      });
                    }}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  {registerErrors.password && (
                    <p className="text-danger">
                      Password must contain at least 6 characters
                    </p>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    value={registerInfo.confirmPassword}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        confirmPassword: event.target.value.trim(),
                      });
                    }}
                    id="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  {registerErrors.confirmPassword && (
                    <p className="text-danger">Passwords don't match</p>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    value={registerInfo.name}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        name: event.target.value.trim(),
                      });
                    }}
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                  {registerErrors.name && (
                    <p className="text-danger">Name is required</p>
                  )}
                </div>
              </div>
              <div className="col-sm-2"></div>
              <div className="col-sm-5">
                <div className="mb-1">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Birth Date
                  </label>
                  <input
                    value={registerInfo.dateOfBirth}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        dateOfBirth: event.target.value.trim(),
                      });
                    }}
                    id="dateOfBirth"
                    type="date"
                    className="form-control"
                  />
                  {registerErrors.dateOfBirth && (
                    <p className="text-danger">Date of birth is required</p>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    value={registerInfo.address}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        address: event.target.value.trim(),
                      });
                    }}
                    id="address"
                    type="text"
                    className="form-control"
                    placeholder="Address"
                  />
                  {registerErrors.address && (
                    <p className="text-danger">
                      Address must contain at least 6 characters
                    </p>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <select
                    value={registerInfo.role}
                    onChange={(event) => {
                      setRegisterInfo({
                        ...registerInfo,
                        role: event.target.value.trim(),
                      });
                    }}
                    className="form-select form-select mb-1"
                    aria-label=".form-select example"
                  >
                    <option value="">Open this select menu</option>
                    <option value="admin">Administrator</option>
                    <option value="salesman">Salesman</option>
                    <option value="customer">Customer</option>
                  </select>
                  {registerErrors.role && (
                    <p className="text-danger">Pick a user role</p>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="file" className="form-label">
                    Profile Photo
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handleFileChange}
                  />
                  {registerErrors.image && (
                    <p className="text-danger">Upload your profile photo</p>
                  )}
                </div>
                <br />
                <div className="mb-1">
                  <button
                    className="btn btn-lg btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
