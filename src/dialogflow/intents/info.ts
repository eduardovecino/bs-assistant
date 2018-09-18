export class InfoIntents /*extends BaseIntent*/ {

    public intents(app): void {

        app.intent('Oficinas', conv => {
            conv.ask(`Oficinas`);
        });
    }
}