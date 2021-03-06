import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CitationService } from '../services/citation.service';
import { ConfirmComponent } from '../_helpers/confirm/confirm.component';
import { Citation } from '../_models/citation';

@Component({
  selector: 'app-list-citations',
  templateUrl: './list-citations.component.html',
  styleUrls: ['./list-citations.component.scss']
})
export class ListCitationsComponent implements OnInit {
citations: Citation[];
dataCitations: Citation[];
userId: number;
  constructor(private auth: AuthService, private citationService: CitationService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    try {
      this.citationService.currentCitations.subscribe((resp) => {
        this.citations = resp;
      })
      this.userId = this.auth.getUserId();
      this.citationService.selectAllByUser(this.userId);
    } catch(error) {
      console.log("__Error handled gracefully : ", error.name)
    }
    
  }

  deleteCitation(id: number): void {
    try {
      const dialogRef = this.matDialog.open(ConfirmComponent, {
        width: '350px',
        data: "Voulez-vous supprimer cette Citation ?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.citationService.delete(id, this.userId);
        };
      });
    } catch(error) {
      console.log("__Error handled gracefully : ", error.name)
    }
   
  };

}
