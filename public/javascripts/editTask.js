
const titleInput = document.getElementById('titleInput')
const errorDiv = document.getElementById('errorsList')
const titleLabel = document.getElementById('titleLabel')
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
    let emptyString = '   '
    if (title.trim() === emptyString.trim()) {
        // const errorHtml = `
        //     <p>The following error(s) occurred: </p>
        //         <ul>
        //             <li> Title cannot be empty </li>
        //         </ul>
        // `
        // console.log(errorDiv)
        // errorDiv.style.display = ''
        // errorDiv.innerHTML = errorHtml;
        titleInput.style.backgroundColor = '#f26161'
        titleInput.setAttribute('placeholder', 'Title cannot be empty')
        titleInput.style.fontWeight = "bold"
        titleInput.style.color = "black"
        titleInput.style.opacity = "1"
        titleLabel.style.color = '#f26161'
        titleLabel.style.fontWeight = 'bold'
        // const tester = titleInput.html = `<p>Error</p>`

        titleInput.addEventListener('click', e => {
            titleInput.style.backgroundColor = 'unset'
            // titleInput.setAttribute('placeholder', '')
            titleInput.style.fontWeight = "unset"
            titleInput.style.color = "unset"
            titleInput.style.opacity = "unset"
            titleLabel.style.color = 'unset'
            titleLabel.style.fontWeight = 'unset'
        })

    } else {


        console.log(body)
        const res = await fetch(`/tasks/api/edit/${number}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const json = await res.json()
        console.log(json)
        window.location.href = "/tasks";
    }

})


