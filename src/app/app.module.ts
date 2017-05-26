import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesService } from './services/movies.service';
import { SearchHistoryService } from './services/search-history.service';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [MoviesService, SearchHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
