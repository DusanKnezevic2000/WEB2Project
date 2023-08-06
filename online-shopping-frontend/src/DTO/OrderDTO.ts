import ArticleDTO from "../DTO/ArticleDTO";
import UserDTO from "./UserDTO";

interface OrderDTO {
    id: number;
    customer: UserDTO;
    articles: ArticleDTO[],
    startTime: string;
    endTime: string;
    comment: string;
    address: string;
    price: number;
    status: string;

}

export default OrderDTO;