window.addEventListener("DOMContentLoaded", e => {
    const createCategoryButton = document.getElementById('createFirstCategory')
    const hiddenDiv = document.getElementById("createAnotherCategory__div")
    const hiddenLabel = document.getElementById("createAnotherCategory__label")
    const hiddenInputField = document.getElementById("createAnotherCategory__input")
    const hiddenAddCategoryButton = document.getElementById("createAnotherCategory__submit")
    const organizeYourLife = document.getElementById('organizeYourLife')
    const everythingDiv = document.getElementById('everything')
    const createAnotherCategoryButton = document.getElementById('createAnotherCategory')
    const selectCategoryLabel = document.getElementById('selectCategoryLabel')
    const selectCategorySelector = document.getElementById('selectCategorySelector')
    if (createCategoryButton) {

        createCategoryButton.addEventListener('click', async event => {
            event.preventDefault()

            // console.log(organizeYourLife)
            everythingDiv.style.display = 'none'
            hiddenDiv.style.display = ''
            hiddenLabel.style.display = ''
            hiddenInputField.style.display = ''
            hiddenAddCategoryButton.style.display = ''
            createCategoryButton.style.display = 'none';
        })
    }

    if (createAnotherCategoryButton) {
        createAnotherCategoryButton.addEventListener('click', async event => {
            event.preventDefault()

            hiddenDiv.style.display = ''
            hiddenLabel.style.display = ''
            hiddenInputField.style.display = ''
            hiddenAddCategoryButton.style.display = ''
            createAnotherCategoryButton.style.display = 'none';
            // selectCategoryLabel.style.display = 'none'
            // selectCategorySelector
        })
    }



    hiddenAddCategoryButton.addEventListener('click', async event => {
        event.preventDefault()

        hiddenDiv.style.display = 'none'
        hiddenLabel.style.display = 'none'
        hiddenInputField.style.display = 'none'
        hiddenAddCategoryButton.style.display = 'none'
        createAnotherCategoryButton.style.display = 'none'
        selectCategoryLabel.style.color = 'darkgreen'
        selectCategoryLabel.style.fontWeight = 'bold'
        selectCategoryLabel.innerHTML = '*Category:'
        selectCategorySelector.style.color = "darkgreen"

        // const value = hiddenInputField.value

        console.log(hiddenInputField.value)
        // const res = await fetch("http://localhost:8080/categories/api/create", {
        //     method: "POST",
        //     body: JSON.stringify({ value }),
        //     headers: { "Content-Type": "application/json" },
        // })
        // const json = await res.json()
        // await console.log(json)
        // await console.log(json.Categorys)
        // const selectList = json.Categorys.map(obj)


    })

    selectCategorySelector.addEventListener('click', async event => {
        selectCategoryLabel.style.color = ''
        selectCategoryLabel.style.fontWeight = ''
        selectCategoryLabel.innerHTML = 'Category:'
        selectCategorySelector.style.color = ""
        createAnotherCategoryButton.style.display = '';
    })

})
