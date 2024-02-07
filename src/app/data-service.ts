import { Injectable } from '@angular/core';
import { DataModel, teamType } from './data-transfer/data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  teamAStudents: DataModel[] = [
    {
      id: Math.random().toString(16).slice(5),
      name: 'Dishant Valeja',
      emails: ['dishantvaleja@gmail.com', 'dishant5valeja@gmail.com'],
      selected: false,
      team: 'A',
      hobby: 'Cricket',
    },
    {
      id: Math.random().toString(16).slice(5),
      name: 'Test1',
      emails: ['test1@gmail.com', '1test@gmail.com'],
      selected: false,
      team: 'A',
      hobby: 'Basketball',
    },
    {
      id: Math.random().toString(16).slice(5),
      name: 'Test2',
      emails: ['test2@gmail.com', '2test@gmail.com'],
      selected: false,
      team: 'A',
      hobby: 'Football',
    },
  ];

  teamBStudents: DataModel[] = [];

  clickedOn = new Subject<'A' | 'B'>();

  addStudent(student: DataModel) {
    // this.teamAStudents.push(student);
    if (student.team === 'A') this.teamAStudents.push(student);
    if (student.team === 'B') this.teamBStudents.push(student);
  }

  getStudentById(id: string, team: teamType) {
    if (team === 'A') {
      return this.teamAStudents.find((student) => student.id === id);
    }
    if (team === 'B') {
      return this.teamBStudents.find((student) => student.id === id);
    }
  }

  editStudent(id: string, student: DataModel) {
    // let currentId = this.teamAStudents.findIndex(
    //   (student) => student.id === id
    // );
    student = {
      ...student,
      id: id,
      selected: false,
    };
    if (student.team === 'A') {
      if (!this.teamAStudents.some((studentA) => studentA.id === student.id)) {
        console.log('hello');
        this.teamBStudents.splice(
          this.teamBStudents.findIndex(
            (studentB) => studentB.id === student.id
          ),
          1
        );

        this.teamAStudents.push(student);
      } else {
        this.teamAStudents.forEach((studentA) => {
          if (studentA.id === id) {
            studentA.name = student.name;
            studentA.emails = student.emails;
            studentA.hobby = student.hobby;
          }
        });
      }
    }
    if (student.team === 'B') {
      if (!this.teamBStudents.some((studentB) => studentB.id === student.id)) {
        console.log('hello');
        this.teamBStudents.push(student);
        this.teamAStudents.splice(
          this.teamAStudents.findIndex(
            (studentA) => studentA.id === student.id
          ),
          1
        );
      } else {
        this.teamBStudents.forEach((studentB) => {
          if (studentB.id === id) {
            studentB.name = student.name;
            studentB.emails = student.emails;
            studentB.hobby = student.hobby;
          }
        });
      }
    }
  }

  selectedOrNotSelected(id: string, team) {
    if (team === 'A') {
      let student = this.teamAStudents.find((student) => student.id === id);

      student.selected = !student.selected;
      // console.log(this.teamAStudents);
    }

    if (team === 'B') {
      let student = this.teamBStudents.find((student) => student.id === id);

      student.selected = !student.selected;
      // console.log(this.teamBStudents);
    }
    // if (this.teamBStudents.some((student) => student.selected === true)) {
    //   let student = this.teamBStudents.find((student) => student.id === id);

    //   student.selected = !student.selected;
    // }
  }

  transfer(id: string) {
    this.teamBStudents.push(
      this.teamAStudents.find((student) => student.id === id)
    );
    this.teamAStudents.splice(
      this.teamAStudents.findIndex((student) => student.id === id),
      1
    );
  }

  transferV2(team: 'A' | 'B') {
    let indexArray = [];

    if (team === 'A') {
      this.teamBStudents.push(
        ...this.teamAStudents.filter((student, index) => {
          if (student.selected) {
            indexArray.push(index);
            student.team = 'B';
          }
          return student.selected === true;
        })
      );

      indexArray.sort((a, b) => b - a);

      for (const index of indexArray) {
        this.teamAStudents.splice(index, 1);
      }
    }

    if (team === 'B') {
      this.teamAStudents.push(
        ...this.teamBStudents.filter((student, index) => {
          if (student.selected) {
            indexArray.push(index);
            student.team = 'A';
          }
          return student.selected === true;
        })
      );

      indexArray.sort((a, b) => b - a);

      for (const index of indexArray) {
        this.teamBStudents.splice(index, 1);
      }
    }

    console.log('A: ', this.teamAStudents);
    console.log('B: ', this.teamBStudents);
  }

  deleteStudentById(id: string, team: teamType) {
    if (team === 'A') {
      this.teamAStudents.splice(
        this.teamAStudents.indexOf(
          this.teamAStudents.find((student) => {
            return student.id === id;
          })
        ),
        1
      );
    }

    if (team === 'B') {
      this.teamBStudents.splice(
        this.teamBStudents.indexOf(
          this.teamBStudents.find((student) => {
            return student.id === id;
          })
        ),
        1
      );
    }
  }
}
