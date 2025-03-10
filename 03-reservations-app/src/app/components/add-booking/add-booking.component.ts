import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HaircaresService } from '../../services/haircares.service';
import { HoursService } from '../../services/hours.service';
import { IHaircare } from '../../models/haircare.model';
import { IHour } from '../../models/hour.model';
import { EventsService } from '../../services/events.service';
import { IBooking } from '../../models/booking.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-booking',
    imports: [TranslateModule, ReactiveFormsModule, NgClass],
    templateUrl: './add-booking.component.html',
    styleUrl: './add-booking.component.scss',
    providers: [
        DatePipe
    ]
})
export class AddBookingComponent {

  // Servicios
  private formBuilder: FormBuilder = inject(FormBuilder);
  private datePipe: DatePipe = inject(DatePipe);
  private haircareService = inject(HaircaresService);
  private hourService = inject(HoursService);
  private eventService = inject(EventsService);
  private toastrService = inject(ToastrService);
  private translateService = inject(TranslateService)

  // Form group con los controles del formulario
  public formGroup: FormGroup = new FormGroup({});
  // Haircares disponibles
  public haircares: IHaircare[] = [];
  // Horas disponibles
  public hours: IHour[] = [];

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      date: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required),
      time: new FormControl('', Validators.required),
      haircare: new FormControl('', Validators.required)
    })

    // Obtenemos los haircares y seteamos el select con el primer valor
    this.haircareService.getHaircares().subscribe({
      next: (haircares: IHaircare[]) => {
        this.haircares = haircares;
        this.controlHaircare?.setValue(haircares[0].value);
      }
    })

    // Obtenemos las horas y seteamos el select con el primer valor
    this.hourService.getHours().subscribe({
      next: (hours: IHour[]) => {
        this.hours = hours;
        this.controlTime?.setValue(hours[0].value);
      }
    })

  }

  // Obtencion de controles de forma sencilla
  get controlName() {
    return this.formGroup.get('name')
  }

  get controlDate() {
    return this.formGroup.get('date')
  }

  get controlHaircare() {
    return this.formGroup.get('haircare')
  }

  get controlTime() {
    return this.formGroup.get('time')
  }

  /**
   * Creamos la reserva
   */
  addBooking() {

    // Obtenemos el booking del formulario
    const booking: IBooking = this.formGroup.value;
    console.log(booking);

    // Creamos el evento
    this.eventService.createEvent(booking).subscribe({
      next: (event) => {
        console.log(event);
        this.toastrService.success(
          this.translateService.instant('add.booking.success'),
          this.translateService.instant('success')
        );
      },
      error: () => {
        // error
        console.error("Ha habido un error");
        this.toastrService.error(
          this.translateService.instant('booking.exists'),
          this.translateService.instant('error')
        );
      }
    })

  }

}
