import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, retry, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ModelMessenger {
    private initialiseURL = 'SECRET';
    private predictURL = 'SECERT';

    modelStatus = new BehaviorSubject<string>('Checking');

    constructor(private http: HttpClient) { }

    checkOrInitialise() {
        //check if model is ready (wakes up the app and returns ready if sleeping)
        this.modelStatus.next('Checking');
        this.http.get<{ status: string }>(this.initialiseURL)
            .pipe(retry(3))
            .subscribe({
                next: (response) => {
                    if (response.status == 'Ready')
                        this.modelStatus.next('Ready');
                    else
                        this.modelStatus.next('Unavailable');
                },
                error: (e) => {
                    this.modelStatus.next('Unavailable');
                    console.log(e);
                }
            });
    }

    getSentiment(query: string): Observable<{ [key: number]: string }> {
        return this.http.get<{ [key: number]: string }>(this.predictURL,
            {
                params: new HttpParams().set('input', query)
            });
    }
}