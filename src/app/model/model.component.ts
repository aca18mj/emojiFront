import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { retry } from 'rxjs';
import { ModelMessenger } from './model-messenger.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @ViewChild('f') form: NgForm | undefined;
  prediction = '💬👉😜';
  modelStatus = '';
  isLoading = false;

  constructor(private http: HttpClient, private modelMessenger: ModelMessenger) { }

  onSubmit(): void {
    if (this.form?.invalid)
      return

    this.prediction = '';
    this.isLoading = true;
    const query = this.form?.value.sentence;

    this.modelMessenger.getSentiment(query)
      .pipe(retry(3))
      .subscribe({
        next: (response: {[key: number]: string}) => {
          for (let i = 0; i < 3; i++) {
            if (response[i] == '☺️')
              response[i] = '🙂';
            else if (response[i] == ':hugging_face:')
              response[i] = '🤗';
          }
          this.prediction = response[0] + response[1] + response[2];
          this.isLoading = false;
        },
        error: (e) => {
          this.modelMessenger.checkOrInitialise();
        }
      });
  }

  ngOnInit(): void {
    this.modelMessenger.checkOrInitialise();
    this.modelMessenger.modelStatus.subscribe((status: string) => {
      this.modelStatus = status;
      this.isLoading = false;
    })
  }
}
