import { AbstractControl, FormGroup } from "@angular/forms";

export const PasswordValidator = (password: string, confirmPassword: string) => {
    return (formGroup: AbstractControl) => {
        const passwordControl = (formGroup as FormGroup).controls[password];
        const confirmPasswordControl = (formGroup as FormGroup).controls[confirmPassword];

        if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
            return;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
            confirmPasswordControl.setErrors(null);
        }
    };
}