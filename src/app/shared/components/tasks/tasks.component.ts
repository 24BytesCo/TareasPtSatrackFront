import { Component, Input } from '@angular/core';
import { Task } from 'src/app/modules/tasks/interfaces/task.interface';

@Component({
  selector: 'app-tasksT',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  @Input() listTask: Array<Task> = [];

  cerrarModal(cerrar: boolean) {
    if (cerrar) {
      const modal = document.getElementById('exampleModal');

      if (modal) {
        modal.classList.remove('show');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.classList.remove('modal-backdrop', 'fade', 'show');
        }
        modal.style.display = 'none';
      }
    }
  }

  cerrarModalCategoria(cerrar: boolean) {
    if (cerrar) {
      const modal = document.getElementById('createcategory');

      if (modal) {
        modal.classList.remove('show');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.classList.remove('modal-backdrop', 'fade', 'show');
        }
        modal.style.display = 'none';
      }
    }
  }
}
