import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { TuiValidationError } from "@taiga-ui/cdk";

export function registerValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const password = form.get("password")?.value;
        const passwordConfirm = form.get("passwordConfirm")?.value;
        return password !== passwordConfirm ? { error: "test" } : null;
    };
}

export function getErrorMessage(control: AbstractControl): TuiValidationError | null {
    if(!control.touched){
        return null;
    }
    if (control.hasError("required")) {
        return new TuiValidationError("This field is required");
    }
    if (control.hasError("minlength")) {        
        return new TuiValidationError(`More than ${control.errors?.["minlength"]?.["requiredLength"]}`);
    }
    if (control.hasError("maxlength")) {
        return new TuiValidationError(`Less than ${control.errors?.["maxlength"]?.["requiredLength"]}`);
    }
    if (control.hasError("email")) {
        return  new TuiValidationError(`Email error`);
    }
    if (control.hasError("pattern")) {
        return  new TuiValidationError(`Pattern error`);
    }
    return null
}

