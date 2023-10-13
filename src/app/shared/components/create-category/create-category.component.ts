import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from 'src/app/modules/tasks/services/task.service';
import { NotifyService } from '../../services/Notify.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent {
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  name: string = '';

  constructor(
    private _taskService: TaskService,
    private _notifyService: NotifyService,
    private _categoryService: CategoryService
  ) {}
  onSubmit() {
    // Emitir un evento para cerrar el modal
    this.cerrarModal.emit(true);

    // Crear una nueva categoria y manejar la respuesta
    this._categoryService.createCategory(this.name).subscribe((res) => {
      // Mostrar una notificación de éxito
      this._notifyService.smallRightAlertSucces(
        'Categoría Creada correctamente',
        3000
      );
      this._categoryService.getAllCategories().subscribe((r) => {
        this._categoryService.updateAllTaskObservable(r);
      });
    });

    //Resetenado forulario
    this.name = '';
  }
}
