import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {
  feedbackForm: FormGroup;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router
  ) {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  submitFeedback() {
    if (this.feedbackForm.invalid) return;
    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Get userId from localStorage (or AuthService)
    const userId = Number(localStorage.getItem('userId'));
    const feedback = {
      userId,
      feedbackText: this.feedbackForm.value.feedbackText
    };

    this.feedbackService.sendFeedback(feedback).subscribe({
      next: () => {
        this.successMessage = 'Feedback submitted successfully!';
        this.feedbackForm.reset();
        setTimeout(() => this.router.navigate(['/userfeedback']), 1500);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Failed to submit feedback.';
        this.submitting = false;
      }
    });
  }
}