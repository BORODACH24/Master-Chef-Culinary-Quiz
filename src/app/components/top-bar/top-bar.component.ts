import { Component, Input, inject } from "@angular/core";
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
    @Input() public buttonAction = () => {
        this.router.navigate([".."], { relativeTo: this.route });
    };
    @Input() public label = "";

    constructor(
        private readonly route: ActivatedRoute,
        private router: Router
    ) {}
}
