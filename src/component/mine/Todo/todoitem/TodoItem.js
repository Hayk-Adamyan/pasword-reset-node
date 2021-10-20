// import { memo } from "react";
// import "./TodoItem.css";
// const TodoItem = ({ todo, index, updateTodo, RemoveTodo }) => {
//   return (
//     <li className="item">
//       <div className={`${todo.is_completed ? "done" : "overflow"}`}>
//         <input
//           type="checkbox"
//           onChange={(e) =>
//             updateTodo({
//               ...todo,
//               is_completed: e.target.checked,
//             })
//           }
//         />
// //         <strong>{index + 1}</strong>
// //         &nbsp;
// //         <div className="todoDivs">
// //           <div className="titleDedline">
// //             <div>{todo.task}</div>
// //             <div> {todo.dateLine}</div>
// //           </div>
// //         </div>
// //       </div>
//       <div className="priority">
//         <div
//           className={`${
//             todo.priority === "Low"
//               ? "green"
//               : todo.priority === "Middle"
//               ? "orange"
//               : todo.priority === "High"
//               ? "red"
//               : ""
//           }`}
//         >
//           {todo.priority}
//         </div>
//         <div>
//           <button data-id={todo.id} onClick={RemoveTodo} className="x">
//             &times;
//           </button>
//         </div>
//       </div>
//     </li>
//   );
// };
// export default memo(TodoItem);
