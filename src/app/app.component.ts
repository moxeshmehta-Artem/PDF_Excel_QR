import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfReportComponent } from './pdf-report/pdf-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PDF_Excel_QR';
}
