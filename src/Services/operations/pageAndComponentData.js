import {toast} from "react-hot-toast"
import { apiconnector } from '../apiconnectors';
import { catalogData } from '../apiReq';

export const getCatalogaPageData = async(categoryId,dispatch) => {
  // const toastId = toast.loading("Loading...");
  let result = [];
  try{
        const response = await apiconnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});
        if(!response.data.success)
            throw new Error("Could not Fetch Category page data error",
            response);

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error("No Course added to this category yet");
    result = error.response?.data;
  }
  // toast.dismiss(toastId);
  return result;
}