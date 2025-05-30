import { Component } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent {

  feedbacks: Feedback[] = [];
  loading: boolean = false;

  showModal: boolean = false;
  selectedUser: User | null = null;

  constructor(private feedbackService: FeedbackService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.toastService.show(err.error?.message || 'Failed to load feedbacks.');
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
