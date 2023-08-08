import { CanceledError } from "../../services/api-client";
import { useEffect, useState } from "react";
import verificationService from "../../services/verification-service";
import Alert from "../Alert";
import Swal from "sweetalert2";
import authGuardService from "../../services/auth-guard-service";
import { useNavigate } from "react-router-dom";

interface VerificationRequest {
  id: number;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  address: string;
  role: string;
  image: string;
  status: string;
}

const Verification = () => {
  let [verificationRequests, setVerificationRequests] = useState([]);

  let [allVerificationRequests, setAllVerificationRequests] = useState([
    ...verificationRequests,
  ]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!authGuardService.isUserLoggedIn()) navigate("/login");
    if (!authGuardService.isAdmin()) navigate("/profile");
    const { request, cancel } = verificationService.getAll();
    request
      .then((response) => {
        setVerificationRequests(response.data);
        setAllVerificationRequests(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return () => cancel;
      });
  }, []);

  let [tab, setTab] = useState("all");

  const filterApproved = () => {
    setVerificationRequests(
      [...allVerificationRequests].filter((vr) => vr.status === "Approved")
    );
  };

  const filterPending = () => {
    setTab("pending");
    setVerificationRequests(
      [...allVerificationRequests].filter((vr) => vr.status === "Processing")
    );
  };

  const filterRejected = () => {
    setVerificationRequests(
      [...allVerificationRequests].filter((vr) => vr.status === "Denied")
    );
  };

  const filterAll = () => {
    setTab("all");
    setVerificationRequests(allVerificationRequests);
  };

  const approve = (id: number) => {
    verificationService
      .approve(id)
      .then((response) => {
        if (response.data) {
          let newState = allVerificationRequests.map((req) => {
            if (req.id === id) {
              return { ...req, status: "Approved" };
            }
            return req;
          });
          Swal.fire({
            icon: "success",
            title: "User approved successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          setAllVerificationRequests([...newState]);
          if (tab === "all") {
            setVerificationRequests([...newState]);
          } else {
            setVerificationRequests(
              [...newState].filter((vr) => vr.status === "Processing")
            );
          }
        }
      })
      .catch((error) => console.log(error.response.data));
  };

  const reject = (id: number) => {
    verificationService
      .reject(id)
      .then((response) => {
        if (response.data) {
          const newState = allVerificationRequests.map((req) => {
            if (req.id === id) {
              return { ...req, status: "Denied" };
            }
            return req;
          });
          setAllVerificationRequests([...newState]);
          Swal.fire({
            icon: "success",
            title: "User rejected successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          if (tab === "all") {
            setVerificationRequests([...newState]);
          } else {
            setVerificationRequests(
              [...newState].filter((vr) => vr.status === "Processing")
            );
          }
        }
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container text-center">
          <br />
          <br />
          <div className="row">
            <div className="col-sm-4">
              <h1>Verification</h1>
            </div>
            <div className="col-sm-2">
              <button
                type="button"
                onClick={filterAll}
                className="btn btn-primary"
              >
                All Requests
              </button>
            </div>
            <div className="col-sm-2">
              <button
                type="button"
                onClick={filterPending}
                className="btn btn-warning"
              >
                Pending Requests
              </button>
            </div>
            <div className="col-sm-2">
              <button
                type="button"
                onClick={filterApproved}
                className="btn btn-success"
              >
                Approved Requests
              </button>
            </div>
            <div className="col-sm-2">
              <button
                type="button"
                onClick={filterRejected}
                className="btn btn-danger"
              >
                Rejected Requests
              </button>
            </div>
          </div>
          <br />
        </div>
        <table
          style={{ marginTop: "1%" }}
          className="table text-center align-middle table-hover table-bordered border-primary table-light table-striped"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>E-mail</th>
              <th>Birth Date</th>
              <th>Address</th>
              <th>Role</th>
              <th>Photo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {verificationRequests.map((verificationRequest) => (
              <tr key={verificationRequest.id}>
                <td>{verificationRequest.name}</td>
                <td>{verificationRequest.username}</td>
                <td>{verificationRequest.email}</td>
                <td>{verificationRequest.dateOfBirth.slice(0, 10)}</td>
                <td>{verificationRequest.address}</td>
                <td>{verificationRequest.role}</td>
                <td>
                  <img
                    src={verificationRequest.image}
                    className="rounded mx-auto d-block"
                    alt="..."
                    height="200"
                    width="200"
                  ></img>
                </td>
                <td style={{ width: "15%" }}>
                  {verificationRequest.status === "Processing" && (
                    <>
                      <button
                        onClick={() => approve(verificationRequest.id)}
                        className="btn btn-success"
                      >
                        Approve
                      </button>
                      <button
                        style={{ marginLeft: "10%" }}
                        onClick={() => reject(verificationRequest.id)}
                        className="btn btn-danger"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {verificationRequest.status === "Approved" && (
                    <>
                      <Alert status="Approved" color="alert-success" />
                    </>
                  )}
                  {verificationRequest.status === "Denied" && (
                    <>
                      <Alert status="Rejected" color="alert-danger" />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Verification;
