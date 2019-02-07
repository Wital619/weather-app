import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchContainerComponent } from './search-container/search-container.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchContainerComponent,
    SearchInputComponent,
    SuggestionsListComponent
  ],
  exports: [
    SearchContainerComponent
  ]
})
export class SearchModule {}
