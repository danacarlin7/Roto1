import {Component} from "@angular/core";
import {UserDashboardServices} from "../../../services/user-dashboard.service";
import {PaymentCard} from "../../../models/payment-card.model";
import { environment } from "../../../../../environments/environment";
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
  card: any;
  // Create a Stripe client.
  stripe = (<any>window).Stripe('pk_test_A5XmrDsft5PHHvkxOKISsUR7');

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
    console.log("remove clicked");
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

  onCardAddBtnClicked() {



    // Create an instance of Elements.
    var elements = this.stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    this.card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    // this.card.addEventListener('change', function(event) {
    //   var displayError = document.getElementById('card-errors');
    //   if (event.error) {
    //     displayError.textContent = event.error.message;
    //   } else {
    //     displayError.textContent = '';
    //   }
    // });

    // Handle form submission.
    // var form = document.getElementById('payment-form');
    // form.addEventListener('submit', function(event) {
    //   event.preventDefault();
    //
    //   stripe.createToken(card).then(function(result) {
    //     if (result.error) {
    //       // Inform the user if there was an error.
    //       var errorElement = document.getElementById('card-errors');
    //       errorElement.textContent = result.error.message;
    //     } else {
    //       // Send the token to your server.
    //       stripeTokenHandler(result.token);
    //     }
    //   });
    // });

    // var handler = (<any>window).StripeCheckout.configure({
    //   key: environment.production ? "pk_live_ot2q3JGgPLEfvia8StJWO0b7" : "pk_test_A5XmrDsft5PHHvkxOKISsUR7",
    //   locale: "auto",
    //   token: (token: any) => {
    //     // You can access the token ID with `token.id`.
    //     // Get the token ID to your server-side code for use.
    //     console.log("token call back => ", token);
    //     // that.coupon = resp != "empty" && status ? resp : "";
    //     //
    //     // // pixel : InitiateCheckout
    //     // that.addPixelEvent('InitiateCheckout', that.selectedPlan);
    //     //
    //     // if (that.authService.isLoggedIn()) {
    //     //   that.frontService.subscribePlan(token.id, that.selectedPlan.plan_id, that.coupon)
    //     //     .subscribe(
    //     //     response => {
    //     //       if (response.statusCode == 200) {
    //     //         console.log("subscribePlan Success => ", response.data);
    //     //
    //     //         // pixel : Purchase
    //     //         that.addPixelEvent('Purchase', that.selectedPlan);
    //     //
    //     //         that.authService.retrieveLoggedUserInfo()
    //     //           .subscribe(
    //     //           response => {
    //     //             if (response.statusCode == 200) that.authService.loggedUser = response.data;
    //     //           },
    //     //           error => {
    //     //             console.log("http error => ", error);
    //     //           }
    //     //           );
    //     //
    //     //         // that.router.navigate([
    //     //         //   "/homeRedirect",
    //     //         //   {redirected: true, redirectMessage: "You Have been Successfully Subscribed!"}]);
    //     //       }
    //     //     }
    //     //     );
    //     // } else {
    //     //   console.log("i am here", that.coupon);
    //     //   that.frontService.signUpStepTwo(token.id, that.selectedPlan.plan_id, that.coupon)
    //     //     .subscribe(
    //     //     response => {
    //     //       if (response.statusCode == 200) {
    //     //         console.log("subscribePlan Success => ", response.data);
    //     //
    //     //         // pixel : Purchase
    //     //         that.addPixelEvent('Purchase', that.selectedPlan);
    //     //
    //     //         that.authService.retrieveLoggedUserInfo()
    //     //           .subscribe(
    //     //           response => {
    //     //             if (response.statusCode == 200) that.authService.loggedUser = response.data;
    //     //           },
    //     //           error => {
    //     //             console.log("http error => ", error);
    //     //           }
    //     //           );
    //     //
    //     //         that.router.navigate([
    //     //           "/homeRedirect",
    //     //           {
    //     //             redirected: true,
    //     //             redirectMessage: "You Have been Successfully Subscribed! We have sent you a verification mail to your registered email address."
    //     //           }]);
    //     //       }
    //     //     }
    //     //     );
    //     // }
    //   }
    // });
    //
    // handler.open({
    //   name: "Add Card",
    //   // panelLabel: status ? "Amount After Discount" : "Pay"
    //   // image: "http://13.57.84.196/assets/images/logo.png"
    // });
  }

  addCard(){
    console.log(this.card);
    let that = this;
    this.stripe.createToken(this.card).then(function(result) {
        if (result.error) {
          // console.log(result.error);
          // Inform the user if there was an error.
          // var errorElement = document.getElementById('card-errors');
          // errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          console.log(result.token);
          that.dashboardService.addPaymentCard(result.token.id)
            .subscribe(
              response => {
                if (response.statusCode == 200) {
                  that.card = "";
                  that.getSavedCards();
                }
              },
              error => {
                console.log("Http error => ", error);
              }
            )
        }
      });
  }

}
