const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const NewItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(NewItem)
}

function addItemCarrito(NewItem){

    const alert = document.querySelector('.alert')

    setTimeout( function(){
        alert.classList.add('hide')
    }, 1000)
        alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('input__elemento')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === NewItem.title.trim()){
            carrito[i].cantidad ++;
            
            const inputValue = InputElemento[i].value
            inputValue.value++;
            renderCarrito()
            CarritoTotal()
            return null;
            }
        }

        carrito.push(NewItem)

        renderCarrito()
}



function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `

        <td class="table__product">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">X</button>
        </td>
        <td class="table__price">
            ${item.precio}
        </td>
    `

        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)

    })
    CarritoTotal()
}

function CarritoTotal(){
    let Total = 0
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio*item.cantidad
    })
    
    itemCartTotal.innerHTML = `Total $${Total}`
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){

        if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout( function(){
        alert.classList.add('remove')
    }, 500)
        alert.classList.remove('remove')


    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value
            CarritoTotal()
        }
    })
}

