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
printBadge()