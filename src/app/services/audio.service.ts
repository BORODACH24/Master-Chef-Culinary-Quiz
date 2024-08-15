import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AudioService {
    private trackNum = 0;
    private musicVolume = 0.5;
    private soundVolume = 0.5;
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
        "/music/level-win-6416.mp3",
    ];

    constructor() {
        // console.log("OnInit Audio");

        this.audio.addEventListener("ended", () => {
            this.trackNum++;
            if (this.trackNum > this.tracks.length) {
                this.trackNum = 0;
            }
            this.audio.src = this.tracks[this.trackNum];
            this.audio.addEventListener("canplaythrough", this.audio.play);
        });
    }

    public get getMusicVolume(): number {
        return this.musicVolume * 100;
    }
    public get getSoundVolume(): number {
        return this.soundVolume * 100;
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

    public set setMusicVolume(_value: number) {
        if (_value > 0 && _value < 100) {
            this.musicVolume = _value / 100;
            this.audio.volume = this.musicVolume;
        }
    }
    public set setSoundVolume(_value: number) {
        if (_value > 0 && _value < 100) {
            this.soundVolume = _value / 100;
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
        this.playSound("/music/ui-button-click.mp3");
    }

    public toggleSound(): void {
        this.playSound("/music/ui-toggle-click.mp3");
    }

    public achivementSound(): void {
        this.playSound("/music/achivement-sound.mp3");
    }

    
    public resultSound(index: number): void {
        if (this.withSound) {
            const sound = new Audio(this.resultSounds[index]);
            sound.volume = this.soundVolume;
            sound.addEventListener("canplaythrough", sound.play);
        }
    }
    
    public play(): void {
        if (this.withMusic) {
            this.audio.src = this.tracks[this.trackNum];
            this.audio.addEventListener("canplaythrough", this.audio.play);
        }
    }
    
    private playSound(src: string): void{
        if (this.withSound) {
            const sound = new Audio(src);
            sound.volume = this.soundVolume;
            sound.addEventListener("canplaythrough", sound.play);
        }
    }
}
