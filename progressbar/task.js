const xhr = new XMLHttpRequest();
const inputWrapperDesc = document.querySelector('.input__wrapper-desc');
const inputFile = document.querySelector('input');
const progressBar = document.querySelector("progress");

inputFile.addEventListener('change', () => {
    inputWrapperDesc.innerText = inputFile.files[0].name;
    console.log(inputFile.files[0].size)
    const formData = new FormData(document.forms.register);
    send.addEventListener('click', (e) => {
        e.preventDefault();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
        xhr.send(formData);
    })
})

xhr.upload.addEventListener("progress", (event) => {
    progressBar.value = event.loaded;
});