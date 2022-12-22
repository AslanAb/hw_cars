const carsDiv = document.querySelector("#carsDiv")

const BASE_URL = 'http://localhost:8000'

const loadDataCars = async () => {
    const response = await fetch(BASE_URL + '/cars')
    carsDiv.innerHTML = ''
    const data = await response.json()
    for (const car of data) {
        carsDiv.innerHTML += `<div class="cars_list">
                                    <input type="text" value="${car.model}" id="${car.id}">
                                    <button onclick="${saveCar(car.id)}">save</button>
                                    <button onclick="${deleteCar(car.id)}">delete</button>
                            </div>`
    }
}

loadDataCars()

const saveCar = id => {
    
}
const deleteCar = id => {

}