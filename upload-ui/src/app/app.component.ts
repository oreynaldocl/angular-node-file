import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { File } from './models';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  files: File[] = [];
  downloadForm = new FormGroup({
    fileName: new FormControl('', [Validators.nullValidator, Validators.required]),
  });
  downloading = false;
  faSpinner = faSpinner;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private uploadService: UploadService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAllFiles(): void {
    this.uploadService.getFiles().pipe(
      takeUntil(this.destroy$),
    ).subscribe((files: File[]) => {
      this.files = files;
    });
  }

  onRequestFile(): void {
    this.downloading = true;
    const {fileName} = this.downloadForm.value;
    console.log(fileName);

    timer(2*1000).pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.downloading = false;
      }),
    ).subscribe(() => {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', `/api/files/${fileName}`);
      link.setAttribute('download', `products.csv`);

      const download = document.getElementById("download");
      download?.appendChild(link);

      link.click();
      link.remove();
    });
  }
}
