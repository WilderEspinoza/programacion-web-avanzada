export class Button {
    constructor(public label: string) {}    
    
    onClick(): void {
        console.log(`Presionando: ${this.label}`)
    }

    render(): string {
        return `<button id="saveBtn">${this.label}</button>`;
    }
}   