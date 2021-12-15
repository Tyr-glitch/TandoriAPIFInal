import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const baseURL = "https://localhost:5001/api/main";

function App() {
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  
  useEffect(() => {
    Get();
  }, []);

  const handleChange = (event) => {
    setSelectedProduct({
      ...selectedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickDelete = (product) => {
    setSelectedProduct({
      idProduct: product.idProduct,
    });
    ToggleModal_Delete();
  };

  const createMap = (ProductSelected) => {
    setSelectedProduct({
      idProduct: ProductSelected.idProduct,
      idProductType: ProductSelected.idProductType.idProductType,
      productType_: ProductSelected.idProductType.productType_,
      idSupplier: ProductSelected.idSupplier.idSupplier,
      supplierName: ProductSelected.idSupplier.name,
      phone: ProductSelected.idSupplier.phone,
      postalCode: ProductSelected.idSupplier.postalCode,
      address: ProductSelected.idSupplier.address,
      productName: ProductSelected.name,
      material: ProductSelected.material,
      colour: ProductSelected.colour,
      quantity: ProductSelected.quantity,
      price: ProductSelected.price,
    });
    ToggleModal_Edit();
  };

  const createProduct_ = (data, edit) => {
    const body = {};
    body.idProductType = {};
    body.idSupplier = {};

    body.idProductType.productType_ = data.productType_;
    body.idSupplier.name = data.supplierName;
    body.idSupplier.phone = data.phone;
    body.idSupplier.postalCode = data.postalCode;
    body.idSupplier.address = data.address;
    body.name = data.productName;
    body.material = data.material;
    body.colour = data.colour;
    body.quantity = data.quantity;
    body.price = data.price;

    if (edit) {
      body.idProduct = data.idProduct;
      body.idProductType.idProductType = data.idProductType;
      body.idSupplier.idSupplier = data.idSupplier;
    }

    return body;
  };

  const ToggleModal = () => {
    if (modalInsert) {
      setSelectedProduct({});
    }
    setModalInsert(!modalInsert);
  };

  const ToggleModal_Edit = () => {
    if (modalEdit) {
      setSelectedProduct({});
    }
    setModalEdit(!modalEdit);
  };

  const ToggleModal_Delete = () => {
    if (modalDelete) {
      setSelectedProduct({});
    }
    setModalDelete(!modalDelete);
  };

  const Get = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Post = async () => {
    await axios
      .post(baseURL, createProduct_(selectedProduct))
      .then((response) => {
        ToggleModal();
        Get();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Put = async () => {
    await axios
      .put(
        baseURL + "/" + selectedProduct.idProduct,
        createProduct_(selectedProduct, true)
      )
      .then((response) => {
        ToggleModal_Edit();
        Get();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Delete = async () => {
    await axios
      .delete(baseURL + "/" + selectedProduct.idProduct)
      .then((response) => {
        ToggleModal_Delete();
        Get();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="App">
      <br />
      <br />
      <button className="btn btn-primary" onClick={() => ToggleModal()}>
        Insert Product
      </button>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>IDProduct</th>
            <th>ProductType</th>
            <th>Supplier Name</th>
            <th>Phone</th>
            <th>PostalCode</th>
            <th>Address</th>
            <th>Product Name</th>
            <th>Material</th>
            <th>Colour</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.idProduct}>
              <td>{product.idProduct}</td>
              <td>{product.idProductType.productType_}</td>
              <td>{product.idSupplier.name}</td>
              <td>{product.idSupplier.phone}</td>
              <td>{product.idSupplier.postalCode}</td>
              <td>{product.idSupplier.address}</td>
              <td>{product.name}</td>
              <td>{product.material}</td>
              <td>{product.colour}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => createMap(product)}
                >
                  Edit
                </button>
                {"  "}
                <button
                  className="btn btn-danger"
                  onClick={() => handleClickDelete(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsert}>
        <ModalHeader>Insert Products</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label for="producttype">Product Type: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="productType_"
              id="producttype"
              onChange={handleChange}
              value={selectedProduct?.productType_}
            />
            <label>Supplier Name: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="supplierName"
              onChange={handleChange}
              value={selectedProduct?.supplierName}
            />
            <label>Phone: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="phone"
              onChange={handleChange}
              value={selectedProduct?.phone}
            />
            <label>Postal Code: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="postalCode"
              onChange={handleChange}
              value={selectedProduct?.postalCode}
            />
            <label>Address: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={handleChange}
              value={selectedProduct?.address}
            />
            <label>Product Name: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="productName"
              onChange={handleChange}
              value={selectedProduct?.productName}
            />
            <label>Material: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="material"
              onChange={handleChange}
              value={selectedProduct?.material}
            />
            <label>Colour: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="colour"
              onChange={handleChange}
              value={selectedProduct?.colour}
            />
            <label>Quantity: </label>
            <br />
            <input
              type="number"
              min="1"
              max="999"
              step="1"
              className="form-control"
              name="quantity"
              onChange={handleChange}
              value={selectedProduct?.quantity}
            />
            <label>Price: </label>
            <br />
            <input
              type="number"
              min="1"
              max="99999"
              step="1"
              className="form-control"
              name="price"
              onChange={handleChange}
              value={selectedProduct?.price}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={() => Post()}>
            Insert
          </button>
          {"  "}
          <button className="btn btn-danger" onClick={() => ToggleModal()}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {
        <Modal isOpen={modalEdit}>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label for="producttype">Product Type: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="productType_"
                id="producttype"
                onChange={handleChange}
                value={selectedProduct?.productType_}
              />
              <label>Supplier Name: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="supplierName"
                onChange={handleChange}
                value={selectedProduct?.supplierName}
              />
              <label>Phone: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="phone"
                onChange={handleChange}
                value={selectedProduct?.phone}
              />
              <label>Postal Code: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="postalCode"
                onChange={handleChange}
                value={selectedProduct?.postalCode}
              />
              <label>Address: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="address"
                onChange={handleChange}
                value={selectedProduct?.address}
              />
              <label>Product Name: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="productName"
                onChange={handleChange}
                value={selectedProduct?.productName}
              />
              <label>Material: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="material"
                onChange={handleChange}
                value={selectedProduct?.material}
              />
              <label>Colour: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="colour"
                onChange={handleChange}
                value={selectedProduct?.colour}
              />
              <label>Quantity: </label>
              <br />
              <input
                type="number"
                min="1"
                max="999"
                step="1"
                className="form-control"
                name="quantity"
                onChange={handleChange}
                value={selectedProduct?.quantity}
              />
              <label>Price: </label>
              <br />
              <input
                type="number"
                min="1"
                max="99999"
                step="1"
                className="form-control"
                name="price"
                onChange={handleChange}
                value={selectedProduct?.price}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => Put()}>
              Edit
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => ToggleModal_Edit()}
            >
              Cancel
            </button>
            {"   "}
          </ModalFooter>
        </Modal>
      }

      <Modal isOpen={modalDelete}>
        <ModalBody>¿Are you sure you want to delete this product?</ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => Delete()}>
            YES
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => ToggleModal_Delete()}
          >
            NO
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
