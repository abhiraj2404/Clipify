import React from "react";

function todo({ id }) {
  const [todo, setTodo] = useValueStateLoadable(todosAtomFamily(id));
  if (todo.state === "loading") {
    return <div>Loading...</div>;
  } 
  else if (todo.state === "hasValue") {
    return (
      <>
        <div>{todo.contents.todoTitle}</div>
        <div>{todo.contents.description}</div>
      </>
    );
  }
  else if (todo.state === "hasError") {
    return <div>Error: {todo.contents.message}</div>;
  }

}

export default test;





