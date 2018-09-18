export class CardIntents /*extends BaseIntent*/ {

    public intents(app): void {

        app.intent('Tarjetas', conv => {
            conv.ask(`Tarjetas`);
        });
    }
}