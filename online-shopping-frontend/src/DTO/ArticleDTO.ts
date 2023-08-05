interface ArticleDTO {
    id: number;
    salesmanId: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: File;
  }

export default ArticleDTO;