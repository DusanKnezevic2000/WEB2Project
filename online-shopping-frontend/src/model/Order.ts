import ArticleDTO from "../DTO/ArticleDTO";

interface Order {
    customerId: number;
    articles: ArticleDTO[],
    comment: string;
    address: string;
    price: number;
}

export default Order;