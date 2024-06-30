const products = [
    {
        id: 1,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/393496/01/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 2,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/390028/01/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 3,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/394170/06/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 4,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/389615/05/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 5,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/376855/12/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 6,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/108001/01/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
];
//Para que aparezcan las alertas//
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

const productsHTML = document.getElementById('products')
// testID.innerHTML += `<article class="producto">
//                 <img src=${products.image} alt="Zapatilla mujer">
//                 <h2>${products.name}</h2>
//                 <p>${products.description} ${products.price}</p>
//                 <a href="#">Ver más</a>
//             </article>`

//icon arriba del cart//

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

function agregarCarrito(id){
    const product = products.find((product)=> product.id == id);
    const productsStorage = localStorage.getItem('products');

    if (productsStorage == null) {
        console.log('if')
        const cart = [ {
            id: product.id,
            image: product.image,
            price: product.price,
            quantity: 1,
            subTotal: product.price,
        } ];
        localStorage.setItem('products', JSON.stringify(cart));
    } else {
        console.log('else')
        const productsParse = JSON.parse(productsStorage);
        const productIndex = productsParse.findIndex((productParse) => productParse.id == id)
        if(productIndex == -1) {
            const cart = [...productsParse, {
                id: product.id,
                image: product.image,
                price: product.price,
                quantity: 1,
                subTotal: product.price,
            } ]
            localStorage.setItem('products', JSON.stringify(cart) );

        } else {
            const productMap = productsParse.map((productParse) => {
                if(productParse.id == id) {
                    return {
                        id: productParse.id,
                        image: productParse.image,
                        price: productParse.price,
                        quantity: productParse.quantity + 1,
                        subTotal: +(productParse.subTotal + productParse.price).toFixed(2)
                    }
                }
    
                return productParse;
            })
            localStorage.setItem('products', JSON.stringify(productMap));
        }

    }
    toastr.success("Tu producto fue añadido al carrito correctamente", "Producto Agregado");
    printBadge();
}
products.forEach(({id, image, name, description, price})=> {
    productsHTML.innerHTML += `<article class="producto">
                 <img src=${image} alt="Zapatilla mujer">
                <h2>${name}</h2>
                <p>${description}</p>
                <p>${price}</p>
                <a href="#">Ver más</a>
                <button onclick="agregarCarrito(${id})" class="btn">Agregar</button>
                </article>`
})

printBadge()