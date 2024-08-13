import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendService } from "../../services/backend.service";
import { TuiSvgModule } from "@taiga-ui/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-top-bar",
    standalone: true,
    imports: [TuiSvgModule, CommonModule],
    templateUrl: "./top-bar.component.html",
    styleUrl: "./top-bar.component.scss",
})
export class TopBarComponent {
    @Input() public buttonText = "Back";
    @Input() public label = "";
    @Input() public buttonAction = (): void => {
        this.router.navigate([".."], { relativeTo: this.route });
    };

    constructor(
        private readonly route: ActivatedRoute,
        private backend: BackendService,
        private router: Router
    ) {
        console.log("label: ", this.label);
        console.log("buttonText: ", this.buttonText);
    }
    public buttonSound(): void {
        this.backend.audio.buttonSound();
    }
}
