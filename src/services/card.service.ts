import { RestManager } from "../managers/data/rest.manager";
import { CardManager } from "../managers/data/card.manager";
import { CardModel } from "../models/card.model";

import * as fs from "fs";

export class CardService extends RestManager {

    // public getCards2(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const data = fs.readFileSync('mock/card/get-cards.json');
    //         const jsonData = JSON.parse(data.toString());
    //         console.log("CARDS", jsonData);
    //         resolve(jsonData.data);
    //     });      
    // }

    // public getCard(last4): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const data = fs.readFileSync('mock/card/get-cards.json');
    //         const jsonData = JSON.parse(data.toString());
    //         const card = CardManager.getCardByLast4(jsonData.data, last4);
    //         resolve(card);
    //     });
    // }

    async getCards() {
        const data = await fs.readFileSync('mock/card/get-cards.json');
        const jsonData = JSON.parse(data.toString());
        const cards: Array<CardModel> = [];
        jsonData.data.forEach(card => cards.push(new CardModel(card)));
        return cards;
    }

    async getCard(last4) {
        const cards = await this.getCards();
        console.log("CARD0", cards);
        const card = CardManager.getCardByLast4(cards, last4);
        console.log("CARD1", card);
        return card;
    }


    // async getAccounts() {
    //     const results: any = await this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista', 'mock/accounts/get-accounts.json');
    //     const accounts: Array<AccountModel> = [];
    //     results.forEach(result => accounts.push(new AccountModel(result)));
    //     return accounts;
    // }

    // async getAccount(last4) {
    //     const accounts = await this.getAccounts();
    //     const account: AccountModel = new AccountModel(AccountManager.getAccountByLast4(accounts, last4));
    //     return account;
    // }
}