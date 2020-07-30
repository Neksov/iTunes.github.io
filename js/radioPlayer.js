export const radioPlayerInit = () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const audio = new Audio();
  const radioVolume = document.querySelector('.radio-volume');
  const radioIconDown = document.querySelector('.radio-icon-down');
  const radioIconUp = document.querySelector('.radio-icon-up');

  let prevVolume = 0;
  audio.type = 'audio/aac';
  radioStop.disabled = true; //блокируем кнопку плей

  const changeIconPlay = () => { //меняем иконку плей на стоп 
    if (audio.paused) {
      radio.classList.remove('play'); //анимация динамика 
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play'); //анимация динамика 
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');

    }
  }
  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select')); //убираем серый ободок после выбора следующей станции
    elem.classList.add('select');
  };
  radioNavigation.addEventListener('change', event => {
    const target = event.target;
    const parrent = target.closest('.radio-item');
    radioStop.disabled = false; //разблокируем кнопку плей
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
    selectItem(parrent);

    const title = parrent.querySelector('.radio-name').textContent; //меняем зоголовок на выбранную станцию 
    radioHeaderBig.textContent = title;

    const urlimg = parrent.querySelector('.radio-img').src; //меняем картику на выбранную станцию 
    radioCoverImg.src = urlimg;
  });
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });

  radioVolume.addEventListener("input", () => { //добавляем аудио полосу
    audio.volume = radioVolume.value / 100;
  });

  radioIconDown.addEventListener('click', () => {
    if (audio.volume) {
      audio.volume = 0;
      radioVolume.value = 0
    }
  });
  radioIconUp.addEventListener('click', () => {
    if (audio.volume) {
      audio.volume = 1;
      radioVolume.value = 100;
    }
  });
};