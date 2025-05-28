
import { Component , OnInit } from '@angular/core';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';
import { UserBookConferenceEventComponent } from '../../components/user-book-conference-event/user-book-conference-event.component';
import { Observable, catchError, finalize, of } from 'rxjs';
// import {Matdialog} from '@angular/material/dialogue';
// import { DialogFormComponent } from '../dialogue-form/dialogue-form.component';
//import {UserAppliedConferenceEventComponent} from '../../components/user-applied-conference-event';
@Component({
  selector: 'app-user-view-conference-event',
  templateUrl: './user-view-conference-event.component.html',
  styleUrls: ['./user-view-conference-event.component.css']
})
export class UserViewConferenceEventComponent  implements OnInit {
  conferenceevents: ConferenceEvent[] = [];
  conferenceevent: ConferenceEvent;
  conferenceEventList$!:Observable<any[]>;
  loading = false;
  errorMessage = '';
  successMessage = '';
  pageSize=10;
  currentPage=1;
  totalpages=1;
  pagedItems:any[]=[];
  today: Date= new Date();
  constructor(private conferenceEventService: ConferenceEventService) {}
//constructor(private dialogue:Matdialog){}
  ngOnInit(): void {
    this.getEvents();
    this.totalpages=Math.ceil(this.conferenceevents.length/this.pageSize);
    this.updatePsgeItems();
    //this.getConferenceEvents();
    this. getAllConferenceEvents();
  }
  getEvents(){
    this.conferenceEventService.getAllConferenceEvents().subscribe((data) =>{
      this.conferenceevents=data;
      this.totalpages=Math.ceil(this.conferenceevents.length/this.pageSize);
      this.updatePsgeItems();
    }
    );
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
  getAllConferenceEvents(): void {
    this.loading = true;
    this.errorMessage = '';
    this.conferenceEventService.getAllConferenceEvents().subscribe(
      (data)=> {
        console.log('API response:',data);
        this.conferenceevents = data;
        this.loading=false;
      },
      (error) => {
        console.error('API error:',error);
        this.errorMessage='Failed to load conference event';
        this.loading=false;
      }
    
    );
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
  isRegistrationClosed(endDateStr:string): boolean
  {
    const today=new Date();
    today.setHours(0,0,0,0);
    const endDate= new Date(endDateStr);
    endDate.setHours(0,0,0,0);
    return endDate<today;
  }
openDialog():void
{
  // this.dialogue.open(DialogFormComponent,
  //   {
  //     width:'400px',
  //     disableClose:true,
  //   });
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