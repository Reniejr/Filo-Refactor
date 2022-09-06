const mob_size = typeof window !== 'undefined' ? window.innerWidth < 576 : false

const editArrayItem = (array, selectedIndex, newObj) => {
    let new_array = [...array]
    selectedIndex === 0 ?
        new_array = [newObj, ...new_array.slice(selectedIndex + 1)] :
        new_array = [...new_array.slice(0, selectedIndex), newObj, ...new_array.slice(selectedIndex + 1)]
    return new_array
}

export {
    mob_size,
    editArrayItem,
}