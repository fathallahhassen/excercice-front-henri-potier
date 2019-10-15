import {Component, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {BookModel} from '../../shared/models/BookModel';
import {_} from 'underscore';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  private detailedItem;

  constructor(public booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.getBooksList();
  }

  /**
   * search book by text in title
   * @param $event
   */
  filterBooks($event) {
    const inputField = $event.target.value;
    if (inputField.length) {
      this.booksService.booksList = _.filter(this.booksService.booksList,
        function (item: BookModel) {
          return item.title.toLowerCase().includes(inputField.toLowerCase());
        });
    } else {
      this.booksService.getBooksList();
    }

  }

  /**
   * select book
   * @param book
   */
  selectBook(book: BookModel) {
    const itemIndex = this.findItemInArray(book);
    console.log(itemIndex);
    if (itemIndex < 0) {
      this.booksService.selectedBooks.push(book);
    } else {
      this.booksService.selectedBooks.splice(itemIndex, 1);
    }
  }

  /**
   * check if item is selected
   * @param book
   */
  checkBookSelected(book: BookModel) {
    const itemFound = this.findItemInArray(book);
    return (itemFound >= 0) ? 'books-list__result__book--checked' : '';
  }

  /**
   * find item in array
   * @param book
   */
  findItemInArray(book) {
    return _.findIndex(this.booksService.selectedBooks,
      (itemList: BookModel) => itemList.isbn === book.isbn);
  }

  /**
   * display details of item
   * @param item
   */
  detailItem(item) {
    this.detailedItem = item;
  }
}
