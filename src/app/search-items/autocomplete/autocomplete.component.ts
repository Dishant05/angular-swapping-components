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
  filter,
  fromEvent,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  studentNames: string[] = [];
  searchedNames: string[] = [];
  searching: boolean = true;
  showSearches: boolean = false;
  sub: Subscription;
  filterString: string;

  @ViewChild('studentNameSearchInput') searchInputRef: ElementRef;
  constructor(
    private dataService: DataService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.dataService.teamBStudents.forEach((student) => {
      this.studentNames.push(student.name);
    });

    this.dataService.teamAStudents.forEach((student) => {
      this.studentNames.push(student.name);
    });
    console.log(this.studentNames);
  }

  search(e) {
    const searches$ = fromEvent(
      this.searchInputRef.nativeElement,
      'keyup'
    ).pipe(
      map((event: any) => event.target.value),
      // filter((name) => name.length > 2),
      tap(() => (this.searching = true)),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((name) =>
        this.searchInputRef.nativeElement.value == ''
          ? [this.studentNames]
          : [this.filterNames(name)]
      ),
      tap(() => (this.searching = false))
    );

    //   .subscribe();

    this.sub = searches$.subscribe((data: string[]) => {
      this.searchedNames = data;
    });

    // searches$.subscribe((names: any) => {
    //   console.log(names.target.value);
    // });
    // let test = this.filterNames('Dish');
    // console.log(test);
  }

  hideOrShowSearches(e) {
    this.showSearches = this.searchInputRef.nativeElement.contains(e.target)
      ? true
      : false;
  }

  filterNames(name: string) {
    return this.studentNames.filter((sName) => {
      return sName.toLowerCase().startsWith(name.toLowerCase()) == true;
    });
  }

  toSelect(name: string) {
    this.searchInputRef.nativeElement.value = name;
  }

  toFilter() {
    this.filterString = this.searchInputRef.nativeElement.value;

    this.filterService.filterSub.next(this.filterString);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
