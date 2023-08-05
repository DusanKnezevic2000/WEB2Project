import { ChangeEvent, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Alert from "../Alert";
import UserDTO from "../../DTO/UserDTO";
import Swal from "sweetalert2";
import userService from "../../services/user-service";

const Profile = () => {
  const [editErrors, setEditErrors] = useState({
    name: false,
    username: false,
    address: false,
    password: false,
    dateOfBirth: false,
  });

  const [user, setUser] = useState<UserDTO>({
    id: 0,
    username: "",
    password: "",
    name: "",
    dateOfBirth: "",
    address: "",
    image: "",
    status: "",
  });

  useEffect(() => {
    console.log(localStorage.getItem("user")?.slice(6, 7));
    userService
      .getById(localStorage.getItem("user")?.slice(6, 7))
      .then((response) => {
        setUser({
          id: response.data.id,
          username: response.data.username,
          password: response.data.password,
          name: response.data.name,
          dateOfBirth: response.data.dateOfBirth.slice(0, 10),
          address: response.data.address,
          image: response.data.image,
          status: response.data.status,
        });
      });
  }, []);

  const handleSubmit = () => {
    if (validateEdit()) {
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Personal information is updated successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("BAD");
    }
  };

  const validateEdit = () => {
    let nameError = false;
    let usernameError = false;
    let passwordError = false;
    let dateError = false;
    let addressError = false;
    if (user.name.trim().length === 0) {
      nameError = true;
    }
    if (user.username.trim().length < 3) {
      usernameError = true;
    }
    if (user.password.trim().length < 6) {
      passwordError = true;
    }
    if (user.dateOfBirth.trim().length === 0) {
      dateError = true;
    }
    if (user.address.trim().length < 6) {
      addressError = true;
    }
    setEditErrors({
      name: nameError,
      username: usernameError,
      password: passwordError,
      dateOfBirth: dateError,
      address: addressError,
    });

    if (
      nameError ||
      usernameError ||
      passwordError ||
      dateError ||
      addressError
    ) {
      return false;
    }
    return true;
  };

  const handleFileChange = (event: ChangeEvent) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      if (event.target.result == "") {
        isImageInvalid = true;
      } else {
        isImageInvalid = false;
      }
      setImgFile(event.target.result);
    };
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-5">
            <div className="container">
              <br />
              <br />
              <h1>Profile</h1>
              <br />
              <FaUserAlt size="30%" color="#0D6EFD" />
            </div>
            <div className="mb-1">
              <br />
              {user.status === "Processing" && (
                <Alert status={user.status} color="alert-warning" />
              )}
              {user.status === "Rejected" && (
                <Alert status={user.status} color="alert-danger" />
              )}
              {user.status === "Approved" && (
                <Alert status={user.status} color="alert-success" />
              )}
            </div>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-5">
            <br />
            <br />
            <img
              src={user.image}
              className="rounded mx-auto d-block"
              alt="..."
              height="300"
              width="300"
            ></img>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-5">
            <div className="mb-1">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                value={user.username}
                onChange={(event) =>
                  setUser({ ...user, username: event.target.value })
                }
                id="username"
                type="text"
                className="form-control"
                placeholder="Username"
              />
              {editErrors.username && (
                <p className="text-danger">
                  Username must contain at least 3 characters
                </p>
              )}
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={user.password}
                onChange={(event) =>
                  setUser({ ...user, password: event.target.value })
                }
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              {editErrors.password && (
                <p className="text-danger">
                  Password must contain at least 6 characters
                </p>
              )}
            </div>
            <div className="mb-1">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                value={user.name}
                onChange={(event) =>
                  setUser({ ...user, name: event.target.value })
                }
                id="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
              {editErrors.name && (
                <p className="text-danger">Name is required</p>
              )}
            </div>
            <br />
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-5">
            <div className="mb-1">
              <label htmlFor="dateOfBirth" className="form-label">
                Birth Date
              </label>
              <input
                value={user.dateOfBirth}
                onChange={(event) =>
                  setUser({ ...user, dateOfBirth: event.target.value })
                }
                id="dateOfBirth"
                type="date"
                className="form-control"
              />
              {editErrors.dateOfBirth && (
                <p className="text-danger">Pick your birth date</p>
              )}
            </div>
            <div className="mb-1">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                value={user.address}
                onChange={(event) =>
                  setUser({ ...user, address: event.target.value })
                }
                id="address"
                type="text"
                className="form-control"
                placeholder="Address"
              />
              {editErrors.address && (
                <p className="text-danger">
                  Address must contain at least 6 characters
                </p>
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
            </div>
            <br />
          </div>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <button className="btn btn-lg btn-primary" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
