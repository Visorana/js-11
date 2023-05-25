const xhr = new XMLHttpRequest();
const inputWrapperDesc = document.querySelector('.input__wrapper-desc');
const inputFile = document.querySelector('input');
const progressBar = document.querySelector("progress");

inputFile.addEventListener('change', () => {
    inputWrapperDesc.innerText = inputFile.files[0].name;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    loadFile(inputFile.files[0]);
});

xhr.upload.addEventListener("progress", (e) => {
    progressBar.value = e.loaded / e.total;
});

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            console.log(`The request has been completed successfully. Status code: ${xhr.status}, status response: ${xhr.responseText}`);
        } else {
            console.log(`There has been an error with the request. Status code: ${xhr.status}, status response: ${xhr.responseText}`);
        };
    };
});

function loadFile(data) {
    const formData = new FormData();
    for (const key in data) {
        console.log(key, data[key])
        formData.append(key, data[key]);
    }
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData); 
}