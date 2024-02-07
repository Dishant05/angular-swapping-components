import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../../data-service';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  studentNames: string[] = [];
  searchedNames: string[] = [];
  searching: boolean = false;
  showSearches: boolean = false;

  @ViewChild('studentNameSearchInput') searchInputRef: ElementRef;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.teamAStudents.forEach((student) => {
      this.studentNames.push(student.name);
    });
    console.log(this.studentNames);
  }

  search() {
    const searches$ = fromEvent(
      this.searchInputRef.nativeElement,
      'keyup'
    ).pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      tap(() => (this.searching = true)),
      distinctUntilChanged(),
      switchMap((name) =>
        name ? [this.filterNames(name)] : [this.studentNames]
      ),
      tap(() => (this.searching = false))
    );

    //   .subscribe();

    searches$.subscribe((data: string[]) => {
      this.searchedNames = data;
    });

    // searches$.subscribe((names: any) => {
    //   console.log(names.target.value);
    // });
    // let test = this.filterNames('Dish');
    // console.log(test);
  }

  filterNames(name: string) {
    return this.studentNames.filter((sName) => {
      return sName.toLowerCase().includes(name.toLowerCase()) == true;
    });
  }

  ngOnDestroy(): void {}
}
