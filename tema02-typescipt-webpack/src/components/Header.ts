export class Header {
    constructor(public title: string) {}

    render(): string {
        return `<h1>${this.title}</h1>`;
    }
}