// import { format } from "date-fns";

// export const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return format(date, "d/MMM/yyyy h:mm a");
// };

import { format } from "date-fns";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "d/MMM/yyyy h:mm a");
};
