import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { DataService } from '../data-service';

@Directive({
  selector: '[select]',
})
export class SelectDirective implements OnInit {
  @Input() id: string;
  @Input() index: number;
  @Input() team: 'A' | 'B';
  click: 'A' | 'B' = null;
  constructor(private dataService: DataService, private elRef: ElementRef) {}

  @HostListener('click') onClick() {
    let elementClass = this.elRef.nativeElement.classList;
    this.dataService.selectedOrNotSelected(this.id, this.team);
    // this.dataService.transfer(this.id);

    console.log(this.dataService.teamAStudents);

    if (this.team === 'A') {
      console.log();
      if (elementClass.contains('list-group-item-success')) {
        elementClass.remove('list-group-item-success');

        if (
          this.dataService.teamAStudents.every(
            (student) => student.selected === false
          )
        )
          this.dataService.clickedOn.next(null);

        //   console.log('h');
        // if (
        //   !Array.from(this.elRef.nativeElement.closest('ul').children).some(
        //     (child: any) => child.classList.contains('list-group-item-success')
        //   )
        // )

        // }
      } else {
        elementClass.add('list-group-item-success');

        // if (
        //   !this.dataService.teamAStudents.some(
        //     (student) => student.selected === true
        //   )
        // )
        this.dataService.clickedOn.next('A');
      }
    }

    if (this.team === 'B') {
      if (elementClass.contains('list-group-item-primary')) {
        elementClass.remove('list-group-item-primary');

        if (
          this.dataService.teamBStudents.every(
            (student) => student.selected === false
          )
        )
          this.dataService.clickedOn.next(null);
      } else {
        elementClass.add('list-group-item-primary');
        this.dataService.clickedOn.next('B');
      }
    }

    // this.dataService.transferV2();
    // console.log(this.dataService.getAllStudents());
  }

  ngOnInit(): void {}
}