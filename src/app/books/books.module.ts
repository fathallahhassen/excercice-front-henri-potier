import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksListComponent} from './books-list/books-list.component';
import {HttpClientModule} from '@angular/common/http';
import {BooksOffersComponent} from './books-offers/books-offers.component';

@NgModule({
  declarations: [BooksListComponent, BooksOffersComponent],
  imports: [HttpClientModule,
    CommonModule,
  ],
  exports: [BooksListComponent, BooksOffersComponent],
  providers: []
})
export class BooksModule {
}
