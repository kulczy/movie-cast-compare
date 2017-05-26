import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SearchHistoryService } from './search-history.service';

@Injectable()
export class MoviesService {
  isLoading: boolean = false;
  movieAInfo: any;
  movieBInfo: any;
  errorMessage: any;
  common: any;  

  constructor( private http: Http, private searchHistoryService: SearchHistoryService ) {}

  private findCommonCast() {
    // looking for common cast
    let movieACast = this.movieAInfo.Actors.split(', ');
    let movieBCast = this.movieBInfo.Actors.split(', ');
    let commonCast = movieACast.filter(name => {
      if (movieBCast.indexOf(name) > -1) return true;
    });

    // looking for common directors
    let movieADirector = this.movieAInfo.Director.split(', ');
    let movieBDirector = this.movieBInfo.Director.split(', ');
    let commonDirector = movieADirector.filter(name => {
      if (movieBDirector.indexOf(name) > -1) return true;
    });

    if (commonCast.length || commonDirector.length) {
      return { cast: commonCast, director: commonDirector };
    } else {
      return null;
    }
  }  

  getMovies(movieATitle: string, movieBTitle: string) {
    let apiUrl = 'http://www.omdbapi.com/?apikey=686ba7d1&t=';
    let getMovieA = this.http.get(apiUrl + movieATitle).map(res => res.json());
    let getMovieB = this.http.get(apiUrl + movieBTitle).map(res => res.json());

    this.movieAInfo = null;
    this.movieBInfo = null;
    this.common = null;
    this.errorMessage = null;
    this.isLoading = true;

    Observable.forkJoin([getMovieA, getMovieB])
      .subscribe(
        results => {
          if (results[0].Response === "False" || results[1].Response === "False") {
            this.errorMessage = 'No movies found';
          } else {
            this.movieAInfo = results[0];
            this.movieBInfo = results[1];
            this.common = this.findCommonCast();
            this.errorMessage = this.common ? null : 'No common cast';
            this.searchHistoryService.saveHistory({ movieA: this.movieAInfo.Title, movieB: this.movieBInfo.Title }); // save in history
          }                    
          this.isLoading = false;          
        },
        error => {
          this.errorMessage = 'App error :)';
          this.isLoading = false;
        }
      );
  }
}
