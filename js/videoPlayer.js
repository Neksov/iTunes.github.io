export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector(".video-player");
  const videoButtonPlay = document.querySelector(".video-button__play");
  const videoButtonStop = document.querySelector(".video-button__stop");
  const videoProgress = document.querySelector(".video-progress");
  const videoButtonPassed = document.querySelector(".video-time__passed");
  const videoButtonTotal = document.querySelector(".video-time__total");
  const videoVolume = document.querySelector(".video-volume");
  const videoFullscreen = document.querySelector(".video-button__fullscreen ");
  const videoVolumeIconUp = document.querySelector(".video-icon-up");
  const videoVolumeIconDown = document.querySelector(".video-icon-down");

  const toggleIcon = () => {
    // меняем кнопку плей на паузу
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.add("fa-pause");
      videoButtonPlay.classList.remove("fa-play");
    }
  };
  const togglePlay = () => {
    //запуск плеера по нажатию на сам плеер
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };
  const stopPlay = () => {
    //кнопка стоп
    videoPlayer.pause();
    videoPlayer.currentTime = 0; //возвращаем время видио в начльно время
  };
  const addZero = (n) => (n < 10 ? "0" + n : n); //добавляем ноль в начало времени

  videoPlayer.addEventListener("click", togglePlay);
  videoButtonPlay.addEventListener("click", togglePlay);

  //запуск togglуIcone
  videoPlayer.addEventListener("play", toggleIcon);
  videoPlayer.addEventListener("pause", toggleIcon);

  videoButtonStop.addEventListener("click", stopPlay);

  videoPlayer.addEventListener("timeupdate", () => {
    //событие когда обновляется время, время меняется
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100; //двигаем прогрессбар

    let minutePassed = Math.floor(currentTime / 60); //округляем до сотых
    let secondPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60); //округляем до сотых
    let secondTotal = Math.floor(duration % 60);

    videoButtonPassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondPassed
    )}`;
    videoButtonTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondTotal
    )}`;
  });

  videoProgress.addEventListener("input", () => {
    //реализуем процесс перемотки
    const duration = videoPlayer.duration; //получеам сколько прошло видео
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  //развертывание видио на весь экран
  videoFullscreen.addEventListener("click", () => {
    videoPlayer.requestFullscreen();
  });
  videoVolume.addEventListener("input", () => {
    videoPlayer.volume = videoVolume.value / 100;
  });

  videoVolumeIconUp.addEventListener("click", () => {
    videoVolume.value = 100;
  });
  videoVolumeIconDown.addEventListener("click", () => {
    videoVolume.value = 0;
  });

  videoPlayer.volume = 0.5; //изначально громкость будет посередине
  videoVolume.value = videoPlayer.volume * 100; // чтобы позиция оставалась исходной
};