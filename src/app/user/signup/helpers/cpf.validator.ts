import { FormControl } from "@angular/forms";

export function CustomCPFValidator(control: FormControl) {
    let cpf = control.value;
    if (!cpf) return;
    if ((cpf = cpf.replace(/[^\d]/g, "")).length != 11) {
        return { cpf: true };
    }

    if (
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"
    ) {
        return { cpf: true };
    }

    let rest;

    let sum = 0;

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf[i - 1]) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
        rest = 0;
    }

    if (rest != parseInt(cpf[9])) {
        return { cpf: true };
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf[i - 1]) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
        rest = 0;
    }

    if (rest != parseInt(cpf[10])) {
        return { cpf: true };
    }

    return null;
}
