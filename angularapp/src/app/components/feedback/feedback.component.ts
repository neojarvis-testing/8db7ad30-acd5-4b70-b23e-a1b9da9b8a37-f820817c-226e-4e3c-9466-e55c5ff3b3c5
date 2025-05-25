import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [
    {
      feedbackId: 1,
      userId: 1,
      feedbackText: 'The conference was well-organized and insightful. Great speakers!',
      date: new Date('2025-05-27')
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}