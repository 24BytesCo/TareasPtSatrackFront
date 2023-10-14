import {
  Task,
  UpdateTaskRequest,
} from './../../../modules/tasks/interfaces/task.interface';
import { Component, Input } from '@angular/core';
import { Category } from '../../../modules/tasks/interfaces/task.interface';
import { TaskService } from 'src/app/modules/tasks/services/task.service';
import { NotifyService } from '../../services/Notify.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  category: Category = {
    categoryId: '',
    name: '',
    status: false,
  };
  updateTaskRequest!: UpdateTaskRequest;

  @Input() task: Task = {
    title: '',
    category: this.category,
    createdDate: '',
    deadline: '',
    description: '',
    lastUpdateDate: '',
    status: false,
    taskId: '',
  };

  constructor(
    private _taskService: TaskService,
    private notifyService: NotifyService
  ) {}

  // Método para activar o completar una tarea
  activar(task: Task) {
    task.status = !task.status;

    this.updateTaskRequest = {
      deadline: task.deadline,
      status: this.task.status,
      taskId: task.taskId,
    };

    // Actualizar el estado de la tarea en el servidor
    this._taskService.updateTask(this.updateTaskRequest).subscribe((res) => {
      let mensaje = this.task.status
        ? 'Se ha activado la tarea'
        : 'Se ha completado la tarea';
      this.notifyService.smallRightAlertSucces(mensaje, 2000);

      // Consultar y actualizar las listas de tareas
      this.consultarTodasTareas();
      this.consultarTodasTareasPendientes();
      this.consultarTodasTareasTerminadas();
    });
  }

  // Método para consultar y actualizar la lista de todas las tareas
  consultarTodasTareas() {
    this._taskService.getAllTask().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskObservable(res);
    });
  }

  // Método para consultar y actualizar la lista de tareas pendientes
  consultarTodasTareasPendientes() {
    this._taskService.getAllTaskPending().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskPendingObservable(res);
    });
  }

  // Método para consultar y actualizar la lista de tareas terminadas
  consultarTodasTareasTerminadas() {
    this._taskService.getAllTaskCompleted().subscribe((res: Array<Task>) => {
      this._taskService.updateAllTaskComletedObservable(res);
    });
  }

  formatFecha(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Establecer la hora actual a la medianoche

    // Definir los nombres de los meses y los minutos
    const meses: string[] = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    const horas: number = fecha.getHours();
    const minutos: number = fecha.getMinutes();
    const ampm: string = horas >= 12 ? 'PM' : 'AM';
    const hora12: number = horas % 12 || 12;

    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth();
    const anio: number = fecha.getFullYear();

    // Calcular la diferencia en días
    const tiempoDiferencia: number = fecha.getTime() - fechaActual.getTime();
    const diferenciaDias: number = Math.floor(
      tiempoDiferencia / (1000 * 60 * 60 * 24)
    );

    // Formatear los minutos para que siempre tengan dos dígitos
    const minutosFormateados = minutos < 10 ? `0${minutos}` : `${minutos}`;

    console.log('calculando fecha', fecha);
    console.log('calculando fecha', fechaActual);

    if (diferenciaDias === 0) {
      // Verificar si la fecha es hoy o en el futuro
      if (fecha > fechaActual) {
        return `Hoy a las ${hora12}:${minutosFormateados} ${ampm}`;
      } else {
        return `Mañana a las ${hora12}:${minutosFormateados} ${ampm}`;
      }
    } else if (diferenciaDias === 1) {
      return `Mañana a las ${hora12}:${minutosFormateados} ${ampm}`;
    } else {
      if (diferenciaDias == -1) {
        return `Venció Ayer, el ${dia} de ${meses[mes]} a las ${hora12}:${minutosFormateados} ${ampm}`;
      }
      if (diferenciaDias == -2) {
        return `Venció Antes de ayer, el ${dia} de ${meses[mes]} a las ${hora12}:${minutosFormateados} ${ampm}`;
      }

      if (diferenciaDias < -2) {
        return `Venció el ${dia} de ${meses[mes]} a las ${hora12}:${minutosFormateados} ${ampm}`;
      }

      console.log('diferenciaDias', diferenciaDias);

      // Calcular la diferencia en días desde "Mañana"
      const diasDesdeManana = diferenciaDias - 1;

      if (diasDesdeManana === 1) {
        return `En 2 días, el ${dia} de ${meses[mes]} a las ${hora12}:${minutosFormateados} ${ampm}`;
      } else {
        return `En ${diasDesdeManana + 2} días, el ${dia} de ${
          meses[mes]
        } a las ${hora12}:${minutosFormateados} ${ampm}`;
      }
    }
  }
}
