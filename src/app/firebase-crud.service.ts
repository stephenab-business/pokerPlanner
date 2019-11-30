import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {

  constructor(private firebase: AngularFireDatabase) { }

  form = new FormGroup({
  	suit: new FormControl(),
  	value: new FormControl(),
  	index: new FormControl(),
  	highlight: new FormControl(),
    url: new FormControl()
  });

  cardForm = new FormGroup({
  	$key: new FormControl(''),
  	card1: this.form,
  	card2: this.form,
  	card3: this.form,
  	card4: this.form,
  	card5: this.form,
  	card6: this.form,
  	card7: this.form
  });

  createCard() {
    const cardDefault = new CardProperties();
    const cardKey = this.firebase.list('/cards').push(cardDefault).key;
    return this.firebase.object('/cards' + cardKey);
  }

  updateCard(card:AngularFireObject<CardProperties>, data:any) {
    return card.update(data);
  }

  createDeck() {
    const deckDefault = new DeckOfCards();
    const deckKey = this.firebase.list('/decks').push(deckDefault).key;
    return this.firebase.object('/decks' + deckKey);
  }

  updateDeck(deck:AngularFireObject<DeckOfCards>, data: any) {
    return deck.update(data);
  }

}

export class DeckOfCards {
  card1 = new CardProperties();
  card2 = new CardProperties();
  card3 = new CardProperties();
  card4 = new CardProperties();
  card5 = new CardProperties();
  card6 = new CardProperties();
  card7 = new CardProperties();
}

export class CardProperties {
  suit = 1;
  value = 2;
  index = 1;
  highlight = true;
  url = "";
}
