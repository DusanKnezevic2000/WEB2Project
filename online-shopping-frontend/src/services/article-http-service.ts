import axios from 'axios';
import ArticleDTO from '../DTO/ArticleDTO';

class ArticleHttpService {

    constructor(){}

    backendApi = 'http://localhost:5000/api/article'
    
    getAll() {
        return axios.get(this.backendApi)
    }

    editArticle(article: ArticleDTO) {
        return axios.put(this.backendApi + "/" + article.id, article)
    }

    deleteArticle(id: number) {
        return axios.delete(this.backendApi + "/" + id)
    }

}
    
const articleHttpService = new ArticleHttpService()
    
export default articleHttpService;