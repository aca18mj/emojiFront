import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  @ViewChild('f') form: NgForm | undefined;
  prediction = '💬👉😜';

  constructor (private http: HttpClient) {}

  onSubmit(): void {
    if (this.form?.invalid)
      return
    
    const query = this.form?.value.sentence;
    console.log('Predicting ' + query);

    this.http.get('http://127.0.0.1:5000/predict',
    {
      params: new HttpParams().set('input', query)
    })
    .subscribe((response: any)  => {
      console.log(response);
      this.prediction = response[0] + response[1] + response[2];
    })
  }
}
