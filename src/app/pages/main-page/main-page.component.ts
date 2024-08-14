import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BackendService } from "../../services/backend.service";
import { achivements } from "../../../../public/acvivements";
import { rounds } from "../../../../public/questions";
import { Round } from "../../interfaces/questions";
import { ranks } from "../../../../public/ranks";
import { Rank } from "../../interfaces/rank";

@Component({
    selector: "app-main-page",
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
    constructor(private backend: BackendService) {}
    public ngOnInit(): void {
        this.backend.audio.play();
        this.backend.achivements.achivements = achivements;
        for (
            let index = 0;
            index <= rounds[rounds.length - 1].difficulty;
            ++index
        ) {
            this.backend.difficulties.push(index + 1);
        }
        let allPoints = 0;
        rounds.forEach(
            (item: Round) =>
                (allPoints += item.questions.length * (item.difficulty + 1))
        );
        this.backend.ranks = ranks as Rank[];

        this.backend.ranks.forEach((item, index) => {
            item.points = Number(
                (
                    allPoints *
                    (index / (this.backend.ranks.length-1))
                ).toFixed()
            );
        });
        // console.log("allPoints", allPoints);
        // console.log("ranks", this.backend.ranks);
    }
}
