import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksListComponent} from './books/books-list/books-list.component';
import {BooksOffersComponent} from './books/books-offers/books-offers.component';

const routes: Routes = [
  {
    path: 'books',
    component: BooksListComponent,
  },
  {
    path: 'books/checkout',
    component: BooksOffersComponent,
  }
  ,
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
