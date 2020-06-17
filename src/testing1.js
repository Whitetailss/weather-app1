const product = {

name: 'tolberone',
origin: 'china',
stock: 23
}

const transaction = (cost, {name = 'dreyer', origin} = {}) => {
    console.log(cost, name, origin)
}

transaction (200, product)