const mob_size = typeof window !== 'undefined' ? window.innerWidth < 576 : false

const editArrayItem = (array, selectedIndex, newObj) => {
    let new_array = [...array]
    selectedIndex === 0 ?
        new_array = [newObj, ...new_array.slice(selectedIndex + 1)] :
        new_array = [...new_array.slice(0, selectedIndex), newObj, ...new_array.slice(selectedIndex + 1)]
    return new_array
}

const saveCartData = (state, new_state) => {

    const {
        new_line_items,
        new_total,
        new_original_total
    } = new_state

    //* SAVE IN LOCAL STORAGE
    localStorage.setItem('line_items', JSON.stringify(new_line_items))
    localStorage.setItem('total', new_total)
    localStorage.setItem('original_total', new_original_total)

    //* SAVE IN REDUX
    state.total = new_total
    state.original_total = new_original_total
    state.line_items = new_line_items
}

export {
    mob_size,
    editArrayItem,
    saveCartData
}