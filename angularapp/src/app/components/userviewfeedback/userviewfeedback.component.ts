import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.loading = true;
    this.errorMessage = '';
    const userId = Number(localStorage.getItem('userId'));
    this.feedbackService.getAllFeedbacksByUserId(userId).subscribe({
      next: (data) => {
        this.feedbacks = data || [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load feedbacks.';
        this.loading = false;
      }
    });
  }

  deleteFeedback(feedbackId: number): void {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    this.feedbackService.deleteFeedback(feedbackId).subscribe({
      next: () => {
        this.successMessage = 'Feedback deleted successfully!';
        this.getFeedbacks();
      },
      error: () => {
        this.errorMessage = 'Failed to delete feedback.';
      }
    });
  }
}