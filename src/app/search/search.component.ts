import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  //constructor is not called again when navigating to the same route with a different parameter.So does ngOnInit().
  constructor(private route: ActivatedRoute, private router: Router) {
    //Even though the component instance is reused, the route parameters can still change. That's why you need to subscribe to this.route.params to detect and react to those changes
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      console.log('SearchComponent route params');
    });
    console.log('SearchComponent constructor called');
  }
  ngOnInit() {
    console.log('SearchComponent ngOnInit called');
  }


  //Scenario 1: Navigating to /search/term1

  // The constructor, ngOnInit, and other lifecycle hooks are called once when the component is created.

  //   Scenario 2: Navigating to / search / term2

  // If you navigate within the same route(from / search / term1 to / search / term2), Angular does not recreate the component, so the constructor and ngOnInit are not called again.
  //   However, if you're using route parameters like this.route.params, those parameters will update, and you can react to that change using ngOnChanges or by subscribing to route parameter changes manually.
  search() {
    this.searchTerm = this.searchTerm;
    if (this.searchTerm) {

      this.router.navigate(['/search', this.searchTerm]);
    }
    else if (this.searchTerm === '') {
      this.router.navigate(['/search']);
    }
  }
  //Angular reuses components for the same route, ngOnDestroy() does NOT trigger when navigating within the same route (e.g., from /search/term1 to /search/term2).
  // ngOnDestroy() {
  //If you navigate from /search/term1 to /home, Angular destroys the SearchComponent.
  //ngOnDestroy() will be triggered.
  //  }
}
