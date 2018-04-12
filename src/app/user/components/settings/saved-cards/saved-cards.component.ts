import {Component} from "@angular/core";
import {UserDashboardServices} from "../../../services/user-dashboard.service";
import {PaymentCard} from "../../../models/payment-card.model";
/**
 * Created by Hiren on 01-08-2017.
 */

@Component({
  selector: 'rp-saved-cards',
  templateUrl: './saved-cards.component.html',
  styleUrls: ['./saved-cards.component.css']
})
export class SavedCardsComponent {

  cards:PaymentCard[];
  isLoading:boolean;
  defaultCard:string;

  constructor(private dashboardService: UserDashboardServices) {

  }

  ngOnInit() {
    this.getSavedCards();
  }

  getSavedCards() {
    this.isLoading = true;
    this.dashboardService.getSavedCards()
      .subscribe(
        response => {
          this.isLoading = false;
          if (response.statusCode == 200) {
            this.cards = response.data.stripe_cards;
            this.defaultCard = response.data.default_payment_source;
            console.log("cards => ", this.cards);
          }
          else {

          }
        },
        error => {
          this.isLoading = false;
        }
      )
  }

  onCardDefaultBtnClicked(card:PaymentCard) {
    if (card.card_id != this.defaultCard) {
      this.dashboardService.updateDefaultPaymentCard(card.card_id)
        .subscribe(
          response => {
            if (response.statusCode == 200) {
              this.defaultCard = card.card_id;
            }
          },
          error => {
            console.log("Http error => ", error);
          }
        )
    }
  }

  onCardRemoveBtnClicked(card:PaymentCard) {
    this.dashboardService.removePaymentCard(card.card_id)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.getSavedCards();
          }
        },
        error => {
          console.log("Http error => ", error);
        }
      )
  }
}
