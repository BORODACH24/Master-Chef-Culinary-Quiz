import { Component, Input } from "@angular/core";
import { Achivement } from "../../interfaces/achivements";
import { TuiSvgModule } from "@taiga-ui/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-achivement-plate",
    standalone: true,
    imports: [TuiSvgModule, CommonModule],
    templateUrl: "./achivement-plate.component.html",
    styleUrl: "./achivement-plate.component.scss",
})
export class AchivementPlateComponent {
    @Input() public achivement?: Achivement
}
