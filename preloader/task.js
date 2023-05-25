const xhr = new XMLHttpRequest();
const items = document.getElementById('items');
const loader = document.getElementById('loader');

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            console.log(`The request has been completed successfully. Status code: ${xhr.status}, status response: ${xhr.responseText}`);
            loader.classList.remove('loader_active');
        } else {
            console.log(`There has been an error with the request. Status code: ${xhr.status}, status response: ${xhr.responseText}`);
        };
    };
});

xhr.onload = () => {
    let data = JSON.parse(xhr.response);
    loadExchangeData(data); 
};

function loadExchangeData(data) {
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