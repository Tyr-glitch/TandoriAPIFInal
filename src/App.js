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

/*-------------------------------------------------------------------------------------------------------*/

const form = document.getElementById('form');
const form2 = document.getElementById('form2');
const producttype = document.getElementById('producttype');
const suppliername = document.getElementById('suppliername');
const postalcode = document.getElementById('postalcode');
const address = document.getElementById('address');
const productname = document.getElementById('productname');
const material = document.getElementById('material');
const colour = document.getElementById('colour');
const producttype2 = document.getElementById('producttype2');
const suppliername2 = document.getElementById('suppliername2');
const postalcode2 = document.getElementById('postalcode2');
const address2 = document.getElementById('address2');
const productname2 = document.getElementById('productname2');
const material2 = document.getElementById('material2');
const colour2 = document.getElementById('colour2');

if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    checkInputs();
  });
}

if(form2){
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    checkInputs();
  });
}



function checkInputs() {
	const producttypeValue = producttype.value.trim();
	const suppliernameValue = suppliername.value.trim();
	const postalcodeValue = postalcode.value.trim();
	const addressValue = address.value.trim();
	const productnameValue = productname.value.trim();
	const materialValue = material.value.trim();
	const colourValue = colour.value.trim();

  const producttypeValue2 = producttype2.value.trim();
	const suppliernameValue2 = suppliername2.value.trim();
	const postalcodeValue2 = postalcode2.value.trim();
	const addressValue2 = address2.value.trim();
	const productnameValue2 = productname2.value.trim();
	const materialValue2 = material2.value.trim();
	const colourValue2 = colour2.value.trim();
	
	if(producttypeValue === '') {
		setErrorFor(producttype, 'Product type cannot be blank');
	} else {
		setSuccessFor(producttype);
	}
	
	if(suppliernameValue === '') {
		setErrorFor(suppliername, 'Supplier name cannot be blank');
	} 
	else 
	{
		setSuccessFor(suppliername);
	}
	
	if(postalcodeValue === '') {
		setErrorFor(postalcode, 'Postal code cannot be blank');
	} else {
		setSuccessFor(postalcode);
	}
	
	if(addressValue === '') {
		setErrorFor(address, 'Address cannot be blank');
	} else{
		setSuccessFor(address);
	}

	if(productnameValue === '') {
		setErrorFor(productname, 'Product name cannot be blank');
	} else{
		setSuccessFor(productname);
	}

	if(materialValue === '') {
		setErrorFor(material, 'Material cannot be blank');
	} else{
		setSuccessFor(material);
	}

	if(colourValue === '') {
		setErrorFor(colour, 'Colour cannot be blank');
	} else{
		setSuccessFor(colour);
	}


  if(producttypeValue2 === '') {
		setErrorFor(producttype2, 'Product type cannot be blank');
	} else {
		setSuccessFor(producttype2);
	}
	
	if(suppliernameValue2 === '') {
		setErrorFor(suppliername2, 'Supplier name cannot be blank');
	} 
	else 
	{
		setSuccessFor(suppliername2);
	}
	
	if(postalcodeValue2 === '') {
		setErrorFor(postalcode2, 'Postal code cannot be blank');
	} else {
		setSuccessFor(postalcode2);
	}
	
	if(addressValue2 === '') {
		setErrorFor(address2, 'Address cannot be blank');
	} else{
		setSuccessFor(address2);
	}

	if(productnameValue2 === '') {
		setErrorFor(productname2, 'Product name cannot be blank');
	} else{
		setSuccessFor(productname2);
	}

	if(materialValue2 === '') {
		setErrorFor(material2, 'Material cannot be blank');
	} else{
		setSuccessFor(material2);
	}

	if(colourValue2 === '') {
		setErrorFor(colour2, 'Colour cannot be blank');
	} else{
		setSuccessFor(colour2);
	}

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

/*-------------------------------------------------------------------------------------------------------*/
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

      {/* <form id="form" className="row g-3 needs-validation" noValidate>     */}
      <Modal isOpen={modalInsert}>
        <ModalHeader>Insert Products</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label for="producttype" id="producttype">Product Type: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="productType_"
              id="producttype"
              onChange={handleChange}
              value={selectedProduct?.productType_}
              required
            />
            {/* <small>Error message</small> */}
            <label id="suppliername">Supplier Name: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="supplierName"
              id="suppliername"
              onChange={handleChange}
              value={selectedProduct?.supplierName}
              required
            />
            {/* <small>Error message</small> */}
            <label id="phone">Phone: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={selectedProduct?.phone}
              required
            />
            {/* <small>Error message</small> */}
            <label id="postalcode">Postal Code: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="postalCode"
              id="postalcode"
              onChange={handleChange}
              value={selectedProduct?.postalCode}
              required
            />
            {/* <small>Error message</small> */}
            <label id="address">Address: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
              onChange={handleChange}
              value={selectedProduct?.address}
              required
            />
            {/* <small>Error message</small> */}
            <label id="productname">Product Name: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="productName"
              id="productname"
              onChange={handleChange}
              value={selectedProduct?.productName}
              required
            />
            {/* <small>Error message</small> */}
            <label id="material">Material: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="material"
              id="material"
              onChange={handleChange}
              value={selectedProduct?.material}
              required
            />
            {/* <small>Error message</small> */}
            <label id="colour">Colour: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="colour"
              id="colour"
              onChange={handleChange}
              value={selectedProduct?.colour}
              required
            />
            {/* <small>Error message</small> */}
            <label id="quantity">Quantity: </label>
            <br />
            <input
              type="number"
              min="1"
              max="9999"
              step="1"
              className="form-control"
              name="quantity"
              id="quantity"
              onChange={handleChange}
              value={selectedProduct?.quantity}
              required
            />
            {/* <small>Error message</small> */}
            <label id="price">Price: </label>
            <br />
            <input
              type="number"
              min="1"
              max="99999"
              step="1"
              className="form-control"
              name="price"
              id="price"
              onChange={handleChange}
              value={selectedProduct?.price}
              required
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
    {/* </form> */}
      {
        // <form id="form2" className="row g-3 needs-validation" noValidate>
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
                id="producttype2"
                onChange={handleChange}
                value={selectedProduct?.productType_}
                required
              />
              {/* <small>Error message</small> */}
              <label>Supplier Name: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="supplierName"
                id="suppliername2"
                onChange={handleChange}
                value={selectedProduct?.supplierName}
                required
              />
              {/* <small>Error message</small> */}
              <label>Phone: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone2"
                onChange={handleChange}
                value={selectedProduct?.phone}
                required
              />
              {/* <small>Error message</small> */}
              <label>Postal Code: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="postalCode"
                id="postalcode2"
                onChange={handleChange}
                value={selectedProduct?.postalCode}
                required
              />
              {/* <small>Error message</small> */}
              <label>Address: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="address"
                id="address2"
                onChange={handleChange}
                value={selectedProduct?.address}
                required
              />
              {/* <small>Error message</small> */}
              <label>Product Name: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="productName"
                id="productname2"
                onChange={handleChange}
                value={selectedProduct?.productName}
                required
              />
              {/* <small>Error message</small> */}
              <label>Material: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="material"
                id="material2"
                onChange={handleChange}
                value={selectedProduct?.material}
                required
              />
              {/* <small>Error message</small> */}
              <label>Colour: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="colour"
                id="colour2"
                onChange={handleChange}
                value={selectedProduct?.colour}
                required
              />
              {/* <small>Error message</small> */}
              <label>Quantity: </label>
              <br />
              <input
                type="number"
                min="1"
                max="999"
                step="1"
                className="form-control"
                name="quantity"
                id="quantity2"
                onChange={handleChange}
                value={selectedProduct?.quantity}
                required
              />
              {/* <small>Error message</small> */}
              <label>Price: </label>
              <br />
              <input
                type="number"
                min="1"
                max="99999"
                step="1"
                className="form-control"
                name="price"
                id="price2"
                onChange={handleChange}
                value={selectedProduct?.price}
                required
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
        //  </form>
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
