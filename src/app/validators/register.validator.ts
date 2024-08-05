import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function registerValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const password = form.get("password")?.value;
        const passwordConfirm = form.get("passwordConfirm")?.value;
        return password !== passwordConfirm ? { error: "test" } : null;
    };
}

export function getErrorMessage(control: AbstractControl): string | undefined {
    if (control.hasError("required")) {
        return "This field is required";
    }
    if (control.hasError("minlength")) {        
        return `More than ${control.errors?.["minlength"]?.["requiredLength"]}`;
    }
    if (control.hasError("maxlength")) {
        return `Less than ${control.errors?.["maxlength"]?.["requiredLength"]}`;
    }
    if (control.hasError("email")) {
        return `Email error`;
    }
    if (control.hasError("pattern")) {
        return `Pattern error`;
    }
    return undefined
}

