export class RestManager {

    public isMock;

    constructor() {
        this.isMock = process.env.MOCK;
    }

    public get(): any {
        return { num: 21 }; 
    }
}