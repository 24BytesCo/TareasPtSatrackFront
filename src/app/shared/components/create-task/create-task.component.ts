import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';

import {
  Category,
  CreateTaskRequest,
  Task,
} from 'src/app/modules/tasks/interfaces/task.interface';
import { TaskService } from 'src/app/modules/tasks/services/task.service';
import { NotifyService } from '../../services/Notify.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  titulo: string = '';
  fechaLimite: string = '';
  categoriaId: string = ''; // Inicialízalo con un valor predeterminado si es necesario

  createTaskRequest!: CreateTaskRequest;

  categorias: Array<Category> = [];

  constructor(
    private _categoryService: CategoryService,
    private _taskService: TaskService,
    private _notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this._categoryService.getAllCategoriesObservable().subscribe((r) => {
      this.categorias = r;
    });
    // Obtener y mostrar todas las categorías
    this.consultarTodasCategorias();
  }

  onSubmit() {
    // Crear una solicitud de tarea con los datos del formulario
    this.createTaskRequest = {
      categoryId: this.categoriaId,
      deadline: this.fechaLimite,
      title: this.titulo,
      description: '',
    };

    // Emitir un evento para cerrar el modal
    this.cerrarModal.emit(true);

    // Crear una nueva tarea y manejar la respuesta
    this._taskService.createTask(this.createTaskRequest).subscribe((res) => {
      // Mostrar una notificación de éxito
      this._notifyService.smallRightAlertSucces(
        'Tarea Creada correctamente',
        3000
      );

      // Consultar todas las tareas
      this.consultarTodasTareas();
      this.consultarTodasTareasPendientes();
    });

    //Resetenado forulario
    this.categoriaId = '';
    this.fechaLimite = '';
    this.titulo = '';
  }

  consultarTodasCategorias() {
    this._categoryService
      .getAllCategories()
      .subscribe((res: Array<Category>) => {
        this._categoryService.updateAllTaskObservable(res);
      });
  }

  // Consultar y actualizar la lista de todas las tareas
  consultarTodasTareas() {
    this._taskService.getAllTask().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskObservable(res);
    });
  }

  // Consultar y actualizar la lista de tareas pendientes
  consultarTodasTareasPendientes() {
    this._taskService.getAllTaskPending().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskPendingObservable(res);
    });
  }
}
