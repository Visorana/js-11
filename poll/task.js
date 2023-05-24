const xhr = new XMLHttpRequest();
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const poll = document.querySelector('.poll');

xhr.onload = () => {
    let data = JSON.parse(xhr.response);
    pollTitle.innerText = data.data.title;
    Object.entries(data.data.answers).forEach(([key, value]) => {
        let answer = document.createElement('button');
        answer.classList = 'poll__answer';
        answer.innerText = value;
        pollAnswers.insertAdjacentElement('beforeEnd', answer);
    });
    pollAnswers.classList.add('poll__answers_active');
    let buttons = document.querySelectorAll('.poll__answer');
    buttons.forEach.call(buttons, (button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Спасибо, ваш голос засчитан!');
            xhr.open( 'POST', 'https://students.netoservices.ru/nestjs-backend/poll' );
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(`vote=${data.id}&answer=${[...buttons].indexOf(button)}`);
            xhr.onload = () => {
                data = JSON.parse(xhr.response);
                pollAnswers.classList.remove('poll__answers_active');
                let stats = document.createElement('div');
                poll.insertAdjacentElement('beforeEnd', stats);
                Object.entries(data.stat).forEach(([key, value]) => {
                    let stat = document.createElement('div');
                    stat.innerText = `${value.answer}: ${value.votes}%`;
                    stats.insertAdjacentElement('beforeEnd', stat);
                });
            };
        });
    });
};

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();