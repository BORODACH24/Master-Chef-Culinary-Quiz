import { Component, OnInit } from "@angular/core";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { Achivement } from "../../interfaces/achivements";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: "app-achivements-page",
    standalone: true,
    imports: [TopBarComponent],
    templateUrl: "./achivements-page.component.html",
    styleUrl: "./achivements-page.component.scss",
})
export class AchivementsPageComponent implements OnInit {
    public achivements = new Map<string, Achivement>()
    constructor(private backend: BackendService){}
    public ngOnInit(): void {
        this.achivements = this.backend.achivements.achivements
    }
}