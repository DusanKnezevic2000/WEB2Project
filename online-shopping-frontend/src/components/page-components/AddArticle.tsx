import { ChangeEvent, useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import Articles from "../Articles";
import ArticleDTO from "../../DTO/ArticleDTO";
import articleService from "../../services/article-service";
import { CanceledError } from "axios";

const AddArticle = () => {
  let [articles, setArticles] = useState<ArticleDTO[]>([]);

  const [editArticleInfo, setEditArticleInfo] = useState<ArticleDTO>({
    id: 0,
    quantity: 0,
    description: "",
    image: "",
    name: "",
    price: 1,
  });

  const [addArticleInfo, setAddArticleInfo] = useState<ArticleDTO>({
    id: 0,
    quantity: 0,
    description: "",
    image: "",
    name: "",
    price: 1,
  });

  const [editErrors, setEditErrors] = useState({
    name: false,
    price: false,
    description: false,
    quantity: false,
    image: false,
  });

  const [addErrors, setAddErrors] = useState({
    name: false,
    price: false,
    description: false,
    quantity: false,
    image: false,
  });

  useEffect(() => {
    const { request, cancel } = articleService.getAll<ArticleDTO>();
    request
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return () => cancel;
      });
  }, []);

  const editArticle = (id: number) => {
    const article = articles.find((a) => {
      return a.id === id;
    });
    setEditArticleInfo({
      id: article?.id,
      price: article?.price,
      name: article?.name,
      quantity: article?.quantity,
      description: article?.description,
      image: article?.image,
    });
    document.getElementById("edit")?.click();
  };

  const deleteArticle = (id: number) => {
    articleService
      .delete(id)
      .then((response) => {
        console.log(response.data);
        if (response.data === true)
          setArticles(articles.filter((a) => a.id !== id));
        else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (event: ChangeEvent) => {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        setAddArticleInfo({ ...addArticleInfo, image: event.target.result });
      };
    } catch {
      setAddArticleInfo({ ...addArticleInfo, image: "" });
    }
  };

  const handleEditFileChange = (event: ChangeEvent) => {
    var reader = new FileReader();
    try {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        setEditArticleInfo({ ...editArticleInfo, image: event.target.result });
      };
    } catch {
      setEditArticleInfo({ ...editArticleInfo, image: "" });
    }
  };

  const validateAdd = () => {
    let nameError = false;
    let descriptionError = false;
    let priceError = false;
    let quantityError = false;
    let imageError = false;
    if (addArticleInfo.name.length === 0) {
      nameError = true;
    }
    if (addArticleInfo.description.length === 0) {
      descriptionError = true;
    }
    if (addArticleInfo.price <= 0) {
      priceError = true;
    }
    if (addArticleInfo.quantity < 0) {
      quantityError = true;
    }
    if (addArticleInfo.image.length === 0) {
      imageError = true;
    }
    setAddErrors({
      name: nameError,
      description: descriptionError,
      price: priceError,
      quantity: quantityError,
      image: imageError,
    });

    if (
      nameError ||
      descriptionError ||
      priceError ||
      quantityError ||
      imageError
    ) {
      return false;
    }
    return true;
  };

  const validateEdit = () => {
    let nameError = false;
    let descriptionError = false;
    let priceError = false;
    let quantityError = false;
    let imageError = false;
    if (editArticleInfo.name.length === 0) {
      nameError = true;
    }
    if (editArticleInfo.description.length === 0) {
      descriptionError = true;
    }
    if (editArticleInfo.price <= 0) {
      priceError = true;
    }
    if (editArticleInfo.quantity < 0) {
      quantityError = true;
    }
    if (editArticleInfo.image.length === 0) {
      imageError = true;
    }
    setEditErrors({
      name: nameError,
      description: descriptionError,
      price: priceError,
      quantity: quantityError,
      image: imageError,
    });

    if (
      nameError ||
      descriptionError ||
      priceError ||
      quantityError ||
      imageError
    ) {
      return false;
    }
    return true;
  };

  const handleEditSubmit = () => {
    if (validateEdit()) {
      console.log("OK");
      document.getElementById("editClose")?.click();
      console.log(editArticleInfo);
    } else {
      console.log("NOT OK");
    }
  };

  const handleAddSubmit = () => {
    if (validateAdd()) {
      console.log("OK");
      console.log(addArticleInfo);
      document.getElementById("addClose")?.click();
    } else {
      console.log("NOT OK");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <br />
        <br />
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <h1>Articles</h1>
          </div>
          <div className="col-sm-3">
            <button
              type="button"
              className="btn btn-lg btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newModal"
              id="new"
            >
              New Article
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              id="edit"
              hidden
            >
              New Article
            </button>
          </div>
        </div>
      </div>
      <Articles
        articles={articles}
        articleButtons="edit-delete"
        deleteArticle={deleteArticle}
        editArticle={editArticle}
      />
      <div
        className="modal fade"
        id="newModal"
        aria-labelledby="newModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <MdOutlineAddCircle size="10%" color="#0D6EFD" />
              <h1 style={{ marginLeft: "3%" }} className="modal-title fs-5">
                New Article
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="addClose"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row justify-content-md-center">
                  <div className="col-sm-12">
                    <div className="container"></div>
                    <div className="row">
                      <div className="mb-1">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          value={addArticleInfo.name}
                          onChange={(event) =>
                            setAddArticleInfo({
                              ...addArticleInfo,
                              name: event.target.value.trim(),
                            })
                          }
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                        {addErrors.name && (
                          <p className="text-danger">Name is required</p>
                        )}
                      </div>
                      <div className="mb-1">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input
                          value={addArticleInfo.price}
                          onChange={(event) =>
                            setAddArticleInfo({
                              ...addArticleInfo,
                              price: parseInt(addArticleInfo.price.toFixed()),
                            })
                          }
                          id="price"
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          min="1"
                        />
                        {addErrors.price && (
                          <p className="text-danger">
                            Price has to be a positive
                          </p>
                        )}
                      </div>
                      <div className="mb-1">
                        <label htmlFor="quantity" className="form-label">
                          Quantity
                        </label>
                        <input
                          value={addArticleInfo.quantity}
                          onChange={(event) =>
                            setAddArticleInfo({
                              ...addArticleInfo,
                              quantity: parseInt(
                                addArticleInfo.quantity.toFixed()
                              ),
                            })
                          }
                          id="quantity"
                          type="number"
                          className="form-control"
                          placeholder="quantity"
                          min="1"
                        />
                        {addErrors.quantity && (
                          <p className="text-danger">
                            Quantity can't be a negative
                          </p>
                        )}
                      </div>
                      <div className="mb-1">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <input
                          value={addArticleInfo.description}
                          onChange={(event) =>
                            setAddArticleInfo({
                              ...addArticleInfo,
                              description: event.target.value.trim(),
                            })
                          }
                          id="description"
                          type="text"
                          className="form-control"
                          placeholder="Description"
                        />
                        {addErrors.description && (
                          <p className="text-danger">Description is required</p>
                        )}
                      </div>
                      <div className="mb-1">
                        <label htmlFor="file" className="form-label">
                          Article Photo
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="file"
                          accept="image/png, image/jpeg, image/gif"
                          onChange={handleFileChange}
                        />
                      </div>
                      {addErrors.image && (
                        <p className="text-danger">
                          Please, upload article image.
                        </p>
                      )}
                      <div className="mb-1">
                        <img
                          style={{
                            marginTop: "3%",
                            borderRadius: "5%",
                            borderColor: "#0D6EFD",
                            borderStyle: "solid",
                          }}
                          id="image"
                          src={addArticleInfo.image}
                          className="rounded mx-auto d-block"
                          alt="..."
                          height="300"
                          width="100%"
                        ></img>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleAddSubmit}
                className="btn btn-primary"
              >
                Add Article
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editModal"
        aria-labelledby="newModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <RiEditCircleFill size="10%" color="#0D6EFD" />
              <h1 style={{ marginLeft: "3%" }} className="modal-title fs-5">
                Edit Article
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row justify-content-md-center">
                  <div className="col-sm-12">
                    <div className="container"></div>
                    <div className="row">
                      <div className="mb-1">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          value={editArticleInfo.name}
                          onChange={(event) =>
                            setEditArticleInfo({
                              ...editArticleInfo,
                              name: event.target.value.trim(),
                            })
                          }
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                        {editErrors.name && (
                          <p className="text-danger">Name is required</p>
                        )}
                      </div>
                      <div className="mb-1">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input
                          value={editArticleInfo.price}
                          onChange={(event) =>
                            setEditArticleInfo({
                              ...editArticleInfo,
                              price: parseInt(event.target.value).toFixed(),
                            })
                          }
                          id="price"
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          min="1"
                        />
                        {editErrors.price && (
                          <p className="text-danger">
                            Price has to be a positive
                          </p>
                        )}
                      </div>
                      <div className="mb-1">
                        <label htmlFor="quantity" className="form-label">
                          quantity
                        </label>
                        <input
                          value={editArticleInfo.quantity}
                          onChange={(event) =>
                            setEditArticleInfo({
                              ...editArticleInfo,
                              quantity: parseInt(event.target.value).toFixed(),
                            })
                          }
                          id="quantity"
                          type="number"
                          className="form-control"
                          placeholder="quantity"
                          min="0"
                        />
                      </div>
                      {editErrors.quantity && (
                        <p className="text-danger">
                          Quantity can't be a negative
                        </p>
                      )}
                      <div className="mb-1">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <input
                          value={editArticleInfo.description}
                          onChange={(event) =>
                            setEditArticleInfo({
                              ...editArticleInfo,
                              description: event.target.value.trim(),
                            })
                          }
                          id="description"
                          type="text"
                          className="form-control"
                          placeholder="Description"
                        />
                        {editErrors.description && (
                          <p className="text-danger">Description is required</p>
                        )}
                      </div>
                      <div className="mb-1">
                        <label htmlFor="file" className="form-label">
                          Article Photo
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="file"
                          accept="image/png, image/jpeg, image/gif"
                          onChange={handleEditFileChange}
                        />
                      </div>
                      {editErrors.image && (
                        <p className="text-danger">
                          Please, upload article image.
                        </p>
                      )}
                      <div className="mb-1">
                        <img
                          style={{
                            marginTop: "3%",
                            borderRadius: "5%",
                            borderColor: "#0D6EFD",
                            borderStyle: "solid",
                          }}
                          id="image"
                          src={editArticleInfo.image}
                          className="rounded mx-auto d-block"
                          alt="..."
                          height="300"
                          width="100%"
                        ></img>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="editClose"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSubmit}
              >
                Edit Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddArticle;
