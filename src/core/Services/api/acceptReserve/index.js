import instance from "../../../interseptor/Interseptor";


export const postReserveAccept = async (apiData) => {
  const response = await instance.post("/CourseReserve/SendReserveToCourse",apiData);
  return response.data;
};
