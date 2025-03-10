import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { AsyncPipe, NgStyle } from '@angular/common';
import { HaircaresService } from '../../services/haircares.service';
import { Tooltip } from 'bootstrap'

@Component({
    selector: 'app-events-calendar',
    imports: [FullCalendarModule, AsyncPipe, NgStyle, TranslateModule],
    templateUrl: './events-calendar.component.html',
    styleUrl: './events-calendar.component.scss'
})
export class EventsCalendarComponent {

  private translateService = inject(TranslateService)
  private eventsService = inject(EventsService)
  private haircaresService = inject(HaircaresService)

  public events$ = this.eventsService.getEvents();
  public haircares$ = this.haircaresService.getHaircares();
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    firstDay: 1,
    locale: this.translateService.currentLang,
    headerToolbar: {
      left: 'title',
      right: 'prev,next'
    },
    eventDidMount: (e) => {
      new Tooltip(e.el, {
        title: this.translateService.instant(e.event.extendedProps['description']),
        placement:'top',
        trigger: 'hover'
      })
    }
  };

  private subscription: Subscription = new Subscription();

  ngOnInit() {

    this.subscription = this.translateService.onLangChange.asObservable().subscribe({
      next: (event: LangChangeEvent) => {
        this.calendarOptions.locale = event.lang;
        console.log(event.lang);
      }
    })


  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
