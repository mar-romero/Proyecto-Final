import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { updateProduct } from "../../redux/apiCalls";
import { Publish } from "@material-ui/icons";
import { useDispatch ,useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";



export default function Product() {

  const location = useLocation();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);


  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );


  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = (e,id) => {
    e.preventDefault();
    const product2 = { ...inputs};
    updateProduct(id, product2,dispatch);
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>

      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Costo:</span>
              <span className="productInfoValue">{product.cost}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Precio de venta:</span>
              <span className="productInfoValue">{product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Unidad de venta:</span>
              <span className="productInfoValue">{product.size}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Nombre</label>
            <input type="text" name="title" onChange={handleChange} placeholder={product.title} />
            <label>Descripcion</label>
            <input type="text"name="desc" onChange={handleChange} placeholder={product.desc} />
            <label>Precio</label>
            <input type="text"name="price" onChange={handleChange} placeholder={product.price} />
            <label>Costo</label>
            <input type="text" name="cost" onChange={handleChange} placeholder={product.cost} />
            <label>Unidad de venta</label>
            <input type="text" name="size" onChange={handleChange} placeholder={product.size} />
            <label>In Stock</label>
            <select name="inStock" onChange={handleChange} id="idStock" >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={(e)=>{handleUpdate(e,product._id)}}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}