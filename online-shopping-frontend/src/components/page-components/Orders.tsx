import { useState } from "react";
import ArticleDTO from "../../DTO/ArticleDTO";
import Articles from "../Articles";

const Orders = () => {
  let [articles, setArticles] = useState<ArticleDTO[]>([
    {
      id: 1,
      name: "name1",
      price: 1,
      quantity: 1,
      description: "desc1",
      image:
        "https://www.idealstandard.rs/-/media/project/ideal-standard/commerce-websites/shared-website/default-fallback-images/product-tile/product_image_placeholder.png",
    },
    {
      id: 2,
      name: "name2",
      price: 2,
      quantity: 2,
      description: "desc2",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 3,
      name: "name3",
      price: 3,
      quantity: 3,
      description: "desc3",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 4,
      name: "name3",
      price: 3,
      quantity: 3,
      description: "desc3",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  ]);

  return (
    <>
      <div className="container-fluid text-center">
        <br />
        <div className="row">
          <div className="col-sm-3">
            <div className="container-fluid">
              <h3>Orders</h3>
              <hr />
              <div
                id="list-example"
                className="list-group"
                style={{ overflow: "y: scroll" }}
              >
                <a
                  className="list-group-item list-group-item-action"
                  href="#list-item-1"
                >
                  Item 1
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  href="#list-item-2"
                >
                  Item 2
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  href="#list-item-3"
                >
                  Item 3
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  href="#list-item-4"
                >
                  Item 4
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-9 text-center">
            <h3>Order Articles</h3>
            <hr />
            <div
              data-bs-spy="scroll"
              data-bs-target="#list-example"
              data-bs-smooth-scroll="true"
              className="overflow-auto"
              style={{ overflowY: "scroll", height: "750px" }}
            >
              <h4 id="list-item-1">Item 1</h4>
              <Articles articles={articles} articleButtons="none" />
              <h4 className="text-center" id="list-item-2">
                Item 2
              </h4>
              <Articles articles={articles} articleButtons="none" />
              <h4 className="text-center" id="list-item-3">
                Item 3
              </h4>
              <Articles articles={articles} articleButtons="none" />
              <h4 className="text-center" id="list-item-4">
                Item 4
              </h4>
              <Articles articles={articles} articleButtons="none" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
