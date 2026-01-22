import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

import * as XLSX from 'xlsx';

@Component({
    selector: 'app-pdf-report',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pdf-report.component.html',
    styleUrl: './pdf-report.component.css'
})
export class PdfReportComponent {

    users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'User' },
        { id: 4, name: 'Sara Conner', email: 'sara@example.com', role: 'Manager' },
    ];

    constructor() { }

    exportPdf() {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('User Report', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);

        const date = new Date().toLocaleDateString();
        doc.text(`Date: ${date}`, 14, 30);

        const head = [['ID', 'Name', 'Email', 'Role']];
        const data = this.users.map(user => [user.id, user.name, user.email, user.role]);

        autoTable(doc, {
            head: head,
            body: data,
            startY: 35,
            theme: 'grid',
        });

        doc.save('user-report.pdf');
    }

    exportExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        XLSX.writeFile(wb, 'user-report.xlsx');
    }
    genQr() {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('User Report', 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);

  const date = new Date().toLocaleDateString();
  doc.text(`Date: ${date}`, 14, 30);

  const head = [['ID', 'Name', 'Email', 'Role']];
  const data = this.users.map(user => [user.id, user.name, user.email, user.role]);

  autoTable(doc, {
    head: head,
    body: data,
    startY: 35,
    theme: 'grid',
  });

  const qrData = 'https://example.com/report'; 
  QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err:any, url:any) => {
    if (err) {
      console.error(err);
      return;
    }

    doc.addImage(url, 'PNG', 150, 80, 50, 50);

    doc.save('Qr_Report.pdf');
  });
}
}
