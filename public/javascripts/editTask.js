

const editTaskButton = document.getElementById('editTaskButton')
const taskEditForm = document.getElementById('taskEditForm')
const id = taskEditForm.classList.value
console.log(editTaskButton)
console.log(taskEditForm)
const number = parseInt(id, 10)
console.log(number)
taskEditForm.addEventListener('submit', async event => {
    event.preventDefault();

    // console.log(taskEditForm.classList.value)
    const formData = new FormData(taskEditForm)
    const title = formData.get("title")
    const categoryId = formData.get("category")
    const details = formData.get("details")
    const due = formData.get("due")
    const public = formData.get("public")

    const body = { title, categoryId, details, due, public }
    console.log(body)
    const res = await fetch(`http://localhost:8080/tasks/api/edit/${number}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const json = await res.json()
    console.log(json)

    window.location.href = "/tasks";
})


