import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TuiRootModule, TuiDialogModule, TuiAlertModule } from "@taiga-ui/core";
import { TuiPushModule, TuiTilesModule } from "@taiga-ui/kit";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiPushModule, TuiTilesModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {}
