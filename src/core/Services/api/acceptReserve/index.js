import instance from "../../../interseptor/Interseptor";


export const postReserveAccept = async (apiData) => {
  const response = await instance.post("/CourseReserve/SendReserveToCourse",apiData);
  return response.data;
};
export const deleteReserveAccept = async (apiData) => {
  const response = await instance.delete("/CourseReserve", {
    data: apiData
  });
  return response.data;
};

