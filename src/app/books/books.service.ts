import {Injectable} from '@angular/core';
import {BookModel} from '../shared/models/BookModel';
import {Router} from '@angular/router';
import {ApiService} from '../shared/services/api.service';


const BASE_API = 'http://henri-potier.xebia.fr/';

const GET = 'get';
const POST = 'post';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksList: BookModel[];
  selectedBooks = [];
  offers: [];


  constructor(private apiService: ApiService,
              private router: Router) {
  }


  /**
   * redirect to chouckout page (list of offers)
   */
  checkOffers() {
    if (this.selectedBooks.length) {
      this.router.navigateByUrl('books/checkout');
    }
  }


  /**
   * get books list
   * @param options
   */
  getBooksList(options: any = {}) {
    const url = BASE_API + 'books';
    this.apiService.get(url).subscribe((result) => {
        this.booksList = result;
      },
      () => {

      }
    );
  }


  /**
   * get list of offers for selected books
   */
  getOffers() {
    let selectedBooksIsbns;
    this.selectedBooks.forEach((item: BookModel) => {
      selectedBooksIsbns += ',' + item.isbn;
    });
    const url = BASE_API + 'books/' + selectedBooksIsbns + '/commercialOffers';
    this.apiService.get(url).subscribe((result) => {
        this.offers = result.offers;
      },
      () => {

      }
    );
  }
}
