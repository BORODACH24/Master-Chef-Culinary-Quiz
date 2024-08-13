import { Injectable, OnInit } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AudioService {
    private trackNum = 0;
    private volume = 0.5;
    private muted = false;
    private withMusic = false;
    private withSound = true;
    private audio = new Audio();
    private tracks = [
        "/music/Muse - Plug In Baby.mp3",
        "/music/M83 feat. Susanne Sundfor - Oblivion.mp3",
        "/music/Rick Astley - Never Gonna Give You Up.mp3",
    ];
    private resultSounds = [
        "/music/fail.mp3",
        "/music/congratulations-1.mp3",
        "/music/congrstulations-2.mp3",
    ];

    constructor() {
        console.log("OnInit Audio");

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

    public get getVolume(): number {
        return this.volume * 100;
    }
    public get getMuted(): boolean {
        return this.muted;
    }
    public get getWithMusic(): boolean {
        return this.withMusic;
    }
    public get getWithSound(): boolean {
        return this.withSound;
    }

    public set setVolume(_value: number) {
        if (_value > 0 && _value < 100) {
            this.volume = _value / 100;
            this.audio.volume = this.volume;
        }
    }
    public set setMuted(_value: boolean) {
        this.muted = _value;
        this.audio.muted = _value;
    }
    public set setWithMusic(_value: boolean) {
        this.withMusic = _value;
        if (this.withMusic) {
            this.play();
        } else {
            this.audio.pause();
        }
    }
    public set setWithSound(_value: boolean) {
        this.withSound = _value;
    }

    public buttonSound(): void {
        if (this.withSound) {
            const sound = new Audio("/music/ui-button-click.mp3");
            sound.volume = 1;
            sound.addEventListener("canplaythrough", event => {
                sound.play();
            });
        }
    }

    public toggleSound(): void {
        if (this.withSound) {
            const sound = new Audio("/music/ui-toggle-click.mp3");
            sound.volume = 1;
            sound.addEventListener("canplaythrough", event => {
                sound.play();
            });
        }
    }

    public achivementSound(): void {
        if (this.withSound) {
            const sound = new Audio("/music/achivement-sound.mp3");
            sound.volume = 1;
            sound.addEventListener("canplaythrough", event => {
                sound.play();
            });
        }
    }

    public resultSound(index: number): void {
        if (this.withSound) {
            const sound = new Audio(this.resultSounds[index]);
            sound.volume = 1;
            sound.addEventListener("canplaythrough", event => {
                sound.play();
            });
        }
    }

    public play(): void {
        if (this.withMusic) {
            this.audio.src = this.tracks[this.trackNum];
            this.audio.addEventListener("canplaythrough", event => {
                this.audio.play();
            });
        }
    }
}
