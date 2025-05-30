import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { Feedback } from '../../models/feedback.model';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {
  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  submitFeedback() {
    if (this.feedbackForm.invalid) return;

    // Get userId from localStorage (or AuthService)
    const userId = Number(localStorage.getItem('userId'));
    const feedback:Feedback = {
      userId,
      feedbackText: this.feedbackForm.value.feedbackText
    };

    this.feedbackService.sendFeedback(feedback).subscribe({
      next: () => {
        this.toastService.show('Feedback submitted successfully!');
        this.feedbackForm.reset();
        this.router.navigate(['/userfeedback'])
      },
      error: err => {
        this.toastService.show(err.error?.message || 'Failed to submit feedback.');
      }
    });
  }
}