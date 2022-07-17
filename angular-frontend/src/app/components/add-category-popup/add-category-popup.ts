import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import Category from "src/app/models/category.model";
import Group from "src/app/models/group.model";
import { CategoriesStoreService } from "src/app/services/store/category-store.service";
import { GroupStoreService } from "src/app/services/store/group-store.service";
import { GroupState } from "src/app/store/actions/groups.actions";
import { BaseComponent } from "../base-component.ts/base-component";

@Component({
  selector: 'add-category-popup',
  templateUrl: './add-category-popup.html',
  styleUrls: ['./add-category-popup.css'],
})
export class AddCategoryPopup extends BaseComponent implements OnInit {
  @Input() createButtonPressed: Observable<null>;
  public popup: boolean = true;
  public categoryGroupID: string = '';
  public categoryName: string = '';
  public categoryNotes: string = '';
  public groups: Group[] = [];

  constructor(
    private groupStoreService: GroupStoreService,
    private categoryStoreService: CategoriesStoreService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.logger.trace(AddCategoryPopup.name, 'ngOnInit', 'was called');

    this.createButtonPressed.subscribe(() => {
      this.logger.trace(AddCategoryPopup.name, 'createButtonPressed', 'was called');
      this.popup = true;
    });
    this.groupStoreService.groups$.subscribe((groupsState: GroupState) => {
      this.groups = groupsState.groups
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
    this.resetForm();
    this.popup = false;
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
