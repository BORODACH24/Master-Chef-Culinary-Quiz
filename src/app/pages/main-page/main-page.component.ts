import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BackendService } from "../../services/backend.service";
import { achivements } from "../../../../public/acvivements";


@Component({
    selector: "app-main-page",
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
    private audio = inject(BackendService).audio;
    private achive = inject(BackendService).achivements;
    public ngOnInit(): void {
        this.audio.play();
        this.achive.achivements = achivements
    }
}
