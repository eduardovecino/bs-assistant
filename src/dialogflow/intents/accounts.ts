export class AccountIntents /*extends BaseIntent*/ {

    public intents(app): void {

        app.intent('Saldo cuenta', conv => {
            conv.ask(`Si`);
        });
    }
}