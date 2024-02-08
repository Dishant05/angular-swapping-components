import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DataTransferComponent } from './data-transfer/data-transfer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectDirective } from './data-transfer/selected.directive';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchItemsComponent } from './search-items/search-items.component';
import { AutocompleteComponent } from './search-items/autocomplete/autocomplete.component';
import { FilterComponent } from './search-items/filter/filter.component';
import { FilterPipe } from './search-items/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DataTransferComponent,
    SelectDirective,
    SearchItemsComponent,
    AutocompleteComponent,
    FilterComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
