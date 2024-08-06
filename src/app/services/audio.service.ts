import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AudioService {
    public trackNum = 0;

    private volume = 0.5;
    private muted = false;
    private playMusic = false;
    private playSound = true;
    private loop = false;
    private audio = new Audio();
    private tracks = [
        "/music/Muse - Plug In Baby.mp3",
        "/music/M83 feat. Susanne Sundfor - Oblivion.mp3",
        "/music/Rick Astley - Never Gonna Give You Up.mp3",
    ];

    public get getVolume() {
        return this.volume * 100
    }

    public set setVolume(_value: number) {
        if (0 < _value && _value < 100) {
            this.volume = _value / 100;
            this.audio.volume = this.volume
        }
    }

    public get getMuted() {
        return this.muted
    }

    public set setMuted(_value: boolean) {
        this.muted = _value
        this.audio.muted = _value
    }

    public get getPlayMusic() {
        return this.playMusic
    }

    public set setPlayMusic(_value: boolean) {
        this.playMusic = _value
        if(this.playMusic){
            this.play()
        }else{
            this.audio.pause()
        }
    }

    public get getPlaySound() {
        return this.playSound
    }

    public set setPlaySound(_value: boolean) {
        this.playSound = _value
    }

    constructor() {
        this.audio.addEventListener("ended", event => {
            this.trackNum++;
            if (this.trackNum > this.tracks.length) {
                this.trackNum = 0;
            }
            this.audio.src = this.tracks[this.trackNum];
            this.audio.addEventListener("canplaythrough", event => {
                this.audio.play();
            });
        });
    }

    public play() {
        if(this.playMusic){
            this.audio.src = this.tracks[this.trackNum];
            this.audio.addEventListener("canplaythrough", event => {
                this.audio.play();
            });
        }
    }
}
