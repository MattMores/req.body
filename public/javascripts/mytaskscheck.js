document.addEventListener("DOMContentLoaded", async (e) => {
  const checkButtons = document.querySelectorAll(".check");
  checkButtons.forEach((checkButton) => {
    checkButton.addEventListener("click", async (e) => {
      const taskId = e.target.id;
      const id = parseInt(taskId.split("-")[1], 10);
      const task = document.querySelector(`#task-${id}`);
      const res = await fetch(`http://localhost:8080/tasks/${id}/check`, {
        method: "PUT",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const taskContainer = document.querySelector(".completeContainer");
        const editCheckButtons = document.querySelectorAll(`#remove-${id}`);
        taskContainer.appendChild(task);

        editCheckButtons.forEach((editCheckButton) => {
          editCheckButton.style.display = "none";
        });
      }
    });
  });
});
