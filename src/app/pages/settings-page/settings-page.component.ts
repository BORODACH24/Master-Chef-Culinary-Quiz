import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";
import {
    TuiFilterModule,
    TuiSliderModule,
    TuiToggleModule,
} from "@taiga-ui/kit";
import { rounds } from "../../../../public/questions";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: "app-settings-page",
    standalone: true,
    imports: [
        TuiSliderModule,
        ReactiveFormsModule,
        TuiButtonModule,
        RouterModule,
        TuiToggleModule,
        TuiSvgModule,
        TopBarComponent,
        TuiFilterModule,
    ],
    templateUrl: "./settings-page.component.html",
    styleUrl: "./settings-page.component.scss",
})
export class SettingsPageComponent implements OnInit {
    public allDifficulties: number[] = [];
    public settingsForm = new FormGroup({
        filters: new FormControl([]),
        musicVolume: new FormControl(50),
        soundVolume: new FormControl(50),
        muted: new FormControl(false),
        withMusic: new FormControl(true),
        withSound: new FormControl(true),
    });
    
    constructor(private backend: BackendService, private destroy: DestroyRef) {}
    
    // public badgeHandler: TuiHandler<[], number> = (item) => 3;
    
    public ngOnInit(): void {
        // console.log(rounds[rounds.length - 1]);
        for (
            let index = 0;
            index <= rounds[rounds.length - 1].difficulty;
            ++index
        ) {
            this.allDifficulties.push(index + 1);
        }
        this.settingsForm.controls["filters"].setValue(
            this.backend.difficulties as []
        );
        this.settingsForm.controls["musicVolume"].setValue(
            this.backend.audio.getMusicVolume
        );
        this.settingsForm.controls["soundVolume"].setValue(
            this.backend.audio.getSoundVolume
        );
        this.settingsForm.controls["muted"].setValue(
            !this.backend.audio.getMuted
        );
        this.settingsForm.controls["withMusic"].setValue(
            this.backend.audio.getWithMusic
        );
        this.settingsForm.controls["withSound"].setValue(
            this.backend.audio.getWithSound
        );

        this.settingsForm.controls["filters"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((data) => (this.backend.difficulties = data as number[]));
        this.settingsForm.controls["musicVolume"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((data) => (this.backend.audio.setMusicVolume = data as number));
        this.settingsForm.controls["soundVolume"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((data) => (this.backend.audio.setSoundVolume = data as number));
        this.settingsForm.controls["muted"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(
                (data) => (this.backend.audio.setMuted = !data as boolean)
            );
        this.settingsForm.controls["withMusic"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(
                (data) => (this.backend.audio.setWithMusic = data as boolean)
            );
        this.settingsForm.controls["withSound"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(
                (data) => (this.backend.audio.setWithSound = data as boolean)
            );
    }
    public toggleSound(): void {
        this.backend.audio.toggleSound();
    }
}
