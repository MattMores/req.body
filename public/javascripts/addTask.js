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
    const hiddenCancelCategoryButton = document.getElementById('createAnotherCategory__cancel')
    if (createCategoryButton) {
        createAnotherCategoryButton.style.display = 'none'

        createCategoryButton.addEventListener('click', async event => {
            event.preventDefault()

            // console.log(organizeYourLife)
            everythingDiv.style.display = 'none'
            hiddenDiv.style.display = ''
            hiddenLabel.style.display = ''
            hiddenInputField.style.display = ''
            hiddenInputField.innerHTML = '';
            hiddenAddCategoryButton.style.display = ''
            hiddenCancelCategoryButton.style.display = ''
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
            hiddenCancelCategoryButton.style.display = ''
            createAnotherCategoryButton.style.display = 'none';
            hiddenInputField.innerHTML = '';
            if (selectCategorySelector) {

                selectCategorySelector.style.display = 'none'
                selectCategoryLabel.style.display = 'none'
            }
            selectCategoryLabelHidden.style.display = 'none'
            selectCategorySelectorHidden.style.display = 'none'
            // selectCategoryLabel.style.display = 'none'
            // selectCategorySelector
        })
    }

    if (hiddenCancelCategoryButton) {
        hiddenCancelCategoryButton.addEventListener('click', async event => {
            event.preventDefault()

            hiddenDiv.style.display = 'none'
            hiddenLabel.style.display = 'none'
            hiddenInputField.style.display = 'none'
            hiddenAddCategoryButton.style.display = 'none'
            createAnotherCategoryButton.style.display = 'none'
            if (selectCategorySelector && selectCategoryLabel) {

                selectCategorySelector.style.display = ''
                selectCategoryLabel.style.display = ''
                createAnotherCategoryButton.style.display = ''
                // } else if (createCategoryButton) {
                //     everythingDiv.style.display = ''
                //     createCategoryButton.style.display = ''
            } else {
                const res = await fetch("http://localhost:8080/categories/api/get")

                const json = await res.json()
                if (!json.categories.length) {
                    everythingDiv.style.display = ''
                    createCategoryButton.style.display = ''
                } else {
                    selectCategorySelectorHidden.style.display = ''
                    selectCategoryLabelHidden.style.display = ''
                    createAnotherCategoryButton.style.display = ''

                    const selectList = json.categories.map(obj => {
                        return `<option value=${obj.id}>${obj.title}</option>`
                    })

                    selectCategorySelectorHidden.innerHTML = `<option>No Category</option>` + selectList.join('')
                    // selectCategorySelectorHidden.style.color = "darkgreen"
                    // selectCategoryLabelHidden.style.color = 'darkgreen'
                    // selectCategoryLabelHidden.style.fontWeight = 'bold'
                }
            }

            // selectCategorySelector.style.display = ''
            // selectCategoryLabel.style.display = ''
            // createAnotherCategoryButton.style.display = ''

        })
    }



    hiddenAddCategoryButton.addEventListener('click', async event => {
        event.preventDefault()

        // console.log(hiddenInputField.value)
        hiddenDiv.style.display = 'none'
        hiddenLabel.style.display = 'none'
        hiddenInputField.style.display = 'none'
        hiddenAddCategoryButton.style.display = 'none'
        createAnotherCategoryButton.style.display = 'none'
        createAnotherCategoryButton.style.display = ''
        if (selectCategoryLabel && selectCategorySelector) {
            selectCategorySelector.style.display = ''
            selectCategoryLabel.style.display = ''

            selectCategoryLabel.style.color = 'darkgreen'
            selectCategoryLabel.style.fontWeight = 'bold'
            // selectCategoryLabel.innerHTML = '*Category:'
            selectCategorySelector.style.color = "darkgreen"
        } else {
            selectCategorySelectorHidden.style.display = ''
            selectCategoryLabelHidden.style.display = ''

            selectCategoryLabelHidden.style.color = 'darkgreen'
            selectCategoryLabelHidden.style.fontWeight = 'bold'
            // selectCategoryLabel.innerHTML = '*Category:'
            selectCategorySelectorHidden.style.color = "darkgreen"
        }


        const value = hiddenInputField.value

            const res = await fetch("http://localhost:8080/categories/api/create", {
                method: "POST",
                body: JSON.stringify({ value }),
                headers: { "Content-Type": "application/json" },
            })
        const json = await res.json()
        // await console.log(json)
        // await console.log(json.Categorys)
        hiddenInputField.value = ''
        if (selectCategorySelector) {

            const selectList = json.categories.map(obj => {
                return `<option value=${obj.id}>${obj.title}</option>`
            })

            selectCategorySelector.innerHTML = `<option>No Category</option>` + selectList.join('')
        } else {
            selectCategoryLabelHidden.style.display = ''
            selectCategorySelectorHidden.style.display = ''
            const selectList = json.categories.map(obj => {
                return `<option value=${obj.id}>${obj.title}</option>`
            })

            selectCategorySelectorHidden.innerHTML = `<option>No Category</option>` + selectList.join('')
            selectCategorySelectorHidden.style.color = "darkgreen"
            selectCategoryLabelHidden.style.color = 'darkgreen'
            selectCategoryLabelHidden.style.fontWeight = 'bold'
            // selectCategoryLabelHidden.innerText = '*Category:'
        }


    })

    if (selectCategorySelector) {

        selectCategorySelector.addEventListener('click', async event => {
            selectCategoryLabel.style.color = ''
            selectCategoryLabel.style.fontWeight = ''
            selectCategoryLabel.innerHTML = 'Category:'
            selectCategorySelector.style.color = ""
            createAnotherCategoryButton.style.display = '';
            hiddenInputField.innerHTML = '';
        })
    }

    if (selectCategorySelectorHidden) {
        selectCategorySelectorHidden.addEventListener('click', async event => {
            selectCategorySelectorHidden.style.color = ""
            selectCategoryLabelHidden.style.color = ''
            selectCategoryLabelHidden.style.fontWeight = ''
            // selectCategoryLabelHidden.innerHTML = 'Category:'
            createAnotherCategoryButton.style.display = '';
            hiddenInputField.innerHTML = '';

        })
    }

})
