import { Component , OnInit } from '@angular/core';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';

@Component({
  selector: 'app-user-book-conference-event',
  templateUrl: './user-book-conference-event.component.html',
  styleUrls: ['./user-book-conference-event.component.css']
})
export class UserBookConferenceEventComponent implements OnInit {
  conferenceevents: ConferenceEvent[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  pageSize=10;
  currentPage=1;
  totalpages=1;
  pagedItems:any[]=[];
  constructor(private conferenceEventService: ConferenceEventService) {}

  ngOnInit(): void {
    this.totalpages=Math.ceil(this.conferenceevents.length/this.pageSize);
    this.updatePsgeItems();
    this.getConferenceEvents();

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
    
  }
  sortbyDeascending(){
    
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
