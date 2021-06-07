document.addEventListener("DOMContentLoaded", async (e) => {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async (e) => {
      const taskId = e.target.id;
      const id = parseInt(taskId.split("-")[1], 10);
      const task = document.querySelector(`#task-${id}`);
      const res = await fetch(`/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        task.remove();
      }
    });
  });
});

// document.addEventListener("DOMContentLoaded", async (e) => {
//   const tasks = document.querySelectorAll(".tasks");
//   tasks.forEach((task) => {
//     const buttons = task.childNodes[1].childNodes;
//     buttons.forEach((button) => {
//       if (button.classList.value === "delete") {
//         button.addEventListener("click", async (e) => {
//           const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
//             method: "DELETE",
//             body: JSON.stringify({ id: task.id }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           if (res.ok) {
//             task.remove();
//           }
//         });
//       }
//     });
//   });
// });
