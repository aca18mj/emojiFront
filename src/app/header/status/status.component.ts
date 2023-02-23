import { Component, OnInit } from '@angular/core';
import { ModelMessenger } from 'src/app/model/model-messenger.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  modelStatus = '';

  constructor(private modelMessenger: ModelMessenger) {}

  ngOnInit(): void {
    this.modelMessenger.modelStatus.subscribe((status: string) => {
      this.modelStatus = status;
    });
  }
}
