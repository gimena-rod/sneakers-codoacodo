
const tableHTML = document.getElementById('table')

tableHTML.innerHTML += `
    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th> </th>
                    </tr>
                </thead>
`
const productsStorage = localStorage.getItem('products')
let products = JSON.parse(productsStorage)

//Para Vaciar el carrito//
const vaciarCart = document.getElementById('cleanCart')
vaciarCart.addEventListener('click', () =>{
  console.log('vaciarCart') 
    localStorage.clear();
    products = [];
    print(products);

})

const badgeHTML = document.getElementById('badge')

function printBadge(){
    const products = localStorage.getItem('products')
    const productsParse = JSON.parse(products);

    const totalQuantity = productsParse.reduce((prev, current) => {
        prev += current.quantity;
        return prev;
    }, 0)
    badgeHTML.innerHTML = totalQuantity;
}

//Para editar los botones de - y +//
const increment = (id)=>{
    const product = products.find((product)=> product.id == id);
    product.quantity += 1;
    product.subTotal = +(product.subTotal + product.price).toFixed(2);
    
    localStorage.setItem('products', JSON.stringify(products));

    print(products);
}

const decrease = (id)=>{
    const product = products.find((product)=> product.id == id);
    if (product.quantity <=1) {
        deleteProduct(id);
    }

    product.quantity -= 1;
    product.subTotal = +(product.subTotal - product.price).toFixed(2);

    console.log(`disminuir ${id}`, { product, products });
    localStorage.setItem('products', JSON.stringify(products));
    //para que no tenga numeros negativos//

    print(products);
}

// tableHTML.innerHTML += `
//     <tbody>
//                     <tr>
//                         <td class="cart-product-img"><img src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/390028/01/sv01/fnd/ARG/fmt/png" alt="Zapatilla hombre" height="200" width="200"></td>
//                         <td>${zapa}$95000</td>
//                         <td>1</td>
//                         <td>$95000</td>
//                     </tr>
//                     <tr>
//                         <td><img src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/390028/01/sv01/fnd/ARG/fmt/png" alt="Zapatilla hombre" height="200" width="200"></td>
//                         <td>$40000</td>
//                         <td>1</td>
//                         <td>$40000</td>
//                     </tr>
//                     <tr>
//                         <td><img src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/390028/01/sv01/fnd/ARG/fmt/png" alt="Zapatilla hombre" height="200" width="200"></td>
//                         <td>$120000</td>
//                         <td>1</td>
//                         <td>$120000</td>
//                     </tr>
//     </tbody>
// `
function deleteProduct(id){
    const newCart= products.filter((product) => product.id !=id)
    localStorage.setItem("products", JSON.stringify(newCart))

    products = newCart;

    print(products);
}

 tableHTML.innerHTML += `<tbody id="tbody">`
tableHTML.innerHTML += ` </tbody>`

const print = (productCart)=>{
    if (productCart == null || productCart.length == 0){
        const container = document.getElementById('main-cart')
        container.innerHTML = `<h1 class="text-info">TU CARRITO ESTÁ VACIO</h1>`
    } else {
        
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        let total = 0;
        productCart.forEach(({ id, image, price, quantity, subTotal})=> {
            tbody.innerHTML += `
            <tr>            
            <td><img src=${image} alt="Zapatilla mujer" height="200" width="200"></td>
            <td><p>$${price}</p></td>
            <td><button class= "btn" onclick="decrease(${id})"> - </button>${quantity}<button class= "btn" onclick="increment(${id})"> + </button height="10px" width="10px"></td>
            <td><p>$${subTotal}</p></td>
            <td><button onclick="deleteProduct(${id})" class= "btn-delete"><i class="bi bi-trash"></i></button></td>
            </tr>
            `
            total = +(total + subTotal).toFixed(2);
        })
        tbody.innerHTML += `<tr>
            <td colspan="3">Total</td>
            <td>${total}</td>
        </tr>`;
    }
}

printBadge()
print(products);