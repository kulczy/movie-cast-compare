export class SearchHistoryService {
  searchHistory: any;
  
  getHistoryFromLocalStorage() {
    this.searchHistory = JSON.parse(localStorage.getItem('movieSearchHistory')) || []; // get history or create new one
  }

  saveHistory(movies) {    
    let newHistory = this.searchHistory.slice(0); // create copy of current history

    // remove duplicates
    newHistory = newHistory.filter(item => {      
      if (item.movieA === movies.movieA && item.movieB === movies.movieB) {
        return false;
      } else {
        return item;
      };
    });

    newHistory.unshift(movies); // add new movies
    newHistory = newHistory.slice(0, 6); // cut history to first 6 records
    this.searchHistory = newHistory; // set new history
    localStorage.setItem('movieSearchHistory', JSON.stringify(newHistory)); // save history to local storage
  }

}
