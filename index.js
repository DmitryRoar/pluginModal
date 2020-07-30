// const modal = $.modal({
//     title: 'dynamic title',
//     closable: true,
//     width: `500px`,
//     content: `<p>dynamic text</p>`,
//     footerButtons: [
//         {text: 'ok', type: 'primary', handler() {
//             modal.close()
//         }},
//         {text: 'cancel', type: 'danger', handler() {
//             modal.close()
//         }}
//     ]
// })

let products = [
    {id: 1, title: 'RAZER Kraken', price: 7490, img: 'https://static.onlinetrade.ru/img/items/b/garnitura_razer_kraken_black_1271512_1.jpg'},
    {id: 2, title: 'RAZER Huntsman Tournament Edition', price: 11490 , img: 'https://i.ytimg.com/vi/jAPTPMtDtHg/maxresdefault.jpg'},
    {id: 3, title: 'RAZER Blackwidow', price: 7600, img: 'https://assets2.razerzone.com/images/blackwidow-2019/BlackWidow2019_OGimage-1200x630.jpg'}
]

const toHTML = product => `
    <div class="col">
        <div class="card">
            <img src="${product.img}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${product.id}">Посмотреть подробнее</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${product.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    document.querySelector('#products').innerHTML = products.map(toHTML).join('')
}
render()

const priceModal = $.modal({
    title: 'Product price',
    closable: true,
    width: `400px`,
    footerButtons: [
        {text: 'close', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})

document.body.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const product = products.find(f => f.id === id)

    switch (btnType) {
        case 'price':
            priceModal.setContent(`<p>${product.title} стоит: <strong>${product.price}₽</strong></p>`)
            priceModal.open()
            break
        case 'remove':
            $.confirm({
                title: 'Удаление элемента',
                content: `Вы собираетесь удалить <strong>${product.title}</strong>`
            }).then(() => {
                products = products.filter(p => p.id !== id)
                render()
            }).catch(() => {
                console.log('cancel')
            })
    }
})


console.log('%cenjoy!', 'color: #6A8EAE')
