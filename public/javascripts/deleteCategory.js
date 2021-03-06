window.addEventListener("DOMContentLoaded", (e) => {
  const deleteButtons = document.querySelectorAll(".toDelete");
  console.log(deleteButtons);
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const catId = e.target.id;
      console.log(catId);
      const id = parseInt(catId, 10);
      const res = await fetch(
        `/categories/api/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      window.location.href = "/tasks";
      const resAgain = await fetch(
        `/categories/api/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // await res.json()
      // console.log(json)
      // if (res.ok) {
      window.location.href = "/tasks";
      // }
    });
  });
});
