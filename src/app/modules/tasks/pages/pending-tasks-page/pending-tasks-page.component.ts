import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-pending-tasks-page',
  templateUrl: './pending-tasks-page.component.html',
  styleUrls: ['./pending-tasks-page.component.css'],
})
export class PendingTasksPageComponent {
  allTasks: Array<Task> = [];

  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this._taskService
      .getAllTaskPendingObservable()
      .subscribe((res: Array<Task>) => {
        this.allTasks = res;
      });

    this._taskService.getAllTaskPending().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskPendingObservable(res);
    });
  }
}
