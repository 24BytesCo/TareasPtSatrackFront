import { Component } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
})
export class CompletedTasksPageComponent {
  allTasks: Array<Task> = []; // Inicializar una lista vacía para almacenar todas las tareas completadas

  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    // Suscribirse a cambios en la lista de tareas completadas
    this._taskService.getAllTaskComletedObservable().subscribe((r) => {
      this.allTasks = r; // Actualizar la lista de tareas completadas cuando haya cambios
    });

    // Obtener la lista de tareas completadas desde el servicio y actualizar la lista observada
    this._taskService.getAllTaskCompleted().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskComletedObservable(res);
    });
  }
}
