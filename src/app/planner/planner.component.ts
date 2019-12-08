import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseCrudService } from '../firebase-crud.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PlannerDataService } from "../planner-data.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  firstCard:Card = new Card(0,0);
  secondCard:Card = new Card(0,0);
  thirdCard:Card = new Card(0,0);
  fourthCard:Card = new Card(0,0);
  fifthCard:Card = new Card(0,0);
  sixthCard:Card = new Card(0,0);
  seventhCard:Card = new Card(0,0);
  deckOfCards = new HandAndTable(this.firstCard, this.secondCard, this.thirdCard, this.fourthCard, this.fifthCard, this.sixthCard, this.seventhCard);

  nameOfSave:any = "";

  updatedDeckOfCards:UpdatedHandAndTable = new UpdatedHandAndTable(this.nameOfSave, this.deckOfCards, false, false, false, false, false, false, false, "", "", "", "", "", "", "");

  currentlyLoaded:boolean = false;

  currentlyRestarted:boolean = false;

  currentNumberOfCardsCompleted:number = 7;

  constructor(private storage: AngularFireStorage, private data:PlannerDataService, private modalService: BsModalService) {
    
  }

  ngOnInit() {
    this.data.currentlySaved.subscribe(nameOfSave => this.nameOfSave = nameOfSave);
    this.data.currentHandAndTable.subscribe(deckOfCards => this.updatedDeckOfCards = deckOfCards);
    this.data.currentlyLoaded.subscribe(currentlyLoaded => this.currentlyLoaded = currentlyLoaded);
    this.data.currentlyRestarted.subscribe(currentlyRestarted => this.currentlyRestarted = currentlyRestarted);
    this.data.currentNumberOfCardsCompleted.subscribe(currentNumberOfCardsCompleted => this.currentNumberOfCardsCompleted = currentNumberOfCardsCompleted);

    if (this.currentlyLoaded == true) {
      this.loadedCards(this.updatedDeckOfCards);
    }

    if (this.currentlyRestarted == true) {
      this.cardsRestarted();
    }

    if (this.currentNumberOfCardsCompleted == 7) {
      this.handDeclaration();
    }
  }

  /*
   *
   * Modal Information
   *
   */

  modalRef: BsModalRef;

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  /*
   *
   * Card Information
   *
   */

  newDeckOfCards(newDeckOfCards:UpdatedHandAndTable) {
    this.data.changeUpdatedHandAndTable(newDeckOfCards);
  }

  handStatement:string = '';

  imageSource = "assets/images/Back Covers/Pomegranate.png";
  firstCardSource:string = "assets/images/Back Covers/Pomegranate.png";
  secondCardSource:string = "assets/images/Back Covers/Pomegranate.png";
  thirdCardSource:string = "assets/images/Back Covers/Pomegranate.png";
  fourthCardSource:string = "assets/images/Back Covers/Pomegranate.png";
  fifthCardSource:string = "assets/images/Back Covers/Pomegranate.png";
  sixthCardSource:string = "assets/images/Back Covers/Pomegranate.png";
  seventhCardSource:string = "assets/images/Back Covers/Pomegranate.png";
  

  /*
   *
   *
   * All the Card Database Information
   *
   *
   */

  /*
   *
   *
   * All the Card Functions
   *
   *
   */

  value:number = 0;
  suit:number = 0;

  firstCardClicked:boolean = false;
  secondCardClicked:boolean = false;
  thirdCardClicked:boolean = false;
  fourthCardClicked:boolean = false;
  fifthCardClicked:boolean = false;
  firstHandCardClicked:boolean = false;
  secondHandCardClicked:boolean = false;

  spadeClicked:boolean = false;
  clubClicked:boolean = false;
  heartClicked:boolean = false;
  diamondClicked:boolean = false;

  cardClicked:boolean = false;
  suitClicked:boolean = false;

  /*
   *
   *
   * Card Click Functions
   *
   *
   */

  clickFirstCard() {
  	this.cardClicked = true;
    this.firstCardClicked = true;
  }

  clickSecondCard() {
  	this.cardClicked = true;
    this.secondCardClicked = true;
  }

  clickThirdCard() {
  	this.cardClicked = true;
    this.thirdCardClicked = true;
  }

  clickFourthCard() {
  	this.cardClicked = true;
    this.fourthCardClicked = true;
  }

  clickFifthCard() {
  	this.cardClicked = true;
    this.fifthCardClicked = true;
  }

  clickFirstHandCard() {
  	this.cardClicked = true;
    this.firstHandCardClicked = true;
  }

  clickSecondHandCard() {
  	this.cardClicked = true;
    this.secondHandCardClicked = true;
  }

  clickSuitSpade() {
  	this.suitClicked = true;
    this.spadeClicked = true;
  }

  clickSuitClub() {
  	this.suitClicked = true;
    this.clubClicked = true;
  }

  clickSuitHeart() {
  	this.suitClicked = true;
    this.heartClicked = true;
  }

  clickSuitDiamond() {
  	this.suitClicked = true;
    this.diamondClicked = true;
  }

  clickValue(value:number, template:any) {
	    if (this.spadeClicked == true) {
        this.suit = 1;
        if (this.checkForDuplicates(this.suit, value) == true) {
          this.getCard(this.suit, value, template);
        }
        else {
          let card = this.getCard(this.suit, value, template);
          this.checkIfCardsCompleted(card);
          this.resetVariables();
        }
	    }

	    else if (this.diamondClicked == true) {
        this.suit = 2;
        if (this.checkForDuplicates(this.suit, value) == true) {
          this.getCard(this.suit, value, template);
        }
        else {
          let card = this.getCard(this.suit, value, template);
          this.checkIfCardsCompleted(card);
          this.resetVariables();
        }
	    }

	    else if (this.heartClicked == true) {
        this.suit = 3;
        if (this.checkForDuplicates(this.suit, value) == true) {
          this.getCard(this.suit, value, template);
        }
        else {
          let card = this.getCard(this.suit, value, template);
          this.checkIfCardsCompleted(card);
          this.resetVariables();
        }
	    }

	    else if (this.clubClicked == true) {
        this.suit = 4;
        if (this.checkForDuplicates(this.suit, value) == true) {
          this.getCard(this.suit, value, template);
        }
        else {
          let card = this.getCard(this.suit, value, template);
          this.checkIfCardsCompleted(card);
          this.resetVariables();
        }
	    }
  }

  checkIfCardsCompleted(card:Card) {
    if (card.suit != 0 && card.value != 0) {
      this.currentNumberOfCardsCompleted++;
      this.data.changeCurrentNumberOfCardsCompleted(this.currentNumberOfCardsCompleted);
    }
  }

  checkForDuplicates(suit:number, value:number) {
    for (let i = 0; i < 7; i++) {
      if (this.deckOfCards.handAndTable[i].suit == suit && this.deckOfCards.handAndTable[i].value == value) {
        return true;
      }
    }
  }

  /*
   *
   *
   * Remaining Functions for the Cards
   *
   *
   */

  resetVariables() {
    this.firstCardClicked = false;
    this.secondCardClicked = false;
    this.thirdCardClicked = false;
    this.fourthCardClicked = false;
    this.fifthCardClicked = false;
    this.firstHandCardClicked = false;
    this.secondHandCardClicked = false;
    this.cardClicked = false;
    this.suitClicked = false;
    this.spadeClicked = false;
    this.clubClicked = false;
    this.heartClicked = false;
    this.diamondClicked = false;
    this.value = 0;
    this.suit = 0;
  }

  getCard(suit:number, value:number, template:any) {
    if (this.checkForDuplicates(suit, value) == true) {
      this.openModal(template);
      this.resetVariables();
    }
    else {
      if (this.firstCardClicked == true) {
      // WHEN RESTARTING, RESETS TO THE DEFAULT URLSW
      this.firstCard.setSuit(suit);
      this.firstCard.setValue(value);
      this.firstCardSource = this.firstCard.whichCardSource(this.firstCard);
      return this.firstCard;
    }
    else if (this.secondCardClicked == true) {
      this.secondCard.setSuit(suit);
      this.secondCard.setValue(value);
      this.secondCardSource = this.secondCard.whichCardSource(this.secondCard);
      return this.secondCard;
    }
    else if (this.thirdCardClicked == true) {
      this.thirdCard.setSuit(suit);
      this.thirdCard.setValue(value);
      this.thirdCardSource = this.thirdCard.whichCardSource(this.thirdCard);
      return this.thirdCard;
    }
    else if (this.fourthCardClicked == true) {
      this.fourthCard.setSuit(suit);
      this.fourthCard.setValue(value);
      this.fourthCardSource = this.fourthCard.whichCardSource(this.fourthCard);
      return this.fourthCard;
    }
    else if (this.fifthCardClicked == true) {
      this.fifthCard.setSuit(suit);
      this.fifthCard.setValue(value);
      this.fifthCardSource = this.fifthCard.whichCardSource(this.fifthCard);
      return this.sixthCard;
    }
    else if (this.firstHandCardClicked == true) {
      this.sixthCard.setSuit(suit);
      this.sixthCard.setValue(value);
      this.sixthCardSource = this.sixthCard.whichCardSource(this.sixthCard);
      return this.sixthCard;
    }
    else if (this.secondHandCardClicked == true) {
      this.seventhCard.setSuit(suit);
      this.seventhCard.setValue(value);
      this.seventhCardSource = this.seventhCard.whichCardSource(this.seventhCard);
      return this.seventhCard;
    }
    }
  }

  highlightCardOne:boolean = false;
  highlightCardTwo:boolean = false;
  highlightCardThree:boolean = false;
  highlightCardFour:boolean = false;
  highlightCardFive:boolean = false;
  highlightCardSix:boolean = false;
  highlightCardSeven:boolean = false;

  highlight(index:number) {
    if (index == 0) {
      this.highlightCardOne = true;
    }

    else if (index == 1) {
      this.highlightCardTwo = true;
    }

    else if (index == 2) {
      this.highlightCardThree = true;
    }

    else if (index == 3) {
      this.highlightCardFour = true;
    }

    else if (index == 4) {
      this.highlightCardFive = true;
    }

    else if (index == 5) {
      this.highlightCardSix = true;
    }

    else if (index == 6) {
      this.highlightCardSeven = true;
    }
  }

  handDeclaration() {
    let arrayOfIndex:number[];
      // ROYAL FLUSH
      if (this.deckOfCards.straight() != false 
        && this.deckOfCards.flush() 
        && this.deckOfCards[this.deckOfCards.highCard()[0]].value == 14) {
        this.handStatement = "ROYAL FLUSH"
        arrayOfIndex = this.deckOfCards.straight() as number[];
      }

      // STRAIGHT FLUSH
      else if (this.deckOfCards.straight() != false && this.deckOfCards.flush() != false) {
        this.handStatement = "STRAIGHT FLUSH";
        arrayOfIndex = this.deckOfCards.straight() as number[];
      }

      // FOUR OF A KIND
      else if (this.deckOfCards.fourOfAKind() != false) {
        this.handStatement = "FOUR OF A KIND";
        arrayOfIndex = this.deckOfCards.fourOfAKind() as number[];
      }

      // FULL HOUSE
      else if (this.deckOfCards.fullHouse() != false) {
        this.handStatement = "FULL HOUSE";
        arrayOfIndex = this.deckOfCards.fullHouse() as number[];
      }

      // FLUSH
      else if (this.deckOfCards.flush() != false) {
        this.handStatement = "FLUSH";
        arrayOfIndex = this.deckOfCards.flush() as number[];
      }

      // STRAIGHT
      else if (this.deckOfCards.straight() != false) {
        this.handStatement = "STRAIGHT";
        arrayOfIndex = this.deckOfCards.straight() as number[];
      }

      // THREE OF A KIND
      else if (this.deckOfCards.threeOfAKind() != false) {
        this.handStatement = "THREE OF A KIND";
        arrayOfIndex = this.deckOfCards.threeOfAKind() as number[];
      }

      // TWO PAIR
      else if (this.deckOfCards.twoPair() != false) {
        this.handStatement = "TWO PAIR";
        arrayOfIndex = this.deckOfCards.twoPair() as number[];
      }

      // ONE PAIR
      else if (this.deckOfCards.onePair() != false) {
        this.handStatement = "ONE PAIR";
        arrayOfIndex = this.deckOfCards.onePair() as number[];
      }

      // HIGH CARD
      else {
        this.handStatement = "HIGH CARD";
        arrayOfIndex = this.deckOfCards.highCard() as number[];
      }

    for (let i = 0; i < arrayOfIndex.length; i++) {
      this.highlight(arrayOfIndex[i]);
    }

    // Create array of boolean values representing highlighted values

    let arrayOfHighlights:boolean[] = [false, false, false, false, false, false, false];

    for (let i = 0; i < arrayOfIndex.length; i++) {
      if (arrayOfIndex[i] == 0) {
        arrayOfHighlights[0] = true;
      }
      else if (arrayOfIndex[i] == 1) {
        arrayOfHighlights[1] = true;
      }
      else if (arrayOfIndex[i] == 2) {
        arrayOfHighlights[2] = true;
      }
      else if (arrayOfIndex[i] == 3) {
        arrayOfHighlights[3] = true;
      }
      else if (arrayOfIndex[i] == 4) {
        arrayOfHighlights[4] = true;
      }
      else if (arrayOfIndex[i] == 5) {
        arrayOfHighlights[5] = true;
      }
      else if (arrayOfIndex[i] == 6) {
        arrayOfHighlights[6] = true;
      }
    }

    // Create the new updatedHandAndTable that will be passed to the form in save component

    let updatedDeckOfCards:UpdatedHandAndTable = new UpdatedHandAndTable(this.nameOfSave, this.deckOfCards, arrayOfHighlights[0], arrayOfHighlights[1], arrayOfHighlights[2], arrayOfHighlights[3], arrayOfHighlights[4], arrayOfHighlights[5], arrayOfHighlights[6], this.firstCardSource, this.secondCardSource, this.thirdCardSource, this.fourthCardSource, this.fifthCardSource, this.sixthCardSource, this.seventhCardSource);

    this.data.changeUpdatedHandAndTable(updatedDeckOfCards);

  }


  loadedCards(updatedDeck:UpdatedHandAndTable) {
    this.firstCard = updatedDeck.deckOfCards.firstTableCard;
    this.secondCard = updatedDeck.deckOfCards.secondTableCard;
    this.thirdCard = updatedDeck.deckOfCards.thirdTableCard;
    this.fourthCard = updatedDeck.deckOfCards.fourthTableCard;
    this.fifthCard = updatedDeck.deckOfCards.fifthTableCard;
    this.sixthCard = updatedDeck.deckOfCards.firstHandCard;
    this.seventhCard = updatedDeck.deckOfCards.secondHandCard;
    this.firstCardSource = updatedDeck.firstCardURL;
    this.secondCardSource = updatedDeck.secondCardURL;
    this.thirdCardSource = updatedDeck.thirdCardURL;
    this.fourthCardSource = updatedDeck.fourthCardURL;
    this.fifthCardSource = updatedDeck.fifthCardURL;
    this.sixthCardSource = updatedDeck.sixthCardURL;
    this.seventhCardSource = updatedDeck.seventhCardURL;

    if (updatedDeck.firstCardHighlighted == true) {
      this.highlight(0);
    }
    if (updatedDeck.secondCardHighlighted == true) {
      this.highlight(1);
    }
    if (updatedDeck.thirdCardHighlighted == true) {
      this.highlight(2);
    }
    if (updatedDeck.fourthCardHighlighted == true) {
      this.highlight(3);
    }
    if (updatedDeck.fifthCardHighlighted == true) {
      this.highlight(4);
    }
    if (updatedDeck.sixthCardHighlighted == true) {
      this.highlight(5);
    }
    if (updatedDeck.seventhCardHighlighted == true) {
      this.highlight(6);
    }

    this.currentlyLoaded = false;
  }

  cardsRestarted() {
    this.firstCard = new Card(0, 0);
    this.secondCard = new Card(0, 0);
    this.thirdCard = new Card(0, 0);
    this.fourthCard = new Card(0, 0);
    this.fifthCard = new Card(0, 0);
    this.sixthCard = new Card(0, 0);
    this.seventhCard = new Card(0, 0);
    this.deckOfCards = new HandAndTable(this.firstCard, this.secondCard, this.thirdCard, this.fourthCard, this.fifthCard, this.sixthCard, this.seventhCard);
    this.firstCardClicked = false;
    this.secondCardClicked = false;
    this.thirdCardClicked = false;
    this.fourthCardClicked = false;
    this.fifthCardClicked = false;
    this.firstHandCardClicked = false;
    this.secondHandCardClicked = false;
    this.firstCardSource = "assets/images/Back Covers/Pomegranate.png"
    this.secondCardSource = this.imageSource;
    this.thirdCardSource = this.imageSource;
    this.fourthCardSource = this.imageSource;
    this.fifthCardSource = this.imageSource;
    this.sixthCardSource = this.imageSource;
    this.seventhCardSource = this.imageSource;
    this.highlightCardOne = false;
    this.highlightCardTwo = false;
    this.highlightCardThree = false;
    this.highlightCardFour = false;
    this.highlightCardFive = false;
    this.highlightCardSix = false;
    this.highlightCardSeven = false;
    this.suitClicked = false;
    this.cardClicked = false;
    this.handStatement = "";
    this.spadeClicked = false;
    this.heartClicked = false;
    this.diamondClicked = false;
    this.clubClicked = false;
    this.value = 0;
    this.suit = 0;
    this.currentlyLoaded = false;
  }

}










// END OF MAIN CLASS










export class Card {
  value:number;
  suit:number;

  constructor(value:number, suit:number) {
    this.value = value;
    this.suit = suit;
  }

  setValue(value:number) {
    this.value = value;
  }

  setSuit(suit:number) {
    this.suit = suit;
  }

  equalTo(card:Card) {
    if (this.suit == card.suit && this.value == card.value) {
      return true;
    }
    else {
      return false;
    }
  }

  whichCard(card:Card) {
    let nameOfCard:String;

    if (card.suit == 1) {
      switch(card.value) {
        case 2: nameOfCard = "Two of Spades";
        break;
        case 3: nameOfCard = "Three of Spades";
        break;
        case 4: nameOfCard = "Four of Spades";
        break;
        case 5: nameOfCard = "Five of Spades";
        break;
        case 6: nameOfCard = "Six of Spades";
        break;
        case 7: nameOfCard = "Seven of Spades";
        break;
        case 8: nameOfCard = "Eight of Spades";
        break;
        case 9: nameOfCard = "Nine of Spades";
        break;
        case 10: nameOfCard = "Ten of Spades";
        break;
        case 11: nameOfCard = "Jack of Spades";
        break;
        case 12: nameOfCard = "Queen of Spades";
        break;
        case 13: nameOfCard = "King of Spades";
        break;
        case 14: nameOfCard = "Ace of Spades";
        break;
      }
    }

    else if (card.suit == 2) {
      switch(card.value) {
        case 2: nameOfCard = "Two of Diamonds";
        break;
        case 3: nameOfCard = "Three of Diamonds";
        break;
        case 4: nameOfCard = "Four of Diamonds";
        break;
        case 5: nameOfCard = "Five of Diamonds";
        break;
        case 6: nameOfCard = "Six of Diamonds";
        break;
        case 7: nameOfCard = "Seven of Diamonds";
        break;
        case 8: nameOfCard = "Eight of Diamonds";
        break;
        case 9: nameOfCard = "Nine of Diamonds";
        break;
        case 10: nameOfCard = "Ten of Diamonds";
        break;
        case 11: nameOfCard = "Jack of Diamonds";
        break;
        case 12: nameOfCard = "Queen of Diamonds";
        break;
        case 13: nameOfCard = "King of Diamonds";
        break;
        case 14: nameOfCard = "Ace of Diamonds";
        break;
      }
    }

    else if (card.suit == 3) {
      switch(card.value) {
        case 2: nameOfCard = "Two of Hearts";
        break;
        case 3: nameOfCard = "Three of Hearts";
        break;
        case 4: nameOfCard = "Four of Hearts";
        break;
        case 5: nameOfCard = "Five of Hearts";
        break;
        case 6: nameOfCard = "Six of Hearts";
        break;
        case 7: nameOfCard = "Seven of Hearts";
        break;
        case 8: nameOfCard = "Eight of Hearts";
        break;
        case 9: nameOfCard = "Nine of Hearts";
        break;
        case 10: nameOfCard = "Ten of Hearts";
        break;
        case 11: nameOfCard = "Jack of Hearts";
        break;
        case 12: nameOfCard = "Queen of Hearts";
        break;
        case 13: nameOfCard = "King of Hearts";
        break;
        case 14: nameOfCard = "Ace of Hearts";
        break;
      }
    }

    else if (card.suit == 4) {
      switch(card.value) {
        case 2: nameOfCard = "Two of Clubs";
        break;
        case 3: nameOfCard = "Three of Clubs";
        break;
        case 4: nameOfCard = "Four of Clubs";
        break;
        case 5: nameOfCard = "Five of Clubs";
        break;
        case 6: nameOfCard = "Six of Clubs";
        break;
        case 7: nameOfCard = "Seven of Clubs";
        break;
        case 8: nameOfCard = "Eight of Clubs";
        break;
        case 9: nameOfCard = "Nine of Clubs";
        break;
        case 10: nameOfCard = "Ten of Clubs";
        break;
        case 11: nameOfCard = "Jack of Clubs";
        break;
        case 12: nameOfCard = "Queen of Clubs";
        break;
        case 13: nameOfCard = "King of Clubs";
        break;
        case 14: nameOfCard = "Ace of Clubs";
        break;
      }
    }


  }

    whichCardSource(card:Card) {
    	let nameOfCard:string = "";

    if (card.suit == 1) {
      switch(card.value) {
        case 2: nameOfCard = "assets/images/Spades/2.png";
        break;
        case 3: nameOfCard = "assets/images/Spades/3.png";
        break;
        case 4: nameOfCard = "assets/images/Spades/4.png";
        break;
        case 5: nameOfCard = "assets/images/Spades/5.png";
        break;
        case 6: nameOfCard = "assets/images/Spades/6.png";
        break;
        case 7: nameOfCard = "assets/images/Spades/7.png";
        break;
        case 8: nameOfCard = "assets/images/Spades/8.png";
        break;
        case 9: nameOfCard = "assets/images/Spades/9.png";
        break;
        case 10: nameOfCard = "assets/images/Spades/10.png";
        break;
        case 11: nameOfCard = "assets/images/Spades/J.png";
        break;
        case 12: nameOfCard = "assets/images/Spades/Q.png";
        break;
        case 13: nameOfCard = "assets/images/Spades/K.png";
        break;
        case 14: nameOfCard = "assets/images/Spades/A.png";
        break;
      }
    }

    else if (card.suit == 2) {
      switch(card.value) {
        case 2: nameOfCard = "assets/images/Diamonds/2.png";
        break;
        case 3: nameOfCard = "assets/images/Diamonds/3.png";
        break;
        case 4: nameOfCard = "assets/images/Diamonds/4.png";
        break;
        case 5: nameOfCard = "assets/images/Diamonds/5.png";
        break;
        case 6: nameOfCard = "assets/images/Diamonds/6.png";
        break;
        case 7: nameOfCard = "assets/images/Diamonds/7.png";
        break;
        case 8: nameOfCard = "assets/images/Diamonds/8.png";
        break;
        case 9: nameOfCard = "assets/images/Diamonds/9.png";
        break;
        case 10: nameOfCard = "assets/images/Diamonds/10.png";
        break;
        case 11: nameOfCard = "assets/images/Diamonds/J.png";
        break;
        case 12: nameOfCard = "assets/images/Diamonds/Q.png";
        break;
        case 13: nameOfCard = "assets/images/Diamonds/K.png";
        break;
        case 14: nameOfCard = "assets/images/Diamonds/A.png";
        break;
      }
    }

    else if (card.suit == 3) {
      switch(card.value) {
        case 2: nameOfCard = "assets/images/Hearts/2.png";
        break;
        case 3: nameOfCard = "assets/images/Hearts/3.png";
        break;
        case 4: nameOfCard = "assets/images/Hearts/4.png";
        break;
        case 5: nameOfCard = "assets/images/Hearts/5.png";
        break;
        case 6: nameOfCard = "assets/images/Hearts/6.png";
        break;
        case 7: nameOfCard = "assets/images/Hearts/7.png";
        break;
        case 8: nameOfCard = "assets/images/Hearts/8.png";
        break;
        case 9: nameOfCard = "assets/images/Hearts/9.png";
        break;
        case 10: nameOfCard = "assets/images/Hearts/10.png";
        break;
        case 11: nameOfCard = "assets/images/Hearts/J.png";
        break;
        case 12: nameOfCard = "assets/images/Hearts/Q.png";
        break;
        case 13: nameOfCard = "assets/images/Hearts/K.png";
        break;
        case 14: nameOfCard = "assets/images/Hearts/A.png";
        break;
      }
    }

    else {
      switch(card.value) {
        case 2: nameOfCard = "assets/images/Clubs/2.png";
        break;
        case 3: nameOfCard = "assets/images/Clubs/3.png";
        break;
        case 4: nameOfCard = "assets/images/Clubs/4.png";
        break;
        case 5: nameOfCard = "assets/images/Clubs/5.png";
        break;
        case 6: nameOfCard = "assets/images/Clubs/6.png";
        break;
        case 7: nameOfCard = "assets/images/Clubs/7.png";
        break;
        case 8: nameOfCard = "assets/images/Clubs/8.png";
        break;
        case 9: nameOfCard = "assets/images/Clubs/9.png";
        break;
        case 10: nameOfCard = "assets/images/Clubs/10.png";
        break;
        case 11: nameOfCard = "assets/images/Clubs/J.png";
        break;
        case 12: nameOfCard = "assets/images/Clubs/Q.png";
        break;
        case 13: nameOfCard = "assets/images/Clubs/K.png";
        break;
        case 14: nameOfCard = "assets/images/Clubs/A.png";
        break;
      }
    }
    return nameOfCard;
  }

}

export class HandAndTable {
  firstTableCard:Card;
  secondTableCard:Card;
  thirdTableCard:Card;
  fourthTableCard:Card;
  fifthTableCard:Card;
  firstHandCard:Card;
  secondHandCard:Card;
  handAndTable:Card[];

  constructor(firstCard:Card, secondCard:Card, thirdCard:Card, fourthCard:Card, fifthCard:Card, sixthCard:Card, seventhCard:Card) {
    this.firstTableCard = firstCard;
    this.secondTableCard = secondCard;
    this.thirdTableCard = thirdCard;
    this.fourthTableCard = fourthCard;
    this.fifthTableCard = fifthCard;
    this.firstHandCard = sixthCard;
    this.secondHandCard = seventhCard;
    this.handAndTable = [this.firstTableCard, this.secondTableCard, this.thirdTableCard, this.fourthTableCard, this.fifthTableCard, this.firstHandCard, this.secondHandCard];
  }

  /*
   *
   *
   * Helper Methods for the Hand Methods
   *
   *
   */

  compareArrays(sortedArray:Card[]) {
     
     // Sorted Array needs to be the five highest cards
    let indexOfHighestCards:number[] = [];

    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < this.handAndTable.length; j++) {
        if (sortedArray[i].equalTo(this.handAndTable[j]) == true) {
          indexOfHighestCards.push(j);
        }
      }
    }

    return indexOfHighestCards;

  }

  sortByValue() {
    let i:number = 0;
    let j:number = 0;
    let min_j:number = 0;

    let copyArray:Card[] = [];

    for(i = 0; i < this.handAndTable.length; i++) {
      copyArray[i] = this.handAndTable[i];
    }

    for (i = 0; i < copyArray.length; i++) {
      min_j = i;
      for (j = i + 1; j < copyArray.length; j++) {
        if (copyArray[j].suit < copyArray[min_j].suit) {
          min_j = j;
        }
      }
      let help:Card = copyArray[i];
      copyArray[i] = copyArray[min_j];
      copyArray[min_j] = help;
    }

    return copyArray;

  }

  sortBySuit() {
    let i:number;
    let j:number;
    let min_j:number;

    let copyArray:Card[] = [];

    for(i = 0; i < this.handAndTable.length; i++) {
      copyArray[i] = this.handAndTable[i];
    }

    for (i = 0; i < copyArray.length; i++) {
      min_j = i;
      for (j = i + 1; j < copyArray.length; j++) {
        if (copyArray[j].value < copyArray[min_j].value) {
          min_j = j;
        }
      }
      let help:Card = copyArray[i];
      copyArray[i] = copyArray[min_j];
      copyArray[min_j] = help;
    }

    return copyArray;
  }

  removeDuplicates(sortedArray:Card[]) {
    let temp:Card[] = [];
    let j:number = 0;

    for(let i = 0; i < sortedArray.length; i++) {
      temp[i] = sortedArray[i];
    }

    for(let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] != sortedArray[i + 1]) {
        temp[j++] = sortedArray[i];
      }
      temp[j++] = sortedArray[sortedArray.length - 1];
    }

    return temp;

  }

  largestCards(sortedArray:Card[], howManyCards:number) {
    
    if (howManyCards == 1) {
      let largestValue = 0;

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value > largestValue) {
          largestValue = sortedArray[i].value;
        }
      }

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value == largestValue) {
          return sortedArray[i];
        }
      }

    }

    else if (howManyCards == 2) {
      let largestValueOne = 0;
      let largestValueTwo = 0;
      let arrayOfTwoHighCards:Card[] = [];

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value > largestValueOne) {
          largestValueTwo = largestValueOne;
          largestValueOne = sortedArray[i].value;
        }

        else if (sortedArray[i].value > largestValueTwo) {
          sortedArray[i].value == largestValueTwo;
        }
      }

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value == largestValueOne) {
          arrayOfTwoHighCards.push(sortedArray[i]);
        }
        if (sortedArray[i].value == largestValueTwo) {
          arrayOfTwoHighCards.push(sortedArray[i]);
        }
      }

      return arrayOfTwoHighCards;
    }

    else if (howManyCards == 3) {
      let largestValueOne = 0;
      let largestValueTwo = 0;
      let largestValueThree = 0;
      let arrayOfThreeHighCards:Card[] = [];

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value > largestValueOne) {
          largestValueThree = largestValueTwo;
          largestValueTwo = largestValueOne;
          largestValueOne = sortedArray[i].value;
        }

        else if (sortedArray[i].value > largestValueTwo) {
          sortedArray[i].value == largestValueTwo;
        }

        else if (sortedArray[i].value > largestValueThree) {
          sortedArray[i].value == largestValueThree;
        }
      }

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value == largestValueOne) {
          arrayOfThreeHighCards.push(sortedArray[i]);
        }
        if (sortedArray[i].value == largestValueTwo) {
          arrayOfThreeHighCards.push(sortedArray[i]);
        }
        if (sortedArray[i].value == largestValueThree) {
          arrayOfThreeHighCards.push(sortedArray[i]);
        }
      }

      return arrayOfThreeHighCards;
    }

    else if (howManyCards == 4) {
      let largestValueOne = 0;
      let largestValueTwo = 0;
      let largestValueThree = 0;
      let largestValueFour = 0;
      let arrayOfFourHighCards:Card[] = [];

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value > largestValueOne) {
          largestValueFour = largestValueThree;
          largestValueThree = largestValueTwo;
          largestValueTwo = largestValueOne;
          largestValueOne = sortedArray[i].value;
        }

        else if (sortedArray[i].value > largestValueTwo) {
          sortedArray[i].value == largestValueTwo;
        }

        else if (sortedArray[i].value > largestValueThree) {
          sortedArray[i].value == largestValueThree;
        }

        else if (sortedArray[i].value > largestValueFour) {
          sortedArray[i].value == largestValueFour;
        }
      }

      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value == largestValueOne) {
          arrayOfFourHighCards.push(sortedArray[i]);
        }
        if (sortedArray[i].value == largestValueTwo) {
          arrayOfFourHighCards.push(sortedArray[i]);
        }
        if (sortedArray[i].value == largestValueThree) {
          arrayOfFourHighCards.push(sortedArray[i]);
        }
        if (sortedArray[i].value == largestValueFour) {
          arrayOfFourHighCards.push(sortedArray[i]);
        }
      }

      return arrayOfFourHighCards;
    }
  }


  /*
   *
   *
   * Hand Methods
   *
   *
   */

  fourOfAKind() {
    let arr:Card[] = this.sortByValue();
    let arrayOfHighestCards:Card[] = [];
    let arrayOfRemainingCards:Card[] = [];

    /*


      VERY RISKY CODE
      VERY RISKY CODE
      VERY RISKY CODE
      VERY RISKY CODE
      VERY RISKY CODE

      TYPE CASTING INVOLVED


    */

    if (arr[0].value == arr[1].value && arr[1].value == arr[2].value && arr[2].value == arr[3].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfRemainingCards = [arr[4], arr[5], arr[6]];
      let cardOne = this.largestCards(arrayOfRemainingCards, 1) as Card;
      arrayOfHighestCards.push(cardOne);
    } 
    else if (arr[1].value == arr[2].value && arr[2].value == arr[3].value && arr[3].value == arr[4].value) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfRemainingCards = [arr[0], arr[5], arr[6]];
      let cardOne = this.largestCards(arrayOfRemainingCards, 1) as Card;
      arrayOfHighestCards.push(cardOne);
    }
    else if (arr[2].value == arr[3].value && arr[3].value == arr[4].value && arr[4].value == arr[5].value) {
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfRemainingCards = [arr[0], arr[1], arr[6]];
      let cardOne = this.largestCards(arrayOfRemainingCards, 1) as Card;
      arrayOfHighestCards.push(cardOne);
    }
    else if (arr[3].value == arr[4].value && arr[4].value == arr[5].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
      arrayOfRemainingCards = [arr[0], arr[1], arr[2]];
      let cardOne = this.largestCards(arrayOfRemainingCards, 1) as Card;
      arrayOfHighestCards.push(cardOne);
    }
    else {
      return false;
    }

    if (arrayOfHighestCards.length > 0) {
      return this.compareArrays(arrayOfHighestCards);
    }
    
  }

  fullHouse() {
    let arr:Card[] = this.sortByValue();
    let arrayOfHighestCards:Card[] = [];

    for (let i = 0; i < this.handAndTable.length; i++) {
      arr[i] = this.handAndTable[i];
    }

    // FIRST SITUATION
    if(arr[0].value == arr[1].value && arr[1].value == arr[2].value && arr[3].value == arr[4].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
    }

    // SECOND SITUATION
    else if(arr[0].value == arr[1].value && arr[1].value == arr[2].value && arr[4].value == arr[5].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
    }

    // THIRD SITUATION
    else if(arr[0].value == arr[1].value && arr[1].value == arr[2].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
    }
    // FOURTH SITUATION
    else if(arr[1].value == arr[2].value && arr[2].value == arr[3].value && arr[4].value == arr[5].value) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
    }

    // FIFTH SITUATION
    else if(arr[1].value == arr[2].value && arr[2].value == arr[3].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
    }

    // SIXTH SITUATION
    else if(arr[2].value == arr[3].value && arr[3].value == arr[4].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
    }

    // SEVENTH SITUATION
    else {
      return false;
    }

    if (arrayOfHighestCards.length > 0) {
      return this.compareArrays(arrayOfHighestCards);
    }
  }

  flush() {
    let arr:Card[] = this.sortBySuit();
    let arrayOfHighestCards:Card[] = [];

    // 0 through 4
    if (arr[0].suit == arr[1].suit && arr[1].suit == arr[2].suit && arr[2].suit == arr[3].suit && arr[3].suit == arr[4].suit) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
    }

    // 1 through 5
    else if (arr[1].suit == arr[2].suit && arr[2].suit == arr[3].suit && arr[3].suit == arr[4].suit && arr[4].suit == arr[5].suit) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
    }

    // 2 through 6
    else if (arr[2].suit == arr[3].suit && arr[3].suit == arr[4].suit && arr[4].suit == arr[5].suit && arr[5].suit == arr[6].suit) {
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
    }

    else {
      return false;
    }

    if (arrayOfHighestCards.length > 0) {
      return this.compareArrays(arrayOfHighestCards);
    }

  }

  straight() {
    let arr:Card[] = this.removeDuplicates(this.sortByValue());
    let arrayOfHighestCards:Card[] = [];

    if (arr.length >= 5) {
      if (arr[arr.length - 1].value == 14) {
        if(arr[arr.length - (arr.length - 1)].value == 2 
        && arr[arr.length - (arr.length - 2)].value == 3 
        && arr[arr.length - (arr.length - 3)].value == 4 
        && arr[arr.length - (arr.length - 4)].value == 5) {
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 1)]);
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 2)]);
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 3)]);
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 4)]);
          arrayOfHighestCards.push(arr[arr.length - 1]);
        }

        else if (arr[arr.length - (arr.length - 1)].value == 10 
        && arr[arr.length - (arr.length - 2)].value == 11 
        && arr[arr.length - (arr.length - 3)].value == 12 
        && arr[arr.length - (arr.length - 4)].value == 13) {
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 1)]);
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 2)]);
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 3)]);
          arrayOfHighestCards.push(arr[arr.length - (arr.length - 4)]);
          arrayOfHighestCards.push(arr[arr.length - 1]);
        }
      }
      else {
        let testRank:number = arr[0].value + 1;
        for (let i = 1; i < arr.length; i++) {
          if (arr[i].value != testRank) {
            return false;
          }
          arrayOfHighestCards.push(arr[i]);
          testRank++;
        }
        arrayOfHighestCards.push(arr[0]);
        if (arrayOfHighestCards.length == 5) {
          return this.compareArrays(arrayOfHighestCards);
        }
      }
    }
  }

  threeOfAKind() {
    let arr:Card[] = this.sortByValue();
    let arrayOfHighestCards:Card[] = [];
    let arrayOfRemainingCards:Card[] = [];
    let arrayOfTwoOtherCards:Card[] = [];


    // FIRST SITUATION
    if (arr[0].value == arr[1].value && arr[1].value == arr[2].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);

      arrayOfRemainingCards = [arr[3], arr[4], arr[5], arr[6]];
      arrayOfTwoOtherCards = this.largestCards(arrayOfRemainingCards, 2) as Card[];
      
      arrayOfHighestCards.push(arrayOfTwoOtherCards[0]);
      arrayOfHighestCards.push(arrayOfTwoOtherCards[1]);

      return this.compareArrays(arrayOfHighestCards);

    }

    // SECOND SITUATION
    else if (arr[1].value == arr[2].value && arr[2].value == arr[3].value) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);

      arrayOfRemainingCards = [arr[0], arr[4], arr[5], arr[6]];
      arrayOfTwoOtherCards = this.largestCards(arrayOfRemainingCards, 2) as Card[];
      
      arrayOfHighestCards.push(arrayOfTwoOtherCards[0]);
      arrayOfHighestCards.push(arrayOfTwoOtherCards[1]);

      return this.compareArrays(arrayOfHighestCards);
    }

    // THIRD SITUATION
    else if (arr[2].value == arr[3].value && arr[3].value == arr[4].value) {
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);

      arrayOfRemainingCards = [arr[0], arr[1], arr[5], arr[6]];
      arrayOfTwoOtherCards = this.largestCards(arrayOfRemainingCards, 2) as Card[];
      
      arrayOfHighestCards.push(arrayOfTwoOtherCards[0]);
      arrayOfHighestCards.push(arrayOfTwoOtherCards[1]);

      return this.compareArrays(arrayOfHighestCards);
    }

    // FOURTH SITUATION
    else if (arr[3].value == arr[4].value && arr[4].value == arr[5].value) {
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);

      arrayOfRemainingCards = [arr[0], arr[1], arr[2], arr[6]];
      arrayOfTwoOtherCards = this.largestCards(arrayOfRemainingCards, 2) as Card[];
      
      arrayOfHighestCards.push(arrayOfTwoOtherCards[0]);
      arrayOfHighestCards.push(arrayOfTwoOtherCards[1]);

      return this.compareArrays(arrayOfHighestCards);
    }

    // FIFTH SITUATION
    else if (arr[4].value == arr[5].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);

      arrayOfRemainingCards = [arr[0], arr[1], arr[2], arr[3]];
      arrayOfTwoOtherCards = this.largestCards(arrayOfRemainingCards, 2) as Card[];
      
      arrayOfHighestCards.push(arrayOfTwoOtherCards[0]);
      arrayOfHighestCards.push(arrayOfTwoOtherCards[1]);

      return this.compareArrays(arrayOfHighestCards);
    }

    else {
      return false;
    }
  }

  twoPair() {
    let arr:Card[] = this.sortByValue();
    let arrayOfHighestCards:Card[] = [];
    let arrayOfRemainingCards:Card[] = [];

    // FIRST SITUATION
    if (arr[0].value == arr[1].value && arr[2].value == arr[3].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfRemainingCards = [arr[4], arr[5], arr[6]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // SECOND SITUATION
    else if (arr[0].value == arr[1].value && arr[3].value == arr[4].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfRemainingCards = [arr[2], arr[5], arr[6]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // THIRD SITUATION
    else if (arr[0].value == arr[1].value && arr[4].value == arr[5].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfRemainingCards = [arr[2], arr[3], arr[6]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // FOURTH SITUATION
    else if (arr[0].value == arr[1].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[0]);
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
      arrayOfRemainingCards = [arr[2], arr[3], arr[4]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // FIFTH SITUATION
    else if (arr[1].value == arr[2].value && arr[3].value == arr[4].value) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfRemainingCards = [arr[0], arr[5], arr[6]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // SIXTH SITUATION
    else if (arr[1].value == arr[2].value && arr[4].value == arr[5].value) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfRemainingCards = [arr[0], arr[3], arr[6]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // SEVENTH SITUATION
    else if (arr[1].value == arr[2].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[1]);
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
      arrayOfRemainingCards = [arr[0], arr[3], arr[4]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // EIGHTH SITUATION
    else if (arr[2].value == arr[3].value && arr[4].value == arr[5].value) {
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfRemainingCards = [arr[0], arr[1], arr[2]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // NINTH SITUATION
    else if (arr[2].value == arr[3].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[2]);
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
      arrayOfRemainingCards = [arr[0], arr[1], arr[4]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    // TENTH SITUATION
    else if (arr[3].value == arr[4].value && arr[5].value == arr[6].value) {
      arrayOfHighestCards.push(arr[3]);
      arrayOfHighestCards.push(arr[4]);
      arrayOfHighestCards.push(arr[5]);
      arrayOfHighestCards.push(arr[6]);
      arrayOfRemainingCards = [arr[0], arr[1], arr[2]];
      arrayOfHighestCards.push(this.largestCards(arrayOfHighestCards, 1) as Card);
      return this.compareArrays(arrayOfHighestCards);
    }

    else {
      return false;
    }

  }

  onePair() {
    let arr:Card[] = this.sortByValue();
    let arrayOfCards:number[] = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length; j++)
        if (arr[i].value == arr[j].value) {
          arrayOfCards.push(i);
          arrayOfCards.push(j); 
        }
    }

    if (arrayOfCards.length == 2) {
      return arrayOfCards;
    }
    else {
      return false;
    }
  }

  highCard() {
    let arr:Card[] = this.sortByValue();
    let arrayOfCard:Card[];

    arrayOfCard = [this.largestCards(arr, 1) as Card];
    return this.compareArrays(arrayOfCard);
  }

}

export class UpdatedHandAndTable {
  /*
  Normal deck of cards (each has suit and value), but also with whether they are highlighted, and the url
  */
  nameOfSave:any;
  deckOfCards:HandAndTable;
  firstCardHighlighted:boolean;
  secondCardHighlighted:boolean;
  thirdCardHighlighted:boolean;
  fourthCardHighlighted:boolean;
  fifthCardHighlighted:boolean;
  sixthCardHighlighted:boolean;
  seventhCardHighlighted:boolean;
  firstCardURL:string;
  secondCardURL:string;
  thirdCardURL:string;
  fourthCardURL:string;
  fifthCardURL:string;
  sixthCardURL:string;
  seventhCardURL:string;

  constructor(nameOfSave:any, deckOfCards:HandAndTable, firstHighlight:boolean, secondHighlight:boolean, thirdHighlight:boolean, fourthHighlight:boolean, fifthHighlight:boolean, sixthHighlight:boolean, seventhHighlight:boolean, firstURL:string, secondURL:string, thirdURL:string, fourthURL:string, fifthURL:string, sixthURL:string, seventhURL:string) {
    this.nameOfSave = nameOfSave;
    this.deckOfCards = deckOfCards;
    this.firstCardHighlighted = firstHighlight;
    this.secondCardHighlighted = secondHighlight;
    this.thirdCardHighlighted = thirdHighlight;
    this.fourthCardHighlighted = fourthHighlight;
    this.fifthCardHighlighted = fifthHighlight;
    this.sixthCardHighlighted = sixthHighlight;
    this.seventhCardHighlighted = seventhHighlight;
    this.firstCardURL = firstURL;
    this.secondCardURL = secondURL;
    this.thirdCardURL = thirdURL;
    this.fourthCardURL = fourthURL;
    this.fifthCardURL = fifthURL;
    this.sixthCardURL = sixthURL;
    this.seventhCardURL = seventhURL;
  }
}
