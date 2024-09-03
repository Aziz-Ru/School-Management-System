import Link from "next/link";

const NoticeCard = ({ title, path, createdAt }) => {
  return (
    <div className=" shadow-lg text-center px-4 py-2 my-1 rounded-md">
      <Link href={path} className="font-bold">
        {title}
      </Link>
      <p className="text-red-500 font-semibold">{createdAt}</p>
    </div>
  );
};

export default NoticeCard;

// import { useEffect, useReducer } from "react";

// const initialState = {
//   classRoom: [],
//   loading: false,
//   error: "",
//   msg: "",
// };
// interface Props {
//   classRoom: { id: number, className: string }[];
//   loading: boolean;
//   error: string;
//   msg: string;
// }

// const reducer = (
//   state: Props,
//   action: {
//     type: string,
//     payload: {
//       msg: string,
//       classRoom: { id: number, className: string }[],
//     },
//   }
// ) => {
//   switch (action.type) {
//     case "REQUEST":
//       return {
//         ...state,
//         loading: true,
//       };
//     case "SUCCESS":
//       return {
//         error: "",
//         loading: false,
//         classRoom: action.payload.classRoom,
//         msg: action.payload.msg,
//       };
//     case "FAILURE":
//       return {
//         ...state,
//         error: "Failed",
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };
// const [state, dispatch] = useReducer(reducer, initialState);

// useEffect(() => {
//   const fetchClass = async () => {
//     try {
//       dispatch({ type: "REQUEST", payload: { msg: "", classRoom: [] } });
//       const res = await fetch("/api/admin/class");
//       const data = await res.json();

//       dispatch({ type: "SUCCESS", payload: { msg: "", classRoom: data } });
//     } catch (error) {
//       dispatch({ type: "FAILURE", payload: { msg: "", classRoom: [] } });
//     }
//   };
//   fetchClass();
// }, []);
