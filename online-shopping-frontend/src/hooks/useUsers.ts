import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import userService, { User } from "../services/user-service";

const useUsers = () => {

const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState("");
const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        if (error instanceof CanceledError) return () => cancel;
      });
  }, []);

  return {users, error, isLoading, setUsers, setError}
}

export default useUsers;