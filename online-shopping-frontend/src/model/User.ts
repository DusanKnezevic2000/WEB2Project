interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    dateOfBirth: string;
    address: string;
    role: string;
    image: File
}

export default User;