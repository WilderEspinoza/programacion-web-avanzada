export interface Component {
    render() : string;
}

export class Footer implements Component {
    render(): string {
        return `<footer>Aprende a tu manera - ISIL</footer>`;
    }
}