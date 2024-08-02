import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";

export function registerValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const password = form.get("password")?.value;
        const passwordConfirm = form.get("passwordConfirm")?.value;
        return password !== passwordConfirm ? { error: "test" } : null;
    };
}
