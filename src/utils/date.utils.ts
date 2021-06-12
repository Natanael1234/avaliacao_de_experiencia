export function curDateWithoutTimezone() {
    const date = new Date();
    return new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000));
}