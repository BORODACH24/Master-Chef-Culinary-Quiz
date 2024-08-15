import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TuiSvgModule } from "@taiga-ui/core";
import { BackendService } from "../../services/backend.service";

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
    @Input() public buttonAction = this.action;

    constructor(
        private readonly route: ActivatedRoute,
        private backend: BackendService,
        private router: Router
    ) {}
    
    public action(): void {
        this.router.navigate([".."], { relativeTo: this.route });
    }
    public buttonSound(): void {
        this.backend.audio.buttonSound();
    }
}
