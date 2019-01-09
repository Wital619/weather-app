import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchContainerComponent} from './search-container/search-container.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {SuggestionsListComponent} from './suggestions-list/suggestions-list.component';

@NgModule({
  declarations: [
    SearchContainerComponent,
    SearchInputComponent,
    SuggestionsListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchContainerComponent
  ]
})
export class SearchModule {}
