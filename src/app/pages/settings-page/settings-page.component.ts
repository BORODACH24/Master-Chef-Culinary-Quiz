import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";
import { TuiSliderModule, TuiToggleModule } from "@taiga-ui/kit";
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
    TopBarComponent
],
    templateUrl: "./settings-page.component.html",
    styleUrl: "./settings-page.component.scss",
})
export class SettingsPageComponent implements OnInit {
    public settingsForm = new FormGroup({
        volume: new FormControl(50),
        muted: new FormControl(false),
        playMusic: new FormControl(true),
        playSound: new FormControl(true),
    });

    private audio = inject(BackendService).audio;

    public ngOnInit(): void {
        this.settingsForm.controls["volume"].setValue(this.audio.getVolume);
        this.settingsForm.controls["muted"].setValue(!this.audio.getMuted);
        this.settingsForm.controls["playMusic"].setValue(
            this.audio.getPlayMusic
        );
        this.settingsForm.controls["playSound"].setValue(
            this.audio.getPlaySound
        );

        this.settingsForm.controls["volume"].valueChanges.subscribe(
            (data) => (this.audio.setVolume = data as number)
        );
        this.settingsForm.controls["muted"].valueChanges.subscribe(
            (data) => (this.audio.setMuted = !data as boolean)
        );
        this.settingsForm.controls["playMusic"].valueChanges.subscribe(
            (data) => (this.audio.setPlayMusic = data as boolean)
        );
        this.settingsForm.controls["playSound"].valueChanges.subscribe(
            (data) => (this.audio.setPlaySound = data as boolean)
        );
    }
}
