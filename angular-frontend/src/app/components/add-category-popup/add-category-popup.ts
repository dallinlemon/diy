import { Component, Input, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs";
import Category from "src/app/models/category.model";
import Group from "src/app/models/group.model";
import { CategoriesStoreService } from "src/app/services/store/category-store.service";
import { GroupStoreService } from "src/app/services/store/group-store.service";
import { BaseComponent } from "../base-component.ts/base-component";
import { DialogRef } from "@angular/cdk/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'add-category-popup',
  templateUrl: './add-category-popup.html',
  styleUrls: ['./add-category-popup.css'],
})
export class AddCategoryPopup extends BaseComponent implements OnInit {
  public categoryGroupID: string = '';
  public categoryName: string = '';
  public categoryNotes: string = '';
  public groups: Group[] = [];

  constructor(
    private groupStoreService: GroupStoreService,
    private categoryStoreService: CategoriesStoreService,
    private dialogRef: DialogRef<AddCategoryPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }
  ngOnInit(): void {
    this.logger.trace(AddCategoryPopup.name, 'ngOnInit', 'was called');

    this.groupStoreService.groups$.subscribe((groups: Group[]) => {
      this.groups = groups;
    });
  }

  public categoryNameChanged(event: any) {
    if (!event || !event.target) return;
    this.categoryName = event.target.value || '';
  }

  public categoryNotesChanged(event: any) {
    if (!event || !event.target) return;
    this.categoryNotes = event.target.value || '';
  }

  public createCategory() {
    this.logger.trace(AddCategoryPopup.name, 'createCategory', 'was called');
    this.logger.debug(AddCategoryPopup.name, 'createCategory', 'category name:', this.categoryName);
    if(!this.validateCategoryName() || !this.validateCategoryNotes()) {
      this.displayError('Please enter a value for name and notes.');
      return;
    }
    this.categoryStoreService.addCategories(new Category(
      0,
      Number.parseInt(this.categoryGroupID),
      this.categoryName,
      new Map<string, number>(),
      new Date(),
      this.categoryNotes,
    ));
    this.dialogRef.close();
  }

  private resetForm() {
    this.categoryName = '';
    this.categoryNotes = '';
    this.categoryGroupID = '';
  }

  private validateCategoryName(): boolean {
    return this.categoryName.length > 0;
  }

  private validateCategoryNotes(): boolean {
    return this.categoryNotes.length > 0;
  }

  private displayError(message: string) {
    this.logger.debug(AddCategoryPopup.name, 'displayError', message);
    // TODO display error
  }

}
