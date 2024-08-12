import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-top-bar",
    standalone: true,
    imports: [],
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
        private router: Router
    ) {}
}
