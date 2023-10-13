import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-all-tasks-page',
  templateUrl: './all-tasks-page.component.html',
  styleUrls: ['./all-tasks-page.component.css'],
})
export class AllTasksPageComponent {
  allTasks: Array<Task> = []; // Inicializar una lista vacía para almacenar todas las tareas

  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    // Suscribirse a cambios en la lista de tareas
    this._taskService.getAllTaskObservable().subscribe((res: Array<Task>) => {
      this.allTasks = res; // Actualizar la lista de tareas cuando haya cambios
    });

    // Obtener la lista de tareas desde el servicio y actualizar la lista observada
    this._taskService.getAllTask().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskObservable(res);
    });
  }
}
