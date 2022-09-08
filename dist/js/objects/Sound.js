"use strict";
class Sound {
    constructor(audio) {
        this.audio = new Audio(audio);
    }
    play() {
        this.audio.play();
    }
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.remove();
    }
}
