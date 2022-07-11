import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    console.log(this.downloadForm.value);
  }
}
