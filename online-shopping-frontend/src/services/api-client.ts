import axios, { CanceledError} from 'axios';

export default axios.create({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})

export { CanceledError }