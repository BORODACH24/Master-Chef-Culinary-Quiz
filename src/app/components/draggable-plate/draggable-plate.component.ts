import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    Input,
    OnInit,
} from "@angular/core";

@Component({
    selector: "app-draggable-plate",
    standalone: true,
    imports: [],
    templateUrl: "./draggable-plate.component.html",
    styleUrl: "./draggable-plate.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggablePlateComponent implements OnInit {
    @Input() public class = "draggable-plate";
    private element?: any;

    constructor(private elementRef: ElementRef, private destroy: DestroyRef, private cdr: ChangeDetectorRef) {}
    public ngOnInit(): void {        
        this.element = this.elementRef.nativeElement;
        
    }
    public onDragStart(event: any){
        // event.preventDefault();
        console.log("onDragStart", event.target);
        event.target.style.position = "absolute";
        
        this.element.style.zindex = 5;
        this.element.style.top = event.pageY;
        this.element.style.left = event.pageX;
    }
    public onDrag(event: any){
        // event.preventDefault();
        console.log(event.pageX, event.pageY);
        if (event.pageX !=0){
            this.element.style.top = event.pageY;

            this.element.style.left = event.pageX;
        }
    }
    public onDragEnd(event: any){
        console.log("onDragEnd", event);
        console.log("onDragEnd: ", event.pageX, event.pageY);
        console.log("position", this.element.style.position);
        this.element.style.top = event.pageY;
        this.element.style.left = 200;
        this.cdr.markForCheck();
    }
}
