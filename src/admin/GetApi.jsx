import { useDispatch } from "react-redux";
import { categoryStatus, productData } from "../redux/actions/productAction";
import axios from "axios";

// show category details
export const ShowCategory = async() => {
  let dispatch = useDispatch();
  await axios
    .get("http://127.0.0.1:8000/api/show-category")
    .then((responseCate) => {
      dispatch(categoryStatus(responseCate.data));
    })
    .catch((err) => {
      console.log(err);
    });
};