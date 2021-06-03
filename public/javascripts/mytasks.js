document.addEventListener('DOMContentLoaded', async(e) => {
    const tasks = document.querySelectorAll('.delete')
    tasks.forEach(task => {
        task.addEventListener('click', async(e) => {
            const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
                method: "DELETE",
                body: JSON.stringify({ id: task.id}),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (res.ok) {
                task.remove();
            }
        })
    })
})
