import { useState } from "react";
import ArticleDTO from "../DTO/ArticleDTO";

interface Props {
  articles: ArticleDTO[];
  articleButtons: "none" | "edit-delete" | "shopping";
  editArticle?: (id: number) => void;
  deleteArticle?: (id: number) => void;
  addToCart?: (id: number, amount: number) => void;
}

const Articles = ({
  articles,
  articleButtons,
  editArticle,
  deleteArticle,
  addToCart,
}: Props) => {
  return (
    <>
      <br />
      <br />
      <div className="container text-center">
        <div className="row row-cols- row-cols-md-4 g-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="col-md-3"
              style={{ marginBottom: "3%" }}
            >
              <div className="card text-white bg-primary">
                <img
                  src={article.image}
                  style={{ aspectRatio: "4/3" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{article.name}</h5>
                  <p className="card-text">{article.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-white bg-primary">
                    Quantity: {article.quantity}
                  </li>
                  <li className="list-group-item text-white bg-primary">
                    Price: ${article.price}{" "}
                  </li>
                </ul>
                {articleButtons === "edit-delete" && (
                  <div className="card-body">
                    <button
                      className="btn btn-light"
                      onClick={() => editArticle?.(article.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "15%" }}
                      onClick={() => deleteArticle?.(article.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {articleButtons === "shopping" && (
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <input
                          id={article.id + "amount"}
                          type="number"
                          className="form-control w-100"
                          placeholder="Quantity"
                          min="1"
                          max={article.quantity}
                        />
                      </div>
                      <div className="col-sm-6">
                        <button
                          className="btn btn-light"
                          onClick={() =>
                            addToCart?.(
                              article.id,
                              parseInt(
                                document.getElementById(article.id + "amount")!
                                  .value
                              )
                            )
                          }
                          style={{ marginLeft: "10%" }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Articles;
