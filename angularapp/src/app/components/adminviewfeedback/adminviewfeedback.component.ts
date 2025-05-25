import { Component } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent {

  feedbacks: Feedback[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  showModal: boolean = false;
  selectedUser: User | null = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data || [];
        this.errorMessage = '';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load feedbacks.';
        this.feedbacks = [];
        this.loading = false;
      }
    });
  }

  openProfile(user: User | undefined) {
    if (user) {
      this.selectedUser = user;
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }
}
