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

  showDeleteModal = false;
  feedbackIdToDelete: number | null = null;

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

  openDeleteModal(feedbackId: number): void {
    this.feedbackIdToDelete = feedbackId;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.feedbackIdToDelete = null;
  }

  confirmDelete(): void {
    if (this.feedbackIdToDelete == null) return;
    this.feedbackService.deleteFeedback(this.feedbackIdToDelete).subscribe({
      next: () => {
        this.successMessage = 'Feedback deleted successfully!';
        this.getFeedbacks();
        this.closeDeleteModal();
      },
      error: () => {
        this.errorMessage = 'Failed to delete feedback.';
        this.closeDeleteModal();
      }
    });
  }
}