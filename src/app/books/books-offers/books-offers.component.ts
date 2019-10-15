import {Component, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {BookModel} from '../../shared/models/BookModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-books-offers',
  templateUrl: './books-offers.component.html',
  styleUrls: ['./books-offers.component.scss']
})
export class BooksOffersComponent implements OnInit {
  booksPrice = 0;

  constructor(public booksService: BooksService,
              private router: Router) {
  }

  ngOnInit() {
    this.getBooksOffers();
    this.calculateBooksOriginalPrice();
  }

  private getBooksOffers() {
    if (this.booksService.selectedBooks.length) {
      this.booksService.getOffers();
    }
  }

  /**
   * get offer value and type
   * @param offer
   */
  getOfferValueAndType(offer) {
    switch (offer.type) {
      case 'percentage':
        return offer.value + '% of the total price of books';
      case 'minus':
        return 'reduction of ' + offer.value + '€ at checkout';
      case 'slice':
        return 'refund of ' + offer.value + '€ for every ' + offer.sliceValue + '€';
    }
  }

  /**
   * get offer class
   * @param offer
   * @constructor
   */
  GetOfferStyle(offer) {

  }

  /**
   * get final amount after applying offer discount
   * @param offer
   */
  getAmountAfterDiscount(offer) {
    switch (offer.type) {
      case 'percentage':
        return this.booksPrice - ((this.booksPrice / 100) * offer.value);
      case 'minus':
        return this.booksPrice - offer.value;
      case 'slice':
        const reductionTimes = this.booksPrice / offer.sliceValue;
        if (reductionTimes > 0) {
          return this.booksPrice - (offer.value * reductionTimes);
        } else {
          return this.booksPrice;
        }
    }
  }

  /**
   * calculate original total price
   */
  private calculateBooksOriginalPrice() {
    if (this.booksService.selectedBooks.length) {
      this.booksService.selectedBooks.forEach(
        (item: BookModel) => {
          this.booksPrice += item.price;
        }
      );
    } else {
      this.router.navigateByUrl('books');
    }

  }
}
