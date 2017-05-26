import { Component, OnInit } from '@angular/core';
import { SearchHistoryService } from '../services/search-history.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html'
})
export class SearchHistoryComponent implements OnInit {

  constructor(private searchHistoryService: SearchHistoryService, private moviesService: MoviesService) { }

  ngOnInit() {
    this.searchHistoryService.getHistoryFromLocalStorage(); // get history from local storage    
  }

  getMovies(movieA, movieB) {
    this.moviesService.getMovies(movieA, movieB); // compare movies
  }

}
