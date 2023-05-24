const xhr = new XMLHttpRequest();
const items = document.getElementById('items');
const loader = document.getElementById('loader');

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState ==xhr.DONE) {
        loader.classList.remove('loader_active');
    };
});

xhr.onload = () => {
    let data = JSON.parse(xhr.response);
    data = data.response.Valute;
    Object.entries(data).forEach(([key, value]) => {
        let item = document.createElement('div');
        item.classList = 'item';

        let itemCode = document.createElement('div');
        itemCode.classList = 'item__code';
        itemCode.innerText = key;

        let itemValue = document.createElement('div');
        itemValue.classList = 'item__value';
        itemValue.innerText = value.Nominal;

        let itemCurrency = document.createElement('div');
        itemCurrency.classList = 'item__currency';
        itemCurrency.innerText = value.Name;

        items.insertAdjacentElement('afterBegin', item);
        item.insertAdjacentElement('afterBegin', itemCurrency);
        item.insertAdjacentElement('afterBegin', itemValue);
        item.insertAdjacentElement('afterBegin', itemCode);
    });
};

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();