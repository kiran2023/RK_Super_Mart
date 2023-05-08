import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProductsService } from '../adminProducts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categoryData',
  templateUrl: './categoryData.component.html',
  styleUrls: ['./categoryData.component.css']
})
export class CategoryDataComponent implements OnInit {
  categoryStatusMessage: string | undefined;
  categoryDisplay: any = "";
  categoryArray: any = [];
  constructor(private formBuilder: FormBuilder, private adminService: AdminProductsService, private http: HttpClient) { }
  categoryData!: FormGroup;

  existingCategoryData: any | undefined;

  ngOnInit() {
    this.categoryData = this.formBuilder.group({
      categoryType: [, Validators.required],
      category: [, Validators.required],
      categoryClass: [, Validators.required],
      categoryUniqueValue: [, Validators.required],
    });
    this.adminService.getCategory().subscribe((data) => {
      this.categoryDisplay = data;
    });            
  }

  addProduct(formData: any) {
    let categoryExist: boolean = false;
    let existingCategoryId: string | number | undefined;

    this.categoryData.invalid ? this.categoryStatusMessage = 'Fill all the fields' : this.categoryStatusMessage = undefined;

    if (this.categoryData.valid) {
      this.adminService.getCategory().subscribe((category: any) => {
        category.forEach((categoryDatas: any) => {
          if (categoryDatas.categoryType == formData.categoryType) {
            categoryExist = true;
            existingCategoryId = categoryDatas.id;
          }
        });
        let categoryValues = {
          categoryType: formData.categoryType,
          category: formData.category.split(','),
          categoryClass: formData.categoryClass.split(','),
          categoryUniqueValue: formData.categoryUniqueValue.split(',')
        }
        this.dataUpdating(categoryExist, categoryValues, existingCategoryId);
      });
    }
  }
  dataUpdating(categoryExist: boolean, categoryData: any, existingCategoryId: number | string | undefined) {
    if (categoryExist == false) {
      var categoryTypeDataValue: any = { categoryTypeData: categoryData.categoryType }

      this.adminService.addCategory(categoryData).subscribe((response) => {
        if (response) {
          this.adminService.addCategoryTypes(categoryTypeDataValue).subscribe();
          this.categoryStatusMessage = "Category Added Successfully";
        }
        setTimeout(() => this.categoryStatusMessage = undefined, 3000);
      });
    }
    if (categoryExist) {
      let categoryDataExist: boolean = false;
      this.http.get(`http://localhost:3000/category/${existingCategoryId}`).subscribe((data: any) => {

        data.category.forEach((datas: any) => {
          if (datas == categoryData.category) {
            categoryDataExist = true;
          }
        })
        
        if (categoryDataExist == false) {
          this.adminService.addCategoryTest(existingCategoryId, "category", "categoryClass", "categoryUniqueValue", categoryData.category, categoryData.categoryClass, categoryData.categoryUniqueValue).subscribe((response) => {
            if (response) {
              console.warn(response);
            }
            setTimeout(() => this.categoryStatusMessage = undefined, 3000);
          });
        }
      });
    }
  }
} 