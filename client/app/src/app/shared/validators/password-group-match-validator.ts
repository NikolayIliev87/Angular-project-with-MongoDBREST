import { FormGroup, ValidatorFn } from "@angular/forms";

export function passwordsMatchValidator(controlName1: string, controlName2: string): ValidatorFn {
    return (control) => {
        const group = control as FormGroup;
        const pass1 = group.get(controlName1);
        const pass2 = group.get(controlName2);

        return pass1?.value === pass2?.value ? null : {passwordsMatchValidator : true};
    }
}