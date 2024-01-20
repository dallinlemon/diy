import { Component, Input, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs";
import Group from "src/app/models/group.model";
import { GroupStoreService } from "src/app/services/store/group-store.service";
import { BaseComponent } from "../base-component.ts/base-component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'add-group-popup',
  templateUrl: './add-group-popup.html',
  styleUrls: ['./add-group-popup.css'],
})
export class AddGroupPopup extends BaseComponent implements OnInit {
  public groupName: string = '';
  public groupNotes: string = '';

  constructor(
    private groupStoreService: GroupStoreService,
    private dialogRef: MatDialogRef<AddGroupPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }
  ngOnInit(): void {
    this.logger.trace(AddGroupPopup.name, 'ngOnInit', 'was called');
  }

  public groupNameChanged(event: any) {
    if (!event || !event.target) return;
    this.groupName = event.target.value || '';
  }

  public groupNotesChanged(event: any) {
    if (!event || !event.target) return;
    this.groupNotes = event.target.value || '';
  }

  public createGroup() {
    this.logger.trace(AddGroupPopup.name, 'createGroup', 'was called');
    this.logger.debug(AddGroupPopup.name, 'createGroup', 'groupName:', this.groupName);
    if(!this.validateGroupName() || !this.validateGroupNotes()) {
      this.displayError('Please enter a value for name and notes.');
      return;
    }
    this.groupStoreService.addGroup(new Group(
      0,
      1, // TODO get budget id
      this.groupName,
      true,
      new Date(),
      this.groupNotes,
    ));
    this.dialogRef.close();
  }

  private resetForm() {
    this.groupName = '';
    this.groupNotes = '';
  }
  private validateGroupName(): boolean {
    return this.groupName.length > 0;
  }

  private validateGroupNotes(): boolean {
    return this.groupNotes.length > 0;
  }

  private displayError(message: string) {
    this.logger.debug(AddGroupPopup.name, 'displayError', message);
    // TODO display error
  }

}
