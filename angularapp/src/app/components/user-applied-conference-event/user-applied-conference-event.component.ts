import { Component , OnInit } from '@angular/core';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';
import { Booking } from '../../models/booking.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-applied-conference-event',
  templateUrl: './user-applied-conference-event.component.html',
  styleUrls: ['./user-applied-conference-event.component.css']
})
export class UserAppliedConferenceEventComponent implements OnInit {
  conferenceevents: ConferenceEvent[] = [];
  conferenceEventList$!:Observable<any[]>;
  loading = false;
  errorMessage = '';
  successMessage = '';
  pageSize=10;
  currentPage=1;
  totalpages=1;
  pagedItems:any[]=[];
  bookings: Booking[] = [];
  constructor(private conferenceEventService: ConferenceEventService) {}

  ngOnInit(): void {
    this.totalpages=Math.ceil(this.conferenceevents.length/this.pageSize);
    this.updatePsgeItems();
   // this. getAllConferenceEvents();
    this. getAllConferenceEventBookings();
  }
  getAllConferenceEvents(): void {
    this.loading = true;
    this.errorMessage = '';
    this.conferenceEventList$= this.conferenceEventService.getAllConferenceEvents();
    error: () => {
      this.errorMessage = 'Failed to load conferenceEvents.';
      this.loading = false;
    }
  }
  async getAllConferenceEventBookings():Promise<void>{
    this.loading = true;
    this.errorMessage = '';
    try{
      const data=await firstValueFrom(
    this.conferenceEventService.getAllConferenceEventBookings());
        console.log('API response:',data);
        this.bookings = data;
      }catch(error) {
        console.error('API error:',error);
        this.errorMessage='Failed to load bookings';
      }
      finally{
        this.loading=false;
      }

  }
  
  updatePsgeItems(){
    const startIndex=(this.currentPage-1)*this.pageSize;
    const endIndex=(startIndex+this.pageSize);
    this.pagedItems=this.conferenceevents.slice(startIndex,endIndex);
  }
  gotoPage(page:number){
    this.currentPage=page;
    this.updatePsgeItems();
  }
  nextPage()
  {
    if(this.currentPage<this.totalpages)
    {
      this.currentPage++;
      this.updatePsgeItems();

    }
  }
  previousPage(){
    if(this.currentPage>1)
    {
      this.currentPage--;
    }
    this.updatePsgeItems();
  }
  
  getConferenceEvents(): void {
    this.loading = true;
    this.errorMessage = '';
    const conferenceEventId = Number(localStorage.getItem('ConferenceEventId'));
    this.conferenceEventService.getConferenceEventById(conferenceEventId).subscribe({
      next: (data) => {
        this.conferenceevents = Array.isArray(data) ? data: data ? [data]:[];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load conferenceEvents.';
        this.loading = false;
      }
    });
  }
   sortbyAscending(){
    const sortedConferenceEvents$: Observable<any[]>=this.conferenceEventList$.pipe(
      map(events => [...events].sort((a,b) => a.ConferenceEventId.localeCompare(b.ConferenceEventId)))
    );
  }
  sortbyDeascending(){
    const sortedConferenceEventsDescending$: Observable<any[]>=this.conferenceEventList$.pipe(
      map(events => [...events].sort((a,b) => b.ConferenceEventId.localeCompare(a.ConferenceEventId)))
    );
  }
  openRegisterForm(data:any)
{
  
}
  deleteConferenceEvent(conferenceEventId: number): void {
    if (!confirm('Are you sure you want to delete this ConferenceEventId?')) return;
    this.conferenceEventService.deleteConferenceEvent(conferenceEventId).subscribe({
      next: () => {
        this.successMessage = 'ConferenceEvent deleted successfully!';
        this.getConferenceEvents();
      },
      error: () => {
        this.errorMessage = 'Failed to delete ConferenceEvent.';
      }
    });
  }
}

