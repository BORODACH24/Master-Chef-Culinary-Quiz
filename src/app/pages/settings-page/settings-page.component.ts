import { Component, OnInit, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";
import {
    TuiFilterModule,
    TuiSliderModule,
    TuiToggleModule,
} from "@taiga-ui/kit";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { BackendService } from "../../services/backend.service";
import { rounds } from "../../../../public/questions";
import { TuiHandler } from "@taiga-ui/cdk";

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
    public allDifficulties: Number[] = [];
    public settingsForm = new FormGroup({
        filters: new FormControl([]),
        volume: new FormControl(50),
        muted: new FormControl(false),
        withMusic: new FormControl(true),
        withSound: new FormControl(true),
    });
    public badgeHandler: TuiHandler<[], number> = item => 3;

    constructor(private backend: BackendService, private destroy: DestroyRef) {}

    public ngOnInit(): void {
        console.log(rounds[rounds.length - 1]);
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
        this.settingsForm.controls["volume"].setValue(
            this.backend.audio.getVolume
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
            .subscribe(data => (this.backend.difficulties = data as Number[]));
        this.settingsForm.controls["volume"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(data => (this.backend.audio.setVolume = data as number));
        this.settingsForm.controls["muted"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(
                data => (this.backend.audio.setMuted = !data as boolean)
            );
        this.settingsForm.controls["withMusic"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(
                data => (this.backend.audio.setWithMusic = data as boolean)
            );
        this.settingsForm.controls["withSound"].valueChanges
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(
                data => (this.backend.audio.setWithSound = data as boolean)
            );
    }
    public toggleSound(): void {
        this.backend.audio.toggleSound();
    }
}
