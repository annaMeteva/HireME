export function salaryConcat(
    salary1: string,
    salary2: string
): string {
    let salary: string = "$" + salary1;
    if (salary2 != '') {
        salary += "-$" + salary2;
    }
    return salary.trim();
}