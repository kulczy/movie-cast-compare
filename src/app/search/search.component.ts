import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup; // movies input group

  constructor( private moviesService: MoviesService ) {}

  ngOnInit() {
    // create input controls
    this.searchForm = new FormGroup({
      'movieA': new FormControl(null, Validators.required),
      'movieB': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.moviesService.getMovies(this.searchForm.value.movieA, this.searchForm.value.movieB);
    document.getElementById('movieA').blur(); // remove cursor after submit
    document.getElementById('movieB').blur(); // remove cursor after submit
    this.searchForm.reset(); // clear form after submit
  }

}
