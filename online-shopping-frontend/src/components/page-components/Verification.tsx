import axios from "axios";
import React, { useEffect, useState } from "react";
import articleHttpService from "../../services/article-http-service";
import Alert from "../Alert";

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
  let [verificationRequests, setVerificationRequests] = useState([
    {
      id: 1,
      name: "name1",
      username: "username1",
      email: "email1",
      dateOfBirth: "2000-10-10",
      address: "address1",
      role: "Salesman",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      status: "Approved",
    },
    {
      id: 2,
      name: "name2",
      username: "username2",
      email: "email2",
      dateOfBirth: "2000-10-10",
      address: "address2",
      role: "Salesman",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      status: "Rejected",
    },
    {
      id: 3,
      name: "name3",
      username: "username3",
      email: "email3",
      dateOfBirth: "2000-10-10",
      address: "address3",
      role: "Salesman",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      status: "Processing",
    },
    {
      id: 4,
      name: "name4",
      username: "username4",
      email: "email4",
      dateOfBirth: "2000-10-10",
      address: "address4",
      role: "Salesman",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      status: "Rejected",
    },
    {
      id: 5,
      name: "name5",
      username: "username5",
      email: "email5",
      dateOfBirth: "2000-10-10",
      address: "address5",
      role: "Salesman",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      status: "Approved",
    },
    {
      id: 6,
      name: "name6",
      username: "username6",
      email: "email6",
      dateOfBirth: "2000-10-10",
      address: "address6",
      role: "Salesman",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      status: "Processing",
    },
  ]);

  let [allVerificationRequests, setAllVerificationRequests] = useState([
    ...verificationRequests,
  ]);

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
      [...allVerificationRequests].filter((vr) => vr.status === "Rejected")
    );
  };

  const filterAll = () => {
    setTab("all");
    setVerificationRequests(allVerificationRequests);
  };

  const approve = (id: number) => {
    let newState = allVerificationRequests.map((req) => {
      if (req.id === id) {
        return { ...req, status: "Approved" };
      }
      return req;
    });
    console.log(tab);
    setAllVerificationRequests([...newState]);
    if (tab === "all") {
      setVerificationRequests([...newState]);
    } else {
      console.log("USAO");
      setVerificationRequests(
        [...newState].filter((vr) => vr.status === "Processing")
      );
    }

    console.log("Approved " + id);
  };

  const reject = (id: number) => {
    const newState = allVerificationRequests.map((req) => {
      if (req.id === id) {
        return { ...req, status: "Rejected" };
      }
      return req;
    });
    console.log(tab);
    setAllVerificationRequests([...newState]);
    if (tab === "all") {
      setVerificationRequests([...newState]);
    } else {
      setVerificationRequests(
        [...newState].filter((vr) => vr.status === "Processing")
      );
    }

    console.log("Rejected " + id);
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
              <th>User Type</th>
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
                <td>{verificationRequest.dateOfBirth}</td>
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
                  {verificationRequest.status === "Rejected" && (
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
